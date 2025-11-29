import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';

const WhatsAppIntegration = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [qrCode, setQrCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const mockQRCode = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp://connect/babagroups/session123456';

  useEffect(() => {
    const savedStatus = localStorage.getItem('whatsappStatus');
    if (savedStatus) {
      setConnectionStatus(savedStatus);
    }
  }, []);

  const handleGenerateQR = () => {
    setIsScanning(true);
    setConnectionStatus('loading');
    setQrCode(mockQRCode);

    setTimeout(() => {
      setConnectionStatus('connected');
      localStorage.setItem('whatsappStatus', 'connected');
      setIsScanning(false);
    }, 3000);
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    setQrCode('');
    localStorage.removeItem('whatsappStatus');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Icon name="MessageCircle" size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">WhatsApp एकीकरण</h3>
            <p className="text-sm text-muted-foreground">सूचना सेवा</p>
          </div>
        </div>
        <IntegrationStatusIndicator 
          status={connectionStatus} 
          service="WhatsApp" 
          showLabel 
        />
      </div>

      {connectionStatus === 'disconnected' && (
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">WhatsApp कनेक्ट करने के लिए:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>अपने फोन पर WhatsApp खोलें</li>
                  <li>मेनू या सेटिंग्स पर टैप करें</li>
                  <li>"Linked Devices" चुनें</li>
                  <li>"Link a Device" पर टैप करें</li>
                  <li>QR कोड स्कैन करें</li>
                </ol>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateQR}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Icon name="QrCode" size={20} />
            QR कोड जनरेट करें
          </button>
        </div>
      )}

      {connectionStatus === 'loading' && qrCode && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center">
            <Image 
              src={qrCode} 
              alt="WhatsApp QR code for device linking showing unique session identifier for Baba Groups task management system integration"
              className="w-48 h-48"
            />
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>कनेक्शन की प्रतीक्षा में...</span>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            QR कोड 2 मिनट में समाप्त हो जाएगा
          </p>
        </div>
      )}

      {connectionStatus === 'connected' && (
        <div className="space-y-4">
          <div className="bg-success/10 border border-success rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-success">
              <Icon name="CheckCircle2" size={20} />
              <span className="font-medium">सफलतापूर्वक कनेक्ट हुआ</span>
            </div>
            <p className="text-sm text-muted-foreground">
              WhatsApp सूचनाएं सक्रिय हैं। कार्य असाइनमेंट और अपडेट WhatsApp के माध्यम से भेजे जाएंगे।
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDisconnect}
              className="flex-1 py-2.5 bg-error/10 hover:bg-error/20 text-error rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Icon name="Unlink" size={18} />
              डिस्कनेक्ट करें
            </button>
            <button
              className="flex-1 py-2.5 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Icon name="TestTube" size={18} />
              टेस्ट मैसेज
            </button>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>अंतिम सिंक: 2 मिनट पहले</span>
          <span>संदेश भेजे: 1,247</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;