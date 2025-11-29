import React from 'react';

import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterToolbar = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onClearFilters,
  departments,
  roles 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on-leave', label: 'On Leave' }
  ];

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[300px]">
          <Input
            type="search"
            placeholder="Search employee (name, ID, email)..."
            value={filters?.search}
            onChange={(e) => onSearch(e?.target?.value)}
            className="w-full"
          />
        </div>

        <Select
          options={departments}
          value={filters?.department}
          onChange={(value) => onFilterChange('department', value)}
          placeholder="Select department"
          className="w-48"
        />

        <Select
          options={roles}
          value={filters?.role}
          onChange={(value) => onFilterChange('role', value)}
          placeholder="Select role"
          className="w-48"
        />

        <Select
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          placeholder="Status"
          className="w-40"
        />

        <Button
          variant="outline"
          size="default"
          iconName="X"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>

        <Button
          variant="default"
          size="default"
          iconName="Download"
          iconPosition="left"
        >
          Export
        </Button>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-sm text-muted-foreground">Quick Filters:</span>
        {['All', 'Developer', 'Manager', 'HR', 'Finance']?.map((chip) => (
          <button
            key={chip}
            className="px-3 py-1 text-xs rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterToolbar;