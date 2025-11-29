import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { io } from 'socket.io-client';
import Icon from '../../../components/AppIcon';


const WhatsAppIntegrationPanel = ({ integrationData, onRefresh }) => {
  const [qrCode, setQrCode] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [socket, setSocket] = useState(null);
  const [stats, setStats] = useState({
    deliveryRate: 0,
    messagesSentToday: 0,
    lastSync: 'Never'
  });

  useEffect(() => {
    // Connect to backend WebSocket server
    const backendUrl = import.meta.env?.VITE_WHATSAPP_BACKEND_URL || 'http://localhost:3001';
    const newSocket = io(backendUrl, {
      transports: ['websocket', 'polling']
    });

    newSocket?.on('connect', () => {
      console.log('Connected to WhatsApp backend');
      setConnectionStatus('connecting');
    });

    newSocket?.on('qr', (qrData) => {
      console.log('QR Code received');
      setQrCode(qrData);
      setConnectionStatus('qr_ready');
    });

    newSocket?.on('authenticated', () => {
      console.log('WhatsApp authenticated');
      setConnectionStatus('connected');
      setQrCode(null);
    });

    newSocket?.on('ready', () => {
      console.log('WhatsApp client ready');
      setConnectionStatus('ready');
      updateStats();
    });

    newSocket?.on('disconnected', () => {
      console.log('WhatsApp disconnected');
      setConnectionStatus('disconnected');
      setQrCode(null);
    });

    newSocket?.on('stats_update', (data) => {
      setStats({
        deliveryRate: data?.deliveryRate || 0,
        messagesSentToday: data?.messagesSentToday || 0,
        lastSync: new Date()?.toLocaleString()
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket?.close();
    };
  }, []);

  const updateStats = () => {
    if (socket) {
      socket?.emit('get_stats');
    }
  };

  const handleScanQR = () => {
    if (socket) {
      socket?.emit('request_qr');
      setConnectionStatus('requesting');
    }
  };

  const handleDisconnect = () => {
    if (socket) {
      socket?.emit('logout');
      setConnectionStatus('disconnected');
      setQrCode(null);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'ready':
        return 'text-green-600';
      case 'connected': case'authenticated':
        return 'text-blue-600';
      case 'qr_ready': case'connecting':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'ready':
        return 'Connected & Ready';
      case 'connected': case'authenticated':
        return 'Authenticating...';
      case 'qr_ready':
        return 'Scan QR Code';
      case 'connecting': case'requesting':
        return 'Connecting...';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Icon name="MessageCircle" size={24} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              WhatsApp Integration
            </h2>
            <p className="text-sm text-muted-foreground">
              Web-based WhatsApp connectivity
            </p>
          </div>
        </div>
        <button
          onClick={updateStats}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          title="Refresh"
        >
          <Icon name="RefreshCw" size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="Wifi" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Connection Status
              </span>
            </div>
            <span className={`text-sm font-semibold ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="CheckCheck" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Message Delivery Rate
              </span>
            </div>
            <span className="text-sm font-semibold text-success">
              {stats?.deliveryRate}%
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="Send" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Messages Sent Today
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {stats?.messagesSentToday}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="Clock" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Last Sync
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {stats?.lastSync}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
          {qrCode ? (
            <>
              <div className="w-64 h-64 bg-white rounded-lg p-4 mb-4 flex items-center justify-center">
                <QRCodeSVG value={qrCode} size={240} level="H" />
              </div>
              <p className="text-sm text-foreground font-medium mb-2">
                Scan with WhatsApp
              </p>
              <p className="text-xs text-muted-foreground text-center mb-4">
                Open WhatsApp → Settings → Linked Devices → Link a Device
              </p>
            </>
          ) : (
            <>
              <div className="w-48 h-48 bg-white rounded-lg p-4 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="QrCode" size={120} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    {connectionStatus === 'ready' ? 'Connected' : 'QR Code will appear here'}
                  </p>
                </div>
              </div>
              {connectionStatus === 'ready' ? (
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Disconnect</span>
                </button>
              ) : (
                <button
                  onClick={handleScanQR}
                  disabled={connectionStatus === 'requesting' || connectionStatus === 'connecting'}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="Scan" size={18} />
                  <span>
                    {connectionStatus === 'requesting' || connectionStatus === 'connecting' ?'Connecting...' :'Generate QR Code'}
                  </span>
                </button>
              )}
            </>
          )}
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Connect your WhatsApp by scanning QR code
          </p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-amber-600 mb-1">
              Backend Server Required
            </h4>
            <p className="text-xs text-amber-600/80 mb-2">
              This feature requires a Node.js backend server running. Make sure your backend is running at the configured URL.
            </p>
            <p className="text-xs text-amber-600/80">
              Backend URL: {import.meta.env?.VITE_WHATSAPP_BACKEND_URL || 'http://localhost:3001'}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-blue-600 mb-1">
              How It Works
            </h4>
            <ul className="text-xs text-blue-600/80 space-y-1 list-disc list-inside">
              <li>Click "Generate QR Code" to create a new session</li>
              <li>Open WhatsApp on your phone and scan the QR code</li>
              <li>Once connected, you can send messages through the system</li>
              <li>The connection remains active until you log out or disconnect</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegrationPanel;