import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FinancialReportCard = ({ report, onDownload, onView }) => {
  const getReportIcon = (type) => {
    switch (type) {
      case 'monthly':
        return 'Calendar';
      case 'department':
        return 'Users';
      case 'annual':
        return 'TrendingUp';
      case 'tax':
        return 'FileText';
      default:
        return 'BarChart3';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
        return 'bg-success/10 text-success';
      case 'generating':
        return 'bg-warning/10 text-warning';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name={getReportIcon(report?.type)} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{report?.title}</h3>
            <p className="text-sm text-muted-foreground">{report?.period}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report?.status)}`}>
          {report?.status === 'ready' ? 'Ready' : report?.status === 'generating' ? 'Generating' : 'Pending'}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
          <p className="text-lg font-semibold text-foreground">₹{report?.totalAmount?.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Employees</p>
          <p className="text-lg font-semibold text-foreground">{report?.employeeCount}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <Icon name="Calendar" size={14} />
        <span>Generated: {report?.generatedDate}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onView(report)}
          fullWidth
          disabled={report?.status !== 'ready'}
        >
          View
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="Download"
          iconPosition="left"
          onClick={() => onDownload(report)}
          fullWidth
          disabled={report?.status !== 'ready'}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default FinancialReportCard;