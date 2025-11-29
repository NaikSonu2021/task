# WhatsApp Web Integration Setup Guide

This guide will help you set up the unofficial WhatsApp Web integration for the Baba Groups Task Manager.

## Overview

The integration uses:
- **Frontend**: React with Socket.IO client and QR code display
- **Backend**: Node.js with whatsapp-web.js library
- **Communication**: Real-time WebSocket connection

## Prerequisites

- Node.js v16 or higher
- A dedicated server or local machine to run the backend
- WhatsApp account (personal or business)

## Backend Setup

### 1. Create Backend Project

```bash
# Create a new directory
mkdir whatsapp-backend
cd whatsapp-backend

# Initialize npm project
npm init -y
```

### 2. Install Dependencies

```bash
npm install whatsapp-web.js socket.io express qrcode-terminal
```

### 3. Create Server File

Create a file named `server.js` and copy the code from `backend-server-example.js` in this project.

### 4. Start the Backend

```bash
node server.js
```

The server will start on port 3001 (or the port specified in your environment variables).

## Frontend Configuration

### 1. Set Environment Variable

Add the following to your `.env` file:

```env
VITE_WHATSAPP_BACKEND_URL=http://localhost:3001
```

For production, replace with your actual backend server URL:

```env
VITE_WHATSAPP_BACKEND_URL=https://your-backend-domain.com
```

### 2. Configure in System Settings

1. Navigate to System Configuration → WhatsApp Integration
2. Update the Backend Server URL
3. Test the connection
4. Save configuration

## Usage

### Connecting WhatsApp

1. Go to Notification Center → WhatsApp Integration Panel
2. Click "Generate QR Code"
3. Open WhatsApp on your phone
4. Go to Settings → Linked Devices
5. Tap "Link a Device"
6. Scan the QR code displayed in your browser
7. Wait for authentication to complete

### Sending Messages

Once connected, the system can send WhatsApp messages through:

1. **Automatic Task Notifications**: 
   - When tasks are assigned
   - When task status changes
   - For deadline reminders

2. **Manual Messages**:
   - From the Message Composer in Notification Center
   - Using the backend API endpoint

### API Usage

You can also send messages using the REST API:

```bash
curl -X POST http://localhost:3001/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "message": "Hello from Task Manager!"
  }'
```

## Important Notes

### Session Persistence

- The WhatsApp session is saved locally using `LocalAuth`
- Once authenticated, the session persists across server restarts
- You won't need to scan the QR code again unless you log out

### Message Limits

- WhatsApp has rate limits to prevent spam
- Typical limit: ~1000 messages per day for new accounts
- Verified business accounts have higher limits
- Wait 1-2 seconds between messages to avoid blocks

### Security Considerations

1. **Backend Access**: Secure your backend server
2. **Authentication**: Add authentication to the backend API
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **HTTPS**: Use HTTPS for production deployments
5. **Firewall**: Restrict access to authorized IPs only

## Deployment Options

### Option 1: VPS/Dedicated Server

Deploy the backend on a VPS (DigitalOcean, AWS, etc.):

```bash
# Install PM2 for process management
npm install -g pm2

# Start the server with PM2
pm2 start server.js --name whatsapp-backend

# Make it restart on system reboot
pm2 startup
pm2 save
```

### Option 2: Docker

Create a `Dockerfile`:

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY server.js ./

EXPOSE 3001

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t whatsapp-backend .
docker run -p 3001:3001 -v $(pwd)/.wwebjs_auth:/app/.wwebjs_auth whatsapp-backend
```

### Option 3: Cloud Functions

For lighter usage, you can adapt this to serverless platforms like AWS Lambda or Google Cloud Functions (with some limitations).

## Troubleshooting

### QR Code Not Appearing

- Check backend server is running
- Verify VITE_WHATSAPP_BACKEND_URL is correct
- Check browser console for connection errors
- Ensure no CORS issues (backend allows your frontend origin)

### Authentication Failed

- Clear browser cache and try again
- Restart the backend server
- Delete `.wwebjs_auth` folder and rescan QR code
- Check WhatsApp app is updated to latest version

### Messages Not Sending

- Verify WhatsApp connection status is "Ready"
- Check phone number format (include country code without +)
- Ensure the number is registered on WhatsApp
- Check backend logs for error messages

### Connection Keeps Dropping

- Check your internet connection
- Verify backend server stability
- Check server logs for errors
- Consider increasing timeout values in configuration

## Advanced Features

### Message Templates

Create reusable message templates:

```javascript
const templates = {
  taskAssigned: (employeeName, taskTitle) => 
    `Hi ${employeeName}! You have been assigned a new task: "${taskTitle}". Please check your dashboard for details.`,
  
  deadlineReminder: (taskTitle, deadline) =>
    `Reminder: Task "${taskTitle}" is due on ${deadline}. Please ensure completion on time.`,
  
  taskCompleted: (managerName, taskTitle, employeeName) =>
    `Hi ${managerName}, ${employeeName} has completed the task: "${taskTitle}".`
};
```

### Bulk Messaging

Send messages to multiple recipients:

```javascript
async function sendBulkMessages(recipients, message) {
  for (const recipient of recipients) {
    await whatsappClient.sendMessage(`${recipient}@c.us`, message);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  }
}
```

### Message Scheduling

Integrate with a job scheduler (e.g., node-cron):

```javascript
const cron = require('node-cron');

// Send daily summary at 6 PM
cron.schedule('0 18 * * *', async () => {
  const summary = await generateDailySummary();
  await sendBulkMessages(managerPhoneNumbers, summary);
});
```

## Support

For issues or questions:
1. Check backend server logs
2. Review browser console errors
3. Verify WhatsApp app is functioning normally
4. Check WhatsApp Web status: https://web.whatsapp.com

## Legal Notice

This integration uses the unofficial WhatsApp Web API. While functional, it's important to note:

- Not officially supported by WhatsApp/Meta
- Terms of Service: Review WhatsApp's ToS before use
- Risk: Account could be limited or banned for automated usage
- Recommendation: Use for internal/low-volume applications only
- Alternative: Consider official WhatsApp Business API for production

## References

- whatsapp-web.js documentation: https://wwebjs.dev/
- Socket.IO documentation: https://socket.io/docs/
- WhatsApp Business API: https://business.whatsapp.com/