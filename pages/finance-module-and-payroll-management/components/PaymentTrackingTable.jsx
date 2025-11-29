import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentTrackingTable = ({ payments, onViewProof, onVerify, userRole }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { color: 'bg-success/10 text-success', icon: 'CheckCircle2', label: 'Verified' },
      pending: { color: 'bg-warning/10 text-warning', icon: 'Clock', label: 'Pending' },
      processing: { color: 'bg-accent/10 text-accent', icon: 'Loader2', label: 'Processing' },
      failed: { color: 'bg-error/10 text-error', icon: 'XCircle', label: 'Failed' },
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={14} />
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Payment Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments?.map((payment) => (
              <tr key={payment?.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{payment?.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{payment?.employeeId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-semibold text-foreground">₹{payment?.amount?.toLocaleString('en-IN')}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-foreground">{payment?.paymentDate}</p>
                  <p className="text-xs text-muted-foreground">{payment?.paymentTime}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Icon name={payment?.method === 'bank' ? 'Building2' : 'Wallet'} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{payment?.methodLabel}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(payment?.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {payment?.hasProof && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewProof(payment)}
                      />
                    )}
                    {(userRole === 'admin' || userRole === 'finance') && payment?.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="CheckCircle2"
                        onClick={() => onVerify(payment)}
                      />
                    )}
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

export default PaymentTrackingTable;