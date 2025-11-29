import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const positionOptions = [
    { value: 'all', label: 'सभी पद' },
    { value: 'senior-developer', label: 'सीनियर डेवलपर' },
    { value: 'project-manager', label: 'प्रोजेक्ट मैनेजर' },
    { value: 'ui-designer', label: 'UI/UX डिज़ाइनर' },
    { value: 'business-analyst', label: 'बिजनेस एनालिस्ट' },
    { value: 'qa-engineer', label: 'QA इंजीनियर' },
  ];

  const experienceOptions = [
    { value: 'all', label: 'सभी अनुभव' },
    { value: '0-2', label: '0-2 वर्ष' },
    { value: '2-5', label: '2-5 वर्ष' },
    { value: '5-10', label: '5-10 वर्ष' },
    { value: '10+', label: '10+ वर्ष' },
  ];

  const availabilityOptions = [
    { value: 'all', label: 'सभी' },
    { value: 'available', label: 'उपलब्ध' },
    { value: 'interview-scheduled', label: 'साक्षात्कार निर्धारित' },
    { value: 'not-available', label: 'अनुपलब्ध' },
  ];

  const scoreOptions = [
    { value: 'all', label: 'सभी स्कोर' },
    { value: '80-100', label: '80-100%' },
    { value: '60-80', label: '60-80%' },
    { value: '0-60', label: '0-60%' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Icon name="Filter" size={18} />
          फ़िल्टर
        </h3>
        <Button
          variant="ghost"
          size="xs"
          iconName="X"
          iconPosition="left"
          onClick={onClearFilters}
        >
          साफ़ करें
        </Button>
      </div>
      <Input
        type="search"
        placeholder="नाम या ईमेल से खोजें..."
        value={filters?.search}
        onChange={(e) => onFilterChange('search', e?.target?.value)}
      />
      <Select
        label="पद"
        options={positionOptions}
        value={filters?.position}
        onChange={(value) => onFilterChange('position', value)}
      />
      <Select
        label="अनुभव"
        options={experienceOptions}
        value={filters?.experience}
        onChange={(value) => onFilterChange('experience', value)}
      />
      <Select
        label="उपलब्धता"
        options={availabilityOptions}
        value={filters?.availability}
        onChange={(value) => onFilterChange('availability', value)}
      />
      <Select
        label="AI स्कोर"
        options={scoreOptions}
        value={filters?.score}
        onChange={(value) => onFilterChange('score', value)}
      />
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          आवेदन तिथि
        </label>
        <div className="space-y-2">
          <Input
            type="date"
            placeholder="से"
            value={filters?.dateFrom}
            onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
          />
          <Input
            type="date"
            placeholder="तक"
            value={filters?.dateTo}
            onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;