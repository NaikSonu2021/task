import React from 'react';
import Icon from '../../../components/AppIcon';
import NotificationBadge from '../../../components/ui/NotificationBadge';

const CategorySidebar = ({ activeCategory, onCategoryChange, categoryCounts }) => {
  const categories = [
    {
      id: 'all',
      label: 'All Activities',
      icon: 'Activity',
      count: categoryCounts?.all
    },
    {
      id: 'user',
      label: 'User Activities',
      icon: 'Users',
      count: categoryCounts?.user
    },
    {
      id: 'system',
      label: 'System Events',
      icon: 'Server',
      count: categoryCounts?.system
    },
    {
      id: 'security',
      label: 'Security Alerts',
      icon: 'Shield',
      count: categoryCounts?.security
    },
    {
      id: 'data',
      label: 'Data Modifications',
      icon: 'Database',
      count: categoryCounts?.data
    },
    {
      id: 'authentication',
      label: 'Authentication',
      icon: 'Lock',
      count: categoryCounts?.authentication
    },
    {
      id: 'permissions',
      label: 'Permission Changes',
      icon: 'Key',
      count: categoryCounts?.permissions
    },
    {
      id: 'integration',
      label: 'Integration Logs',
      icon: 'Plug',
      count: categoryCounts?.integration
    },
    {
      id: 'export',
      label: 'Export Activities',
      icon: 'Download',
      count: categoryCounts?.export
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="FolderTree" size={20} />
        Categories
      </h3>
      <nav className="space-y-1">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon name={category?.icon} size={18} />
              <span>{category?.label}</span>
            </div>
            {category?.count > 0 && (
              <NotificationBadge
                count={category?.count}
                variant={activeCategory === category?.id ? 'default' : 'default'}
              />
            )}
          </button>
        ))}
      </nav>
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Quick Actions
        </h4>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Icon name="FileDown" size={16} />
            Export Report
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Icon name="Search" size={16} />
            Advanced Search
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Icon name="Bell" size={16} />
            Setup Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;