import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulkProcessingPanel = ({ employees, onProcess, onClose }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [processing, setProcessing] = useState(false);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(employees?.map(emp => emp?.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees?.filter(id => id !== employeeId));
    }
  };

  const handleProcess = async () => {
    setProcessing(true);
    setTimeout(() => {
      onProcess(selectedEmployees);
      setProcessing(false);
      onClose();
    }, 2000);
  };

  const totalAmount = employees?.filter(emp => selectedEmployees?.includes(emp?.id))?.reduce((sum, emp) => sum + emp?.netPay, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Bulk Salary Processing</h2>
            <p className="text-sm text-muted-foreground mt-1">Select employees and process salaries</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Employees</p>
                <p className="text-2xl font-bold text-foreground">{employees?.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Selected</p>
                <p className="text-2xl font-bold text-primary">{selectedEmployees?.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-success">₹{totalAmount?.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <Checkbox
              label="Select All"
              checked={selectedEmployees?.length === employees?.length}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
            />
            <span className="text-sm text-muted-foreground">
              {selectedEmployees?.length} of {employees?.length} selected
            </span>
          </div>

          <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
            {employees?.map((employee) => (
              <div
                key={employee?.id}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  selectedEmployees?.includes(employee?.id)
                    ? 'border-primary bg-primary/5' :'border-border bg-card'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={selectedEmployees?.includes(employee?.id)}
                    onChange={(e) => handleSelectEmployee(employee?.id, e?.target?.checked)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{employee?.name}</h4>
                        <p className="text-sm text-muted-foreground">{employee?.employeeId} - {employee?.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">₹{employee?.netPay?.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-muted-foreground">{employee?.workingDays} days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Base: ₹{employee?.baseSalary?.toLocaleString('en-IN')}</span>
                      <span className="text-accent">OT: +₹{employee?.overtime?.toLocaleString('en-IN')}</span>
                      <span className="text-error">Deductions: -₹{employee?.deductions?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="default"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="default"
              iconName="CheckCircle2"
              iconPosition="left"
              onClick={handleProcess}
              disabled={selectedEmployees?.length === 0}
              loading={processing}
              fullWidth
            >
              Process {selectedEmployees?.length} Salaries
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkProcessingPanel;