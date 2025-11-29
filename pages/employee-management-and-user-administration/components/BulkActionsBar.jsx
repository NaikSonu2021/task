import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ selectedCount, onClearSelection, onBulkAction }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            {selectedCount} employees selected
          </span>
        </div>

        <div className="h-6 w-px bg-border"></div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="UserCog"
            iconPosition="left"
            onClick={() => onBulkAction('changeRole')}
          >
            Change Role
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Building2"
            iconPosition="left"
            onClick={() => onBulkAction('changeDepartment')}
          >
            Change Department
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="UserX"
            iconPosition="left"
            onClick={() => onBulkAction('deactivate')}
          >
            Deactivate
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => onBulkAction('export')}
          >
            Export
          </Button>
        </div>

        <div className="h-6 w-px bg-border"></div>

        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClearSelection}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsBar;