import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WorkingHoursConfig = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState({
    department: 'Development',
    startTime: '09:00',
    endTime: '18:00',
    breakDuration: '60',
    overtimeThreshold: '8',
    lateArrivalGrace: '15'
  });

  const departmentOptions = [
    { value: 'Development', label: 'Development' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Finance', label: 'Finance' },
    { value: 'HR', label: 'HR' }
  ];

  const handleSave = () => {
    console.log('Saving configuration:', config);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[1200] flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Working Hours Configuration</h2>
            <p className="text-sm text-muted-foreground">Set department-specific working hours and policies</p>
          </div>
          <Button variant="ghost" size="icon" iconName="X" onClick={onClose} />
        </div>

        <div className="p-6 space-y-6">
          <Select
            label="Select Department"
            options={departmentOptions}
            value={config?.department}
            onChange={(value) => setConfig({ ...config, department: value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Work Start Time"
              type="time"
              value={config?.startTime}
              onChange={(e) => setConfig({ ...config, startTime: e?.target?.value })}
              required
            />
            <Input
              label="Work End Time"
              type="time"
              value={config?.endTime}
              onChange={(e) => setConfig({ ...config, endTime: e?.target?.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Break Duration (minutes)"
              type="number"
              value={config?.breakDuration}
              onChange={(e) => setConfig({ ...config, breakDuration: e?.target?.value })}
              description="Total daily break time"
              required
            />
            <Input
              label="Overtime Threshold (hours)"
              type="number"
              value={config?.overtimeThreshold}
              onChange={(e) => setConfig({ ...config, overtimeThreshold: e?.target?.value })}
              description="Minimum hours for overtime calculation"
              required
            />
          </div>

          <Input
            label="Late Arrival Grace (minutes)"
            type="number"
            value={config?.lateArrivalGrace}
            onChange={(e) => setConfig({ ...config, lateArrivalGrace: e?.target?.value })}
            description="Allowed time before marking late"
            required
          />

          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="Info" size={18} />
              Configuration Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Working Hours:</span>
                <span className="text-foreground font-medium">
                  {(() => {
                    const start = new Date(`2000-01-01T${config.startTime}`);
                    const end = new Date(`2000-01-01T${config.endTime}`);
                    const diff = (end - start) / (1000 * 60 * 60);
                    return `${diff?.toFixed(1)} hours`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Net Work Time:</span>
                <span className="text-foreground font-medium">
                  {(() => {
                    const start = new Date(`2000-01-01T${config.startTime}`);
                    const end = new Date(`2000-01-01T${config.endTime}`);
                    const diff = (end - start) / (1000 * 60 * 60) - config?.breakDuration / 60;
                    return `${diff?.toFixed(1)} hours`;
                  })()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Late Arrival Threshold:</span>
                <span className="text-foreground font-medium">
                  {(() => {
                    const start = new Date(`2000-01-01T${config.startTime}`);
                    start?.setMinutes(start?.getMinutes() + parseInt(config?.lateArrivalGrace));
                    return start?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border flex gap-3">
          <Button variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave} iconName="Save" iconPosition="left" fullWidth>
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursConfig;