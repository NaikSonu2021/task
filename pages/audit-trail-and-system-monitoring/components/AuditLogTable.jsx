import React from 'react';
import Icon from '../../../components/AppIcon';

const AuditLogTable = ({ logs, onSelectLog, selectedLogId }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'text-error bg-error/10',
      high: 'text-warning bg-warning/10',
      medium: 'text-accent bg-accent/10',
      low: 'text-muted-foreground bg-muted',
      info: 'text-primary bg-primary/10'
    };
    return colors?.[severity] || colors?.info;
  };

  const getActionIcon = (actionType) => {
    const icons = {
      create: 'Plus',
      update: 'Edit',
      delete: 'Trash2',
      login: 'LogIn',
      logout: 'LogOut',
      access: 'Eye',
      permission: 'Shield',
      export: 'Download',
      import: 'Upload'
    };
    return icons?.[actionType] || 'Activity';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs?.map((log) => (
              <tr
                key={log?.id}
                onClick={() => onSelectLog(log)}
                className={`cursor-pointer transition-colors hover:bg-muted/30 ${
                  selectedLogId === log?.id ? 'bg-primary/5' : ''
                }`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {log?.date}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {log?.time}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {log?.userName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {log?.userRole}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Icon
                      name={getActionIcon(log?.actionType)}
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm text-foreground">{log?.action}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground line-clamp-2">
                    {log?.description}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm font-mono text-muted-foreground">
                    {log?.ipAddress}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                      log?.severity
                    )}`}
                  >
                    {log?.severity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        log?.status === 'success' ?'bg-success'
                          : log?.status === 'failed' ?'bg-error' :'bg-warning'
                      }`}
                    />
                    <span className="text-sm text-foreground capitalize">
                      {log?.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogTable;