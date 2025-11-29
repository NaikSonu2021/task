import React from 'react';
import Icon from '../../../components/AppIcon';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';

const IntegrationMonitoringPanel = ({ integrations }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <Icon name="Plug" size={20} />
        एकीकरण निगरानी
      </h3>
      <div className="space-y-4">
        {integrations?.map((integration, index) => (
          <div
            key={index}
            className="bg-background rounded-lg border border-border p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={integration?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {integration?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {integration?.description}
                  </p>
                </div>
              </div>
              <IntegrationStatusIndicator
                status={integration?.status}
                service={integration?.name}
                showLabel
              />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">API कॉल</p>
                <p className="text-sm font-semibold text-foreground">
                  {integration?.apiCalls}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">सफलता दर</p>
                <p className="text-sm font-semibold text-success">
                  {integration?.successRate}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">अंतिम सिंक</p>
                <p className="text-sm font-semibold text-foreground">
                  {integration?.lastSync}
                </p>
              </div>
            </div>

            {integration?.recentErrors > 0 && (
              <div className="mt-3 p-2 bg-error/10 rounded-lg flex items-center gap-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <p className="text-xs text-error">
                  {integration?.recentErrors} हाल की त्रुटियां
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationMonitoringPanel;