import React from 'react';
import Icon from '../../../components/AppIcon';

const EmployeeStatusWidget = () => {
  const statusData = [
    {
      status: 'Available',
      count: 24,
      color: 'bg-success',
      textColor: 'text-success',
      icon: 'CheckCircle2',
      percentage: 60
    },
    {
      status: 'On Duty',
      count: 12,
      color: 'bg-warning',
      textColor: 'text-warning',
      icon: 'Clock',
      percentage: 30
    },
    {
      status: 'Absent',
      count: 4,
      color: 'bg-error',
      textColor: 'text-error',
      icon: 'XCircle',
      percentage: 10
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Employee Availability</h3>
        <Icon name="Users" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {statusData?.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item?.color}/10`}>
                  <Icon name={item?.icon} size={18} className={item?.textColor} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item?.status}</p>
                  <p className="text-xs text-muted-foreground">{item?.count} employees</p>
                </div>
              </div>
              <span className={`text-lg font-bold ${item?.textColor}`}>{item?.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full ${item?.color} transition-all duration-500`}
                style={{ width: `${item?.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Employees</span>
          <span className="font-semibold text-foreground">40</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatusWidget;