import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const actionOptions = [
    { value: '', label: 'कार्रवाई चुनें' },
    { value: 'move-to-screening', label: 'स्क्रीनिंग में ले जाएं' },
    { value: 'schedule-interview', label: 'साक्षात्कार शेड्यूल करें' },
    { value: 'send-rejection', label: 'अस्वीकृति भेजें' },
    { value: 'export-data', label: 'डेटा निर्यात करें' },
  ];

  const handleApplyAction = () => {
    if (selectedAction) {
      onBulkAction(selectedAction);
      setSelectedAction('');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="bg-primary/10 border border-primary rounded-lg p-4 flex items-center gap-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="CheckSquare" size={18} className="text-primary-foreground" />
        </div>
        <span className="font-semibold text-foreground">
          {selectedCount} उम्मीदवार चयनित
        </span>
      </div>

      <div className="flex-1 flex items-center gap-2">
        <Select
          options={actionOptions}
          value={selectedAction}
          onChange={setSelectedAction}
          className="flex-1"
        />
        <Button
          variant="default"
          iconName="Play"
          iconPosition="left"
          onClick={handleApplyAction}
          disabled={!selectedAction}
        >
          लागू करें
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        iconName="X"
        onClick={onClearSelection}
      />
    </div>
  );
};

export default BulkActionsBar;