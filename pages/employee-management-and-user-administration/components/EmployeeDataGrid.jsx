import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const EmployeeDataGrid = ({ 
  employees, 
  selectedEmployees, 
  onSelectEmployee, 
  onSelectAll,
  onViewDetails,
  onEditEmployee,
  onToggleStatus 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-success/10 text-success',
      'inactive': 'bg-error/10 text-error',
      'on-leave': 'bg-warning/10 text-warning'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusText = (status) => {
    const texts = {
      'active': 'Active',
      'inactive': 'Inactive',
      'on-leave': 'On Leave'
    };
    return texts?.[status] || status;
  };

  return (
    <div className="h-full overflow-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-muted z-10">
          <tr>
            <th className="p-3 text-left">
              <Checkbox
                checked={selectedEmployees?.length === employees?.length}
                onChange={(e) => onSelectAll(e?.target?.checked)}
              />
            </th>
            <th className="p-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/80" onClick={() => handleSort('id')}>
              <div className="flex items-center gap-2">
                Employee ID
                <Icon name="ArrowUpDown" size={14} />
              </div>
            </th>
            <th className="p-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/80" onClick={() => handleSort('name')}>
              <div className="flex items-center gap-2">
                Name
                <Icon name="ArrowUpDown" size={14} />
              </div>
            </th>
            <th className="p-3 text-left text-sm font-semibold text-foreground">Role</th>
            <th className="p-3 text-left text-sm font-semibold text-foreground">Department</th>
            <th className="p-3 text-left text-sm font-semibold text-foreground">Status</th>
            <th className="p-3 text-left text-sm font-semibold text-foreground">Last Activity</th>
            <th className="p-3 text-left text-sm font-semibold text-foreground">WhatsApp</th>
            <th className="p-3 text-center text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee) => (
            <tr 
              key={employee?.id}
              className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onViewDetails(employee)}
            >
              <td className="p-3" onClick={(e) => e?.stopPropagation()}>
                <Checkbox
                  checked={selectedEmployees?.includes(employee?.id)}
                  onChange={(e) => onSelectEmployee(employee?.id, e?.target?.checked)}
                />
              </td>
              <td className="p-3 text-sm font-medium text-foreground">{employee?.id}</td>
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={employee?.avatar}
                    alt={employee?.avatarAlt}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">{employee?.name}</div>
                    <div className="text-xs text-muted-foreground">{employee?.email}</div>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  <Icon name={employee?.roleIcon} size={14} />
                  {employee?.role}
                </span>
              </td>
              <td className="p-3 text-sm text-foreground">{employee?.department}</td>
              <td className="p-3">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee?.status)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {getStatusText(employee?.status)}
                </span>
              </td>
              <td className="p-3 text-sm text-muted-foreground">{employee?.lastActivity}</td>
              <td className="p-3">
                <Icon 
                  name={employee?.whatsappConnected ? 'CheckCircle2' : 'XCircle'} 
                  size={18}
                  className={employee?.whatsappConnected ? 'text-success' : 'text-error'}
                />
              </td>
              <td className="p-3" onClick={(e) => e?.stopPropagation()}>
                <div className="flex items-center justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="Eye"
                    onClick={() => onViewDetails(employee)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="Edit"
                    onClick={() => onEditEmployee(employee)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName={employee?.status === 'active' ? 'UserX' : 'UserCheck'}
                    onClick={() => onToggleStatus(employee)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDataGrid;