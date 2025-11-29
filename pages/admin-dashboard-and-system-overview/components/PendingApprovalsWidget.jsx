import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingApprovalsWidget = () => {
  const approvals = [
    {
      id: 1,
      type: 'Leave Request',
      requester: 'Rahul Mehta',
      details: '3 Days Leave - Dec 15-17',
      timestamp: '2 hours ago',
      icon: 'Calendar',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10'
    },
    {
      id: 2,
      type: 'Expense Claim',
      requester: 'Anjali Singh',
      details: '₹8,500 - Travel Expenses',
      timestamp: '5 hours ago',
      icon: 'Receipt',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10'
    },
    {
      id: 3,
      type: 'Task Extension',
      requester: 'Sanjay Kumar',
      details: 'Deadline Extension Request',
      timestamp: '1 day ago',
      icon: 'Clock',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">Pending Approvals</h3>
          <span className="px-2 py-0.5 text-xs font-medium bg-error/10 text-error rounded-full">
            {approvals?.length}
          </span>
        </div>
        <Icon name="AlertCircle" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {approvals?.map((approval) => (
          <div key={approval?.id} className="p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg ${approval?.iconBg}`}>
                <Icon name={approval?.icon} size={18} className={approval?.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{approval?.type}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {approval?.requester} • {approval?.timestamp}
                </p>
                <p className="text-sm text-foreground mt-2">{approval?.details}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-3">
              <Button variant="success" size="sm" iconName="Check" iconPosition="left">
                Approve
              </Button>
              <Button variant="outline" size="sm" iconName="X" iconPosition="left">
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
        View All Approvals
      </button>
    </div>
  );
};

export default PendingApprovalsWidget;