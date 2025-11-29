import React from 'react';

const NotificationBadge = ({ count = 0, variant = 'default', className = '' }) => {
  if (count === 0) return null;

  const displayCount = count > 99 ? '99+' : count;

  const variantStyles = {
    default: 'bg-accent text-accent-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${
        variantStyles?.[variant] || variantStyles?.default
      } ${className}`}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;