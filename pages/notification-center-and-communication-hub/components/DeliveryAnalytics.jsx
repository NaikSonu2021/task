import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DeliveryAnalytics = ({ analyticsData }) => {
  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="BarChart3" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            डिलीवरी विश्लेषण
          </h2>
          <p className="text-sm text-muted-foreground">
            सूचना प्रदर्शन मेट्रिक्स
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCheck" size={20} className="text-green-600" />
            <span className="text-sm font-medium text-green-600">
              डिलीवरी दर
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {analyticsData?.deliveryRate}%
          </p>
          <p className="text-xs text-green-600/70 mt-1">
            पिछले सप्ताह से +2.5%
          </p>
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Eye" size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              ओपन रेट
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {analyticsData?.openRate}%
          </p>
          <p className="text-xs text-blue-600/70 mt-1">
            पिछले सप्ताह से +1.8%
          </p>
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={20} className="text-amber-600" />
            <span className="text-sm font-medium text-amber-600">
              औसत प्रतिक्रिया समय
            </span>
          </div>
          <p className="text-2xl font-bold text-amber-600">
            {analyticsData?.avgResponseTime}
          </p>
          <p className="text-xs text-amber-600/70 mt-1">
            पिछले सप्ताह से -15 मिनट
          </p>
        </div>

        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Send" size={20} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              कुल भेजे गए
            </span>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {analyticsData?.totalSent}
          </p>
          <p className="text-xs text-purple-600/70 mt-1">
            इस महीने
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">
            चैनल प्रभावशीलता
          </h3>
          <div className="w-full h-64" aria-label="Channel Effectiveness Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData?.channelEffectiveness}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="channel" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar dataKey="delivered" fill="#10B981" name="डिलीवर" />
                <Bar dataKey="opened" fill="#3B82F6" name="खोला गया" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">
            सूचना प्रकार वितरण
          </h3>
          <div className="w-full h-64" aria-label="Notification Type Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData?.typeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100)?.toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData?.typeDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAnalytics;