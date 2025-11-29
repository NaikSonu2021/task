import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalaryDetailsModal = ({ employee, onClose, userRole }) => {
  const breakdownItems = [
    { label: 'Base Salary', value: employee?.baseSalary, type: 'base' },
    { label: 'HRA', value: employee?.hra, type: 'allowance' },
    { label: 'Transport Allowance', value: employee?.transportAllowance, type: 'allowance' },
    { label: 'Special Allowance', value: employee?.specialAllowance, type: 'allowance' },
    { label: 'Overtime', value: employee?.overtime, type: 'overtime' },
    { label: 'PF Deduction', value: employee?.pfDeduction, type: 'deduction' },
    { label: 'TDS', value: employee?.tds, type: 'deduction' },
    { label: 'Other Deductions', value: employee?.otherDeductions, type: 'deduction' },
  ];

  const getItemColor = (type) => {
    switch (type) {
      case 'base':
        return 'text-foreground';
      case 'allowance':
        return 'text-success';
      case 'overtime':
        return 'text-accent';
      case 'deduction':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Salary Details</h2>
            <p className="text-sm text-muted-foreground mt-1">November 2025</p>
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
          <div className="bg-muted rounded-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{employee?.name}</h3>
                <p className="text-sm text-muted-foreground">{employee?.employeeId}</p>
                <p className="text-sm text-muted-foreground">{employee?.department} - {employee?.designation}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Working Days</p>
                <p className="text-lg font-semibold text-foreground">{employee?.workingDays}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Overtime Hours</p>
                <p className="text-lg font-semibold text-foreground">{employee?.overtimeHours}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Leaves</p>
                <p className="text-lg font-semibold text-foreground">{employee?.leaves}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h4 className="font-semibold text-foreground mb-3">Salary Breakdown</h4>
            {breakdownItems?.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{item?.label}</span>
                <span className={`text-sm font-semibold ${getItemColor(item?.type)}`}>
                  {item?.type === 'deduction' ? '-' : '+'}₹{item?.value?.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">Net Salary</span>
              <span className="text-2xl font-bold text-primary">₹{employee?.netPay?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {employee?.paymentProof && (userRole === 'admin' || userRole === 'finance') && (
            <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle2" size={24} className="text-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Payment Proof Uploaded</p>
                  <p className="text-xs text-muted-foreground">{employee?.paymentDate}</p>
                </div>
                <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                  View
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="default"
              onClick={onClose}
              fullWidth
            >
              Close
            </Button>
            {(userRole === 'admin' || userRole === 'finance') && (
              <Button
                variant="default"
                size="default"
                iconName="Download"
                iconPosition="left"
                fullWidth
              >
                Download Slip
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryDetailsModal;