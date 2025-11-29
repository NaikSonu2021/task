import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by user, action, description, or IP address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button
          variant="default"
          iconName="Search"
          iconPosition="left"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="outline"
          iconName="SlidersHorizontal"
          onClick={() => setShowAdvanced(!showAdvanced)}
        />
      </div>
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm font-semibold text-foreground mb-3">
            Advanced Search Operators:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">user:name</p>
                <p className="text-xs text-muted-foreground">
                  Search by specific user
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">action:type</p>
                <p className="text-xs text-muted-foreground">
                  Filter by action type
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">ip:address</p>
                <p className="text-xs text-muted-foreground">
                  Search by IP address
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">severity:level</p>
                <p className="text-xs text-muted-foreground">
                  Filter by severity level
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;