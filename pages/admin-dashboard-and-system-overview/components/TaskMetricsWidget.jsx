import React from 'react';
import Icon from '../../../components/AppIcon';

const TaskMetricsWidget = () => {
  const metrics = [
    {
      label: 'Active Tasks',
      value: 45,
      icon: 'ListTodo',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Completed Tasks',
      value: 128,
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Overdue Tasks',
      value: 8,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Under Review',
      value: 12,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const completionRate = 74;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Task Metrics</h3>
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics?.map((metric, index) => (
          <div key={index} className={`p-4 rounded-lg ${metric?.bgColor}`}>
            <div className="flex items-center gap-3 mb-2">
              <Icon name={metric?.icon} size={20} className={metric?.color} />
              <span className="text-2xl font-bold text-foreground">{metric?.value}</span>
            </div>
            <p className="text-xs text-muted-foreground">{metric?.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Completion Rate</span>
          <span className="text-sm font-bold text-success">{completionRate}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-success transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">95 out of 128 tasks completed this month</p>
      </div>
    </div>
  );
};

export default TaskMetricsWidget;