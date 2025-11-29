import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventDetailsPanel = ({ event, onClose }) => {
  if (!event) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 flex flex-col items-center justify-center h-full">
        <Icon name="FileSearch" size={48} className="text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center">
          विवरण देखने के लिए कोई इवेंट चुनें
        </p>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'text-error bg-error/10 border-error',
      high: 'text-warning bg-warning/10 border-warning',
      medium: 'text-accent bg-accent/10 border-accent',
      low: 'text-muted-foreground bg-muted border-border',
      info: 'text-primary bg-primary/10 border-primary'
    };
    return colors?.[severity] || colors?.info;
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="FileText" size={20} />
          इवेंट विवरण
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
        />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div
          className={`p-4 rounded-lg border ${getSeverityColor(event?.severity)}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">गंभीरता स्तर</span>
            <span className="text-sm font-bold uppercase">{event?.severity}</span>
          </div>
          <p className="text-sm">{event?.action}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              समय और तिथि
            </label>
            <p className="text-sm text-foreground mt-1">
              {event?.date} {event?.time}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              उपयोगकर्ता जानकारी
            </label>
            <div className="mt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {event?.userName}
                </p>
                <p className="text-xs text-muted-foreground">{event?.userRole}</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              विवरण
            </label>
            <p className="text-sm text-foreground mt-1">{event?.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                IP पता
              </label>
              <p className="text-sm font-mono text-foreground mt-1">
                {event?.ipAddress}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                स्थिति
              </label>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    event?.status === 'success' ?'bg-success'
                      : event?.status === 'failed' ?'bg-error' :'bg-warning'
                  }`}
                />
                <span className="text-sm text-foreground capitalize">
                  {event?.status}
                </span>
              </div>
            </div>
          </div>

          {event?.sessionId && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                सत्र ID
              </label>
              <p className="text-sm font-mono text-foreground mt-1">
                {event?.sessionId}
              </p>
            </div>
          )}

          {event?.affectedData && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                प्रभावित डेटा
              </label>
              <p className="text-sm text-foreground mt-1">{event?.affectedData}</p>
            </div>
          )}

          {event?.changes && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                परिवर्तन
              </label>
              <div className="bg-muted rounded-lg p-3 space-y-2">
                {event?.changes?.before && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      पहले:
                    </p>
                    <p className="text-sm text-foreground font-mono">
                      {event?.changes?.before}
                    </p>
                  </div>
                )}
                {event?.changes?.after && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      बाद में:
                    </p>
                    <p className="text-sm text-foreground font-mono">
                      {event?.changes?.after}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {event?.relatedEvents && event?.relatedEvents?.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                संबंधित गतिविधियां
              </label>
              <div className="space-y-2">
                {event?.relatedEvents?.map((related, index) => (
                  <div
                    key={index}
                    className="bg-muted rounded-lg p-3 flex items-center gap-3"
                  >
                    <Icon
                      name="Link"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{related?.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {related?.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 border-t border-border flex gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Copy"
          iconPosition="left"
          fullWidth
        >
          विवरण कॉपी करें
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="FileDown"
          iconPosition="left"
          fullWidth
        >
          निर्यात करें
        </Button>
      </div>
    </div>
  );
};

export default EventDetailsPanel;