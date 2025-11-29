import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProductivityChart = () => {
  const data = [
    { month: 'Jan', completed: 85, pending: 15, overdue: 5 },
    { month: 'Feb', completed: 92, pending: 12, overdue: 3 },
    { month: 'Mar', completed: 78, pending: 18, overdue: 8 },
    { month: 'Apr', completed: 95, pending: 10, overdue: 2 },
    { month: 'May', completed: 88, pending: 14, overdue: 6 },
    { month: 'Jun', completed: 102, pending: 8, overdue: 4 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Productivity Trends</h3>
          <p className="text-sm text-muted-foreground mt-1">Last 6 Months Work Analysis</p>
        </div>
        <select className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground">
          <option>Last 6 Months</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="w-full h-80" aria-label="Productivity Trend Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--popover-foreground))'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              formatter={(value) => {
                const labels = {
                  completed: 'Completed',
                  pending: 'Pending',
                  overdue: 'Overdue'
                };
                return labels?.[value] || value;
              }}
            />
            <Bar dataKey="completed" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="overdue" fill="hsl(var(--error))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;