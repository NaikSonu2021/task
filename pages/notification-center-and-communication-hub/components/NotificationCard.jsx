import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NotificationCard = ({ notification, onMarkAsRead, onDelete, onRetry }) => {
  const getTypeIcon = (type) => {
    const icons = {
      task: 'CheckSquare',
      system: 'Bell',
      payroll: 'DollarSign',
      deadline: 'Clock',
      attendance: 'Calendar',
      hr: 'Users',
    };
    return icons?.[type] || 'Bell';
  };

  const getTypeColor = (type) => {
    const colors = {
      task: 'bg-blue-500/10 text-blue-600',
      system: 'bg-purple-500/10 text-purple-600',
      payroll: 'bg-green-500/10 text-green-600',
      deadline: 'bg-red-500/10 text-red-600',
      attendance: 'bg-amber-500/10 text-amber-600',
      hr: 'bg-indigo-500/10 text-indigo-600',
    };
    return colors?.[type] || 'bg-gray-500/10 text-gray-600';
  };

  const getChannelIcon = (channel) => {
    const icons = {
      whatsapp: 'MessageCircle',
      browser: 'Monitor',
      email: 'Mail',
    };
    return icons?.[channel] || 'Bell';
  };

  const getDeliveryStatusColor = (status) => {
    const colors = {
      delivered: 'text-success',
      pending: 'text-warning',
      failed: 'text-error',
      read: 'text-muted-foreground',
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-elevation-2 ${
        !notification?.isRead ? 'border-l-4 border-l-primary' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Image
            src={notification?.senderAvatar}
            alt={notification?.senderAvatarAlt}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground">
                {notification?.senderName}
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                  notification?.type
                )}`}
              >
                <Icon name={getTypeIcon(notification?.type)} size={12} />
                {notification?.typeLabel}
              </span>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {notification?.timestamp}
            </span>
          </div>

          <p className="text-sm text-foreground mb-3">{notification?.message}</p>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon
                  name={getChannelIcon(notification?.channel)}
                  size={16}
                  className="text-muted-foreground"
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {notification?.channel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Icon
                  name={
                    notification?.deliveryStatus === 'delivered' ?'CheckCheck'
                      : notification?.deliveryStatus === 'pending' ?'Clock'
                      : notification?.deliveryStatus === 'failed' ?'XCircle' :'Check'
                  }
                  size={16}
                  className={getDeliveryStatusColor(notification?.deliveryStatus)}
                />
                <span
                  className={`text-xs ${getDeliveryStatusColor(
                    notification?.deliveryStatus
                  )}`}
                >
                  {notification?.deliveryStatus === 'delivered' ?'डिलीवर हो गया'
                    : notification?.deliveryStatus === 'pending' ?'लंबित'
                    : notification?.deliveryStatus === 'failed' ?'विफल' :'पढ़ा गया'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!notification?.isRead && (
                <button
                  onClick={() => onMarkAsRead(notification?.id)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  title="पढ़ा हुआ चिह्नित करें"
                >
                  <Icon name="Check" size={16} className="text-muted-foreground" />
                </button>
              )}
              {notification?.deliveryStatus === 'failed' && (
                <button
                  onClick={() => onRetry(notification?.id)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  title="पुनः प्रयास करें"
                >
                  <Icon name="RefreshCw" size={16} className="text-warning" />
                </button>
              )}
              <button
                onClick={() => onDelete(notification?.id)}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                title="हटाएं"
              >
                <Icon name="Trash2" size={16} className="text-error" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;