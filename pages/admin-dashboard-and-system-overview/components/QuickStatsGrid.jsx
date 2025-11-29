import React from 'react';
import StatCard from './StatCard';

const QuickStatsGrid = ({ onCardClick }) => {
  const stats = [
    {
      title: 'Total Employees',
      value: '40',
      subtitle: '5 new this month',
      icon: 'Users',
      iconColor: 'bg-primary/10 text-primary',
      trend: 'up',
      trendValue: '+12.5%',
      onClick: () => onCardClick('/employee-management-and-user-administration')
    },
    {
      title: 'Active Tasks',
      value: '45',
      subtitle: '8 overdue',
      icon: 'ListTodo',
      iconColor: 'bg-accent/10 text-accent',
      trend: 'down',
      trendValue: '-3.2%',
      onClick: () => onCardClick('/task-management-and-assignment-hub')
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      subtitle: 'Today 37/40 present',
      icon: 'Clock',
      iconColor: 'bg-success/10 text-success',
      trend: 'up',
      trendValue: '+5.1%',
      onClick: () => onCardClick('/attendance-tracking-and-working-hours-monitor')
    },
    {
      title: 'Monthly Payroll',
      value: '₹12.5L',
      subtitle: 'Next processing: 5 days',
      icon: 'DollarSign',
      iconColor: 'bg-warning/10 text-warning',
      trend: 'neutral',
      trendValue: '0%',
      onClick: () => onCardClick('/finance-module-and-payroll-management')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default QuickStatsGrid;