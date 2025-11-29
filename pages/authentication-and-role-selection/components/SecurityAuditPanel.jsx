import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityAuditPanel = () => {
  const [selectedTab, setSelectedTab] = useState('recent');

  const recentLogins = [
    {
      id: 1,
      user: 'राजेश कुमार',
      role: 'व्यवस्थापक',
      device: 'Windows 11 - Chrome',
      location: 'मुंबई, महाराष्ट्र',
      ip: '192.168.1.105',
      timestamp: new Date(Date.now() - 300000),
      status: 'success'
    },
    {
      id: 2,
      user: 'प्रिया शर्मा',
      role: 'प्रबंधक',
      device: 'Android - Chrome Mobile',
      location: 'दिल्ली, दिल्ली',
      ip: '192.168.1.142',
      timestamp: new Date(Date.now() - 1800000),
      status: 'success'
    },
    {
      id: 3,
      user: 'अज्ञात',
      role: 'N/A',
      device: 'Windows 10 - Firefox',
      location: 'पुणे, महाराष्ट्र',
      ip: '192.168.1.89',
      timestamp: new Date(Date.now() - 3600000),
      status: 'failed'
    },
    {
      id: 4,
      user: 'अमित वर्मा',
      role: 'वित्त',
      device: 'MacOS - Safari',
      location: 'बेंगलुरु, कर्नाटक',
      ip: '192.168.1.201',
      timestamp: new Date(Date.now() - 7200000),
      status: 'success'
    }
  ];

  const securityAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'असामान्य लॉगिन प्रयास',
      description: 'अज्ञात स्थान से 3 असफल लॉगिन प्रयास',
      timestamp: new Date(Date.now() - 3600000),
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      title: 'पासवर्ड अपडेट',
      description: 'विकास सिंह ने पासवर्ड सफलतापूर्वक अपडेट किया',
      timestamp: new Date(Date.now() - 7200000),
      severity: 'low'
    },
    {
      id: 3,
      type: 'success',
      title: 'सुरक्षा स्कैन पूर्ण',
      description: 'कोई खतरा नहीं मिला - सिस्टम सुरक्षित',
      timestamp: new Date(Date.now() - 10800000),
      severity: 'low'
    }
  ];

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `${diff} सेकंड पहले`;
    if (diff < 3600) return `${Math.floor(diff / 60)} मिनट पहले`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} घंटे पहले`;
    return date?.toLocaleDateString('hi-IN');
  };

  const getStatusIcon = (status) => {
    return status === 'success' ? 'CheckCircle2' : 'XCircle';
  };

  const getStatusColor = (status) => {
    return status === 'success' ? 'text-success' : 'text-error';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'text-success',
      medium: 'text-warning',
      high: 'text-error'
    };
    return colors?.[severity] || 'text-muted-foreground';
  };

  const getAlertIcon = (type) => {
    const icons = {
      warning: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle2',
      error: 'XCircle'
    };
    return icons?.[type] || 'Bell';
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">सुरक्षा ऑडिट</h3>
            <p className="text-sm text-muted-foreground">लॉगिन गतिविधि और अलर्ट</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTab('recent')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 ${
              selectedTab === 'recent' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            हाल की गतिविधि
          </button>
          <button
            onClick={() => setSelectedTab('alerts')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 ${
              selectedTab === 'alerts' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            सुरक्षा अलर्ट
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {selectedTab === 'recent' && (
          <div className="divide-y divide-border">
            {recentLogins?.map((login) => (
              <div key={login?.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Icon 
                      name={getStatusIcon(login?.status)} 
                      size={20} 
                      className={getStatusColor(login?.status)} 
                    />
                    <div>
                      <p className="font-medium text-foreground">{login?.user}</p>
                      <p className="text-xs text-muted-foreground">{login?.role}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(login?.timestamp)}
                  </span>
                </div>
                <div className="ml-8 space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Monitor" size={14} />
                    <span>{login?.device}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span>{login?.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Globe" size={14} />
                    <span>{login?.ip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'alerts' && (
          <div className="divide-y divide-border">
            {securityAlerts?.map((alert) => (
              <div key={alert?.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-start gap-3">
                  <Icon 
                    name={getAlertIcon(alert?.type)} 
                    size={20} 
                    className={getSeverityColor(alert?.severity)} 
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-foreground">{alert?.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(alert?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>कुल लॉगिन: 1,847</span>
          <span>असफल प्रयास: 23</span>
          <span>सक्रिय सत्र: 12</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityAuditPanel;