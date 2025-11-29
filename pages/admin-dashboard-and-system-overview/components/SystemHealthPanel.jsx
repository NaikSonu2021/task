import React from 'react';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';
import Icon from '../../../components/AppIcon';

const SystemHealthPanel = () => {
  const systemMetrics = [
    {
      label: 'Server Status',
      status: 'connected',
      value: '99.9% Uptime',
      icon: 'Server'
    },
    {
      label: 'Database',
      status: 'connected',
      value: '45ms Response',
      icon: 'Database'
    },
    {
      label: 'File Storage',
      status: 'connected',
      value: '2.4 TB / 5 TB',
      icon: 'HardDrive'
    },
    {
      label: 'Email Service',
      status: 'warning',
      value: 'Slow Performance',
      icon: 'Mail'
    }
  ];

  const integrations = [
    { service: 'WhatsApp', status: 'connected' },
    { service: 'Email', status: 'connected' },
    { service: 'Storage', status: 'connected' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">System Health</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4 mb-6">
        {systemMetrics?.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-background">
                <Icon name={metric?.icon} size={18} className="text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{metric?.label}</p>
                <p className="text-xs text-muted-foreground">{metric?.value}</p>
              </div>
            </div>
            <IntegrationStatusIndicator status={metric?.status} service="" />
          </div>
        ))}
      </div>
      <div className="pt-6 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-3">Integration Status</p>
        <div className="flex items-center gap-2 flex-wrap">
          {integrations?.map((integration, index) => (
            <IntegrationStatusIndicator 
              key={index}
              status={integration?.status}
              service={integration?.service}
              showLabel
            />
          ))}
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Check</span>
          <span className="font-medium text-foreground">2 minutes ago</span>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthPanel;