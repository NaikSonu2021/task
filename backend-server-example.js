// Backend Server for WhatsApp Web Integration
// This file should be placed in your Node.js backend project

const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const qrcode = require('qrcode-terminal');

const app = express();
const server = http?.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let whatsappClient = null;
let isReady = false;
let stats = {
  deliveryRate: 0,
  messagesSentToday: 0,
  totalMessagesSent: 0,
  totalMessagesDelivered: 0
};

// Initialize WhatsApp client with persistent session
const initializeWhatsAppClient = (socket) => {
  whatsappClient = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  });

  whatsappClient?.on('qr', (qr) => {
    console.log('QR Code received');
    qrcode?.generate(qr, { small: true });
    socket?.emit('qr', qr);
  });

  whatsappClient?.on('authenticated', () => {
    console.log('WhatsApp authenticated');
    socket?.emit('authenticated');
  });

  whatsappClient?.on('ready', () => {
    console.log('WhatsApp client is ready');
    isReady = true;
    socket?.emit('ready');
    socket?.emit('stats_update', stats);
  });

  whatsappClient?.on('disconnected', (reason) => {
    console.log('WhatsApp disconnected:', reason);
    isReady = false;
    socket?.emit('disconnected', reason);
  });

  whatsappClient?.on('message_create', (message) => {
    // Track sent messages
    if (message?.fromMe) {
      stats.totalMessagesSent++;
      stats.messagesSentToday++;
      updateDeliveryRate();
      socket?.emit('stats_update', stats);
    }
  });

  whatsappClient?.on('message_ack', (message, ack) => {
    // Track message delivery
    // ack values: 1 = sent, 2 = delivered, 3 = read
    if (ack >= 2) {
      stats.totalMessagesDelivered++;
      updateDeliveryRate();
      socket?.emit('stats_update', stats);
    }
  });

  whatsappClient?.initialize();
};

const updateDeliveryRate = () => {
  if (stats?.totalMessagesSent > 0) {
    stats.deliveryRate = Math.round((stats?.totalMessagesDelivered / stats?.totalMessagesSent) * 100);
  }
};

// Reset daily stats at midnight
const resetDailyStats = () => {
  stats.messagesSentToday = 0;
};

setInterval(resetDailyStats, 24 * 60 * 60 * 1000); // Reset every 24 hours

// Socket.IO connection handling
io?.on('connection', (socket) => {
  console.log('Client connected:', socket?.id);

  // Initialize WhatsApp client when first client connects
  if (!whatsappClient) {
    initializeWhatsAppClient(socket);
  } else if (isReady) {
    socket?.emit('ready');
    socket?.emit('stats_update', stats);
  }

  socket?.on('request_qr', () => {
    if (whatsappClient && !isReady) {
      console.log('QR code requested');
      // Client will receive QR through the 'qr' event
    } else if (!whatsappClient) {
      initializeWhatsAppClient(socket);
    }
  });

  socket?.on('send_message', async (data) => {
    if (!whatsappClient || !isReady) {
      socket?.emit('message_error', { error: 'WhatsApp client not ready' });
      return;
    }

    try {
      const { phoneNumber, message } = data;
      // Format phone number (remove any non-digit characters)
      const formattedNumber = phoneNumber?.replace(/\D/g, '');
      const chatId = `${formattedNumber}@c.us`;

      await whatsappClient?.sendMessage(chatId, message);
      socket?.emit('message_sent', { success: true, phoneNumber });
    } catch (error) {
      console.error('Error sending message:', error);
      socket?.emit('message_error', { error: error?.message });
    }
  });

  socket?.on('get_stats', () => {
    socket?.emit('stats_update', stats);
  });

  socket?.on('logout', async () => {
    if (whatsappClient) {
      await whatsappClient?.logout();
      await whatsappClient?.destroy();
      whatsappClient = null;
      isReady = false;
      socket?.emit('disconnected', 'Logged out');
    }
  });

  socket?.on('disconnect', () => {
    console.log('Client disconnected:', socket?.id);
  });
});

// Health check endpoint
app?.get('/health', (req, res) => {
  res?.json({
    status: 'ok',
    whatsappReady: isReady,
    stats: stats
  });
});

// API endpoint to send message (alternative to Socket.IO)
app?.use(express?.json());
app?.post('/api/send-message', async (req, res) => {
  if (!whatsappClient || !isReady) {
    return res?.status(503)?.json({ error: 'WhatsApp client not ready' });
  }

  try {
    const { phoneNumber, message } = req?.body;
    const formattedNumber = phoneNumber?.replace(/\D/g, '');
    const chatId = `${formattedNumber}@c.us`;

    await whatsappClient?.sendMessage(chatId, message);
    res?.json({ success: true, message: 'Message sent' });
  } catch (error) {
    console.error('Error sending message:', error);
    res?.status(500)?.json({ error: error?.message });
  }
});

const PORT = process.env.PORT || 3001;
server?.listen(PORT, () => {
  console.log(`WhatsApp backend server running on port ${PORT}`);
  console.log(`WebSocket endpoint: ws://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});