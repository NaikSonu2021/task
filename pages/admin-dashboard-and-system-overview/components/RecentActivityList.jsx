import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivityList = () => {
  const activities = [
  {
    id: 1,
    user: 'Rajesh Kumar',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17de2c40c-1763294952850.png",
    avatarAlt: 'Professional headshot of Indian man with short black hair wearing blue formal shirt',
    action: 'created new task',
    target: 'Website Design Update',
    timestamp: '5 minutes ago',
    icon: 'Plus',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10'
  },
  {
    id: 2,
    user: 'Priya Sharma',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc96d634-1763295460493.png",
    avatarAlt: 'Professional headshot of Indian woman with long black hair wearing red traditional attire',
    action: 'completed task',
    target: 'Database Migration',
    timestamp: '15 minutes ago',
    icon: 'CheckCircle2',
    iconColor: 'text-success',
    iconBg: 'bg-success/10'
  },
  {
    id: 3,
    user: 'Amit Patel',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17c3cbb98-1763291944258.png",
    avatarAlt: 'Professional headshot of Indian man with glasses wearing white formal shirt',
    action: 'added new employee',
    target: 'Development Team',
    timestamp: '1 hour ago',
    icon: 'UserPlus',
    iconColor: 'text-accent',
    iconBg: 'bg-accent/10'
  },
  {
    id: 4,
    user: 'Sunita Verma',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_144335a60-1763298186234.png",
    avatarAlt: 'Professional headshot of Indian woman with short hair wearing green formal blazer',
    action: 'processed salary',
    target: '₹2,45,000',
    timestamp: '2 hours ago',
    icon: 'DollarSign',
    iconColor: 'text-warning',
    iconBg: 'bg-warning/10'
  },
  {
    id: 5,
    user: 'Vikas Gupta',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1167f399b-1763292732303.png",
    avatarAlt: 'Professional headshot of Indian man with beard wearing black formal suit',
    action: 'interviewed candidate',
    target: 'Senior Developer Position',
    timestamp: '3 hours ago',
    icon: 'Briefcase',
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary/10'
  }];


  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) =>
        <div key={activity?.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="relative flex-shrink-0">
              <Image
              src={activity?.avatar}
              alt={activity?.avatarAlt}
              className="w-10 h-10 rounded-full object-cover" />

              <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${activity?.iconBg}`}>
                <Icon name={activity?.icon} size={12} className={activity?.iconColor} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{activity?.user}</span>
                {' '}
                <span className="text-muted-foreground">{activity?.action}</span>
                {' '}
                <span className="font-medium">{activity?.target}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity?.timestamp}</p>
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default RecentActivityList;