import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalaryCard = ({ employee, onViewDetails, onGenerateSlip, onUploadProof, userRole }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'processing':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return 'CheckCircle2';
      case 'pending':
        return 'Clock';
      case 'processing':
        return 'Loader2';
      default:
        return 'AlertCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="User" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{employee?.name}</h3>
            <p className="text-sm text-muted-foreground">{employee?.employeeId}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusColor(employee?.paymentStatus)}`}>
          <Icon name={getStatusIcon(employee?.paymentStatus)} size={14} />
          {employee?.paymentStatus}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Department</p>
          <p className="text-sm font-medium text-foreground">{employee?.department}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Position</p>
          <p className="text-sm font-medium text-foreground">{employee?.designation}</p>
        </div>
      </div>
      <div className="bg-muted rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Base Salary</p>
            <p className="text-lg font-semibold text-foreground">₹{employee?.baseSalary?.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Overtime</p>
            <p className="text-lg font-semibold text-accent">+₹{employee?.overtime?.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Deductions</p>
            <p className="text-lg font-semibold text-error">-₹{employee?.deductions?.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Net Salary</p>
            <p className="text-lg font-bold text-success">₹{employee?.netPay?.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(employee)}
          fullWidth
        >
          View Details
        </Button>
        {(userRole === 'admin' || userRole === 'finance') && (
          <>
            <Button
              variant="default"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              onClick={() => onGenerateSlip(employee)}
              fullWidth
            >
              Generate Slip
            </Button>
            {employee?.paymentStatus === 'paid' && (
              <Button
                variant="secondary"
                size="sm"
                iconName="Upload"
                iconPosition="left"
                onClick={() => onUploadProof(employee)}
                fullWidth
              >
                Upload Proof
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SalaryCard;