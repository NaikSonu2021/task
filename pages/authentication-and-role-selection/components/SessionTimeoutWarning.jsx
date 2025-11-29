import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionTimeoutWarning = ({ onExtend, onLogout }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const warningTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1680000);

    return () => clearTimeout(warningTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, onLogout]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleExtend = () => {
    setIsVisible(false);
    setTimeLeft(120);
    onExtend();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4 animate-fade-in">
      <div className="bg-card rounded-xl shadow-elevation-3 max-w-md w-full p-6 space-y-6 animate-slide-in">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Clock" size={32} className="text-warning" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              सत्र समाप्त हो रहा है
            </h2>
            <p className="text-muted-foreground">
              निष्क्रियता के कारण आपका सत्र जल्द ही समाप्त हो जाएगा
            </p>
          </div>
        </div>

        <div className="bg-warning/10 border border-warning rounded-lg p-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">शेष समय</p>
            <p className="text-4xl font-bold text-warning">{formatTime(timeLeft)}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
            <p>
              सुरक्षा के लिए, 30 मिनट की निष्क्रियता के बाद सत्र स्वचालित रूप से समाप्त हो जाते हैं।
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={onLogout}
            iconName="LogOut"
            iconPosition="left"
            className="flex-1"
          >
            लॉग आउट
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={handleExtend}
            iconName="RefreshCw"
            iconPosition="right"
            className="flex-1"
          >
            सत्र बढ़ाएं
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutWarning;