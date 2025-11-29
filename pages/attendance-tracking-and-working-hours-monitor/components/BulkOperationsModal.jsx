import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkOperationsModal = ({ isOpen, onClose }) => {
  const [operation, setOperation] = useState('correction');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [date, setDate] = useState('2025-11-29');
  const [checkInTime, setCheckInTime] = useState('09:00');
  const [checkOutTime, setCheckOutTime] = useState('18:00');
  const [reason, setReason] = useState('');

  const employees = [
    { id: 1, name: "Rajesh Kumar", department: "Development" },
    { id: 2, name: "Priya Sharma", department: "Design" },
    { id: 3, name: "Amit Patel", department: "Development" },
    { id: 4, name: "Neha Gupta", department: "Marketing" },
    { id: 5, name: "Vikram Singh", department: "Finance" }
  ];

  const operationOptions = [
    { value: 'correction', label: 'Attendance Correction' },
    { value: 'manual-checkin', label: 'Manual Check-In' },
    { value: 'holiday', label: 'Mark Holiday' },
    { value: 'leave', label: 'Mark Leave' }
  ];

  const handleEmployeeToggle = (employeeId) => {
    setSelectedEmployees(prev =>
      prev?.includes(employeeId)
        ? prev?.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees?.length === employees?.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees?.map(emp => emp?.id));
    }
  };

  const handleSubmit = () => {
    console.log('Bulk operation:', {
      operation,
      selectedEmployees,
      date,
      checkInTime,
      checkOutTime,
      reason
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[1200] flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Bulk Operations</h2>
            <p className="text-sm text-muted-foreground">Manage attendance for multiple employees</p>
          </div>
          <Button variant="ghost" size="icon" iconName="X" onClick={onClose} />
        </div>

        <div className="p-6 space-y-6">
          <Select
            label="Operation Type"
            options={operationOptions}
            value={operation}
            onChange={setOperation}
            required
          />

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">
                Select Employees ({selectedEmployees?.length} selected)
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedEmployees?.length === employees?.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            <div className="border border-border rounded-lg max-h-64 overflow-y-auto">
              {employees?.map((employee) => (
                <div
                  key={employee?.id}
                  className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                >
                  <Checkbox
                    checked={selectedEmployees?.includes(employee?.id)}
                    onChange={() => handleEmployeeToggle(employee?.id)}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{employee?.name}</p>
                    <p className="text-xs text-muted-foreground">{employee?.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e?.target?.value)}
            required
          />

          {(operation === 'correction' || operation === 'manual-checkin') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Check-In Time"
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e?.target?.value)}
                required
              />
              <Input
                label="Check-Out Time"
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e?.target?.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Reason / Comments
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e?.target?.value)}
              placeholder="Explain the reason for this operation..."
              rows={4}
              className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="bg-warning/10 border border-warning rounded-lg p-4">
            <div className="flex gap-3">
              <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning mb-1">Warning</p>
                <p className="text-xs text-muted-foreground">
                  This operation will affect attendance records for {selectedEmployees?.length} employees.
                  Please ensure all details are correct.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border flex gap-3">
          <Button variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            iconName="Check"
            iconPosition="left"
            disabled={selectedEmployees?.length === 0}
            fullWidth
          >
            Apply Operation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsModal;