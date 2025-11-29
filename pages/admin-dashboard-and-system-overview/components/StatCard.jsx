import React from 'react';
import Icon from '../../../components/AppIcon';

const StatCard = ({ title, value, subtitle, icon, iconColor, trend, trendValue, onClick }) => {
  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 shadow-elevation-1 transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-elevation-2' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
            size={16} 
            className={trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'}
          />
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'}`}>
            {trendValue}
          </span>
          <span className="text-xs text-muted-foreground">पिछले सप्ताह से</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;