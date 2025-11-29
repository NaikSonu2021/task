import React from 'react';

import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ filters, onFilterChange, onSearch, onBulkAction, selectedCount }) => {
  const notificationTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'task', label: 'Task Assignment' },
    { value: 'system', label: 'System Alert' },
    { value: 'payroll', label: 'Payroll Notifications' },
    { value: 'deadline', label: 'Deadline Reminder' },
    { value: 'attendance', label: 'Attendance' },
    { value: 'hr', label: 'HR Update' },
  ];

  const channelTypes = [
    { value: 'all', label: 'All Channels' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'browser', label: 'Browser' },
    { value: 'email', label: 'Email' },
  ];

  const statusTypes = [
    { value: 'all', label: 'All Status' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
  ];

  const bulkActions = [
    { value: '', label: 'Bulk Actions' },
    { value: 'markRead', label: 'Mark as Read' },
    { value: 'markUnread', label: 'Mark as Unread' },
    { value: 'delete', label: 'Delete' },
    { value: 'retry', label: 'Retry' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search notifications..."
          value={filters?.search}
          onChange={(e) => onSearch(e?.target?.value)}
          className="w-full"
        />

        <Select
          options={notificationTypes}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
          placeholder="Select Type"
        />

        <Select
          options={channelTypes}
          value={filters?.channel}
          onChange={(value) => onFilterChange('channel', value)}
          placeholder="Select Channel"
        />

        <Select
          options={statusTypes}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Select Status"
        />
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Input
            type="date"
            label="From Date"
            value={filters?.dateFrom}
            onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
            className="w-auto"
          />
          <Input
            type="date"
            label="To Date"
            value={filters?.dateTo}
            onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
            className="w-auto"
          />
        </div>

        {selectedCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {selectedCount} Selected
            </span>
            <Select
              options={bulkActions}
              value=""
              onChange={(value) => onBulkAction(value)}
              placeholder="Bulk Actions"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <button
          onClick={() => onFilterChange('preset', 'today')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filters?.preset === 'today' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => onFilterChange('preset', 'week')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filters?.preset === 'week' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => onFilterChange('preset', 'month')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filters?.preset === 'month' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => onFilterChange('preset', 'unread')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filters?.preset === 'unread' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Unread
        </button>
      </div>
    </div>
  );
};

export default FilterToolbar;