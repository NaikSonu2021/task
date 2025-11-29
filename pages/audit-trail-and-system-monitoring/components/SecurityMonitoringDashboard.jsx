import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityMonitoringDashboard = ({ securityMetrics }) => {
  const metricCards = [
    {
      title: 'Failed Login Attempts',
      value: securityMetrics?.failedLogins,
      icon: 'ShieldAlert',
      color: 'text-error bg-error/10',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Permission Violations',
      value: securityMetrics?.permissionViolations,
      icon: 'ShieldX',
      color: 'text-warning bg-warning/10',
      trend: '-5%',
      trendUp: false
    },
    {
      title: 'Unusual Access',
      value: securityMetrics?.unusualAccess,
      icon: 'AlertTriangle',
      color: 'text-accent bg-accent/10',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Security Threats',
      value: securityMetrics?.threats,
      icon: 'Shield',
      color: 'text-primary bg-primary/10',
      trend: '0%',
      trendUp: false
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Shield" size={20} />
          Security Monitoring Dashboard
        </h3>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          Detailed Report
          <Icon name="ExternalLink" size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metricCards?.map((metric, index) => (
          <div
            key={index}
            className="bg-background rounded-lg border border-border p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${metric?.color} flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  metric?.trendUp ? 'text-error' : 'text-success'
                }`}
              >
                <Icon
                  name={metric?.trendUp ? 'TrendingUp' : 'TrendingDown'}
                  size={14}
                />
                {metric?.trend}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {metric?.value}
            </p>
            <p className="text-sm text-muted-foreground">{metric?.title}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">
          Recent Security Incidents
        </h4>
        {securityMetrics?.recentIncidents?.map((incident, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-background rounded-lg border border-border"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                incident?.severity === 'critical' ?'bg-error/10 text-error'
                  : incident?.severity === 'high' ?'bg-warning/10 text-warning' :'bg-accent/10 text-accent'
              }`}
            >
              <Icon name="AlertCircle" size={16} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground">
                  {incident?.title}
                </p>
                <span className="text-xs text-muted-foreground">
                  {incident?.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {incident?.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {incident?.user}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {incident?.ipAddress}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityMonitoringDashboard;