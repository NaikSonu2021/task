import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ onFilterChange, savedFilters, onSaveFilter }) => {
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'today',
    user: 'all',
    actionType: 'all',
    severity: 'all',
    status: 'all'
  });

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' }
  ];

  const actionTypeOptions = [
    { value: 'all', label: 'All Actions' },
    { value: 'create', label: 'Created' },
    { value: 'update', label: 'Updated' },
    { value: 'delete', label: 'Deleted' },
    { value: 'login', label: 'Login' },
    { value: 'logout', label: 'Logout' },
    { value: 'access', label: 'Access' },
    { value: 'permission', label: 'Permission' },
    { value: 'export', label: 'Export' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'info', label: 'Info' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success' },
    { value: 'failed', label: 'Failed' },
    { value: 'pending', label: 'Pending' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSaveFilter = () => {
    if (filterName?.trim()) {
      onSaveFilter({ name: filterName, filters: activeFilters });
      setFilterName('');
      setShowSaveDialog(false);
    }
  };

  const handleResetFilters = () => {
    const resetFilters = {
      dateRange: 'today',
      user: 'all',
      actionType: 'all',
      severity: 'all',
      status: 'all'
    };
    setActiveFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Filter" size={20} />
          Filter Options
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            iconPosition="left"
            onClick={() => setShowSaveDialog(true)}
          >
            Save Filter
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={activeFilters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />

        <Select
          label="User"
          options={userOptions}
          value={activeFilters?.user}
          onChange={(value) => handleFilterChange('user', value)}
        />

        <Select
          label="Action Type"
          options={actionTypeOptions}
          value={activeFilters?.actionType}
          onChange={(value) => handleFilterChange('actionType', value)}
        />

        <Select
          label="Severity Level"
          options={severityOptions}
          value={activeFilters?.severity}
          onChange={(value) => handleFilterChange('severity', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={activeFilters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
      </div>
      {savedFilters?.length > 0 && (
        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground mb-2">
            Saved Filters:
          </p>
          <div className="flex flex-wrap gap-2">
            {savedFilters?.map((filter, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveFilters(filter?.filters);
                  onFilterChange(filter?.filters);
                }}
                className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg text-sm text-foreground transition-colors flex items-center gap-2"
              >
                <Icon name="Bookmark" size={14} />
                {filter?.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1200]">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Save Filter
            </h4>
            <Input
              label="Filter Name"
              placeholder="Enter name for filter"
              value={filterName}
              onChange={(e) => setFilterName(e?.target?.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSaveDialog(false);
                  setFilterName('');
                }}
              >
                Cancel
              </Button>
              <Button variant="default" onClick={handleSaveFilter}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;