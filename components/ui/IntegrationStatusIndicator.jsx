import React from 'react';
import Icon from '../AppIcon';

const IntegrationStatusIndicator = ({
  status = 'connected',
  service = 'WhatsApp',
  showLabel = false,
  className = '',
}) => {
  const statusConfig = {
    connected: {
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10',
      label: 'Connected',
    },
    disconnected: {
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      label: 'Disconnected',
    },
    warning: {
      icon: 'AlertCircle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      label: 'Warning',
    },
    loading: {
      icon: 'Loader2',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      label: 'Connecting',
    },
  };

  const config = statusConfig?.[status] || statusConfig?.disconnected;

  return (
    <div
      className={`inline-flex items-center gap-2 px-2 py-1 rounded-lg ${config?.bgColor} ${className}`}
      title={`${service} - ${config?.label}`}
    >
      <Icon
        name={config?.icon}
        size={16}
        className={`${config?.color} ${
          status === 'loading' ? 'animate-spin' : ''
        }`}
      />
      {showLabel && (
        <span className={`text-xs font-medium ${config?.color}`}>
          {service}
        </span>
      )}
    </div>
  );
};

export default IntegrationStatusIndicator;