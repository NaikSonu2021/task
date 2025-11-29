import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import IntegrationStatusIndicator from '../../../components/ui/IntegrationStatusIndicator';

const EmployeeDetailsPanel = ({ employee, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('profile');

  if (!employee) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Icon name="UserCircle" size={64} className="mx-auto mb-4 opacity-50" />
          <p>Select to view employee details</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'permissions', label: 'Permissions', icon: 'Shield' },
    { id: 'activity', label: 'Activity', icon: 'Activity' }
  ];

  const permissions = [
    { id: 'task_create', label: 'Create Task', granted: employee?.permissions?.taskCreate || false },
    { id: 'task_view', label: 'View Task', granted: employee?.permissions?.taskView || true },
    { id: 'task_edit', label: 'Edit Task', granted: employee?.permissions?.taskEdit || false },
    { id: 'employee_view', label: 'View Employee', granted: employee?.permissions?.employeeView || true },
    { id: 'employee_manage', label: 'Manage Employee', granted: employee?.permissions?.employeeManage || false },
    { id: 'finance_view', label: 'View Finance', granted: employee?.permissions?.financeView || false },
    { id: 'reports_access', label: 'Reports Access', granted: employee?.permissions?.reportsAccess || false },
    { id: 'system_config', label: 'System Configuration', granted: employee?.permissions?.systemConfig || false }
  ];

  const activityLog = [
    { id: 1, action: 'Completed Task', details: 'TASK-2024-156', timestamp: '2 hours ago', icon: 'CheckCircle2' },
    { id: 2, action: 'Marked Attendance', details: '9:15 AM', timestamp: '5 hours ago', icon: 'Clock' },
    { id: 3, action: 'Updated Profile', details: 'Changed phone number', timestamp: '1 day ago', icon: 'Edit' },
    { id: 4, action: 'Assigned Task', details: 'TASK-2024-158', timestamp: '2 days ago', icon: 'FileText' }
  ];

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Employee Details</h3>
        <Button
          variant="ghost"
          size="icon"
          iconName="X"
          onClick={onClose}
        />
      </div>
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-4">
          <Image
            src={employee?.avatar}
            alt={employee?.avatarAlt}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-foreground">{employee?.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">{employee?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                <Icon name={employee?.roleIcon} size={14} />
                {employee?.role}
              </span>
              <IntegrationStatusIndicator
                status={employee?.whatsappConnected ? 'connected' : 'disconnected'}
                service="WhatsApp"
                showLabel
              />
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => onEdit(employee)}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="border-b border-border">
        <div className="flex gap-1 px-4">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-semibold text-foreground mb-3">Basic Information</h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">Employee ID</label>
                  <p className="text-sm font-medium text-foreground mt-1">{employee?.id}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Department</label>
                  <p className="text-sm font-medium text-foreground mt-1">{employee?.department}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Phone</label>
                  <p className="text-sm font-medium text-foreground mt-1">{employee?.phone}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Status</label>
                  <p className="text-sm font-medium text-foreground mt-1">{employee?.status === 'active' ? 'Active' : 'Inactive'}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Join Date</label>
                  <p className="text-sm font-medium text-foreground mt-1">{employee?.joinDate}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Last Activity</label>
                  <p className="text-sm font-medium text-foreground mt-1">{employee?.lastActivity}</p>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-foreground mb-3">Job Description</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{employee?.jobDescription}</p>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-foreground mb-3">Task Statistics</h5>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Assigned</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{employee?.stats?.assigned || 0}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success mt-1">{employee?.stats?.completed || 0}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning mt-1">{employee?.stats?.pending || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-sm font-semibold text-foreground">Permission Matrix</h5>
              <Button variant="outline" size="sm" iconName="Edit">
                Edit Permissions
              </Button>
            </div>
            <div className="space-y-2">
              {permissions?.map((permission) => (
                <div
                  key={permission?.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted"
                >
                  <span className="text-sm text-foreground">{permission?.label}</span>
                  <Icon
                    name={permission?.granted ? 'CheckCircle2' : 'XCircle'}
                    size={20}
                    className={permission?.granted ? 'text-success' : 'text-error'}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h5 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h5>
            <div className="space-y-3">
              {activityLog?.map((activity) => (
                <div
                  key={activity?.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={activity?.icon} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity?.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity?.details}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity?.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetailsPanel;