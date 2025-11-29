import React from 'react';
import Icon from '../../../components/AppIcon';

const PipelineStage = ({ stage, count, conversionRate, isActive, onClick }) => {
  const stageConfig = {
    new: {
      label: 'नए आवेदन',
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
    },
    screening: {
      label: 'स्क्रीनिंग',
      icon: 'Search',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning',
    },
    interview: {
      label: 'साक्षात्कार',
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent',
    },
    offer: {
      label: 'ऑफर',
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success',
    },
    rejected: {
      label: 'अस्वीकृत',
      icon: 'XCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error',
    },
  };

  const config = stageConfig?.[stage];

  return (
    <button
      onClick={() => onClick(stage)}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
        isActive
          ? `${config?.borderColor} ${config?.bgColor} shadow-elevation-2`
          : 'border-border bg-card hover:bg-muted'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg ${config?.bgColor} flex items-center justify-center`}
        >
          <Icon name={config?.icon} size={20} className={config?.color} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{config?.label}</h3>
          <p className="text-2xl font-bold text-foreground">{count}</p>
        </div>
      </div>
      {conversionRate !== null && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${config?.bgColor} transition-all duration-300`}
              style={{ width: `${conversionRate}%` }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {conversionRate}%
          </span>
        </div>
      )}
    </button>
  );
};

export default PipelineStage;