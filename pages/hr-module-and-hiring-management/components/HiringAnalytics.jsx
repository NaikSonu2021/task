import React from 'react';
import Icon from '../../../components/AppIcon';

const HiringAnalytics = ({ analytics }) => {
  const stats = [
    {
      label: 'कुल आवेदन',
      value: analytics?.totalApplications,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'सक्रिय उम्मीदवार',
      value: analytics?.activeCandidates,
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'साक्षात्कार निर्धारित',
      value: analytics?.interviewsScheduled,
      icon: 'Calendar',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'ऑफर भेजे गए',
      value: analytics?.offersSent,
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HiringAnalytics;