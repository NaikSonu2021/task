import React, { useState } from 'react';
import { SidebarProvider } from '../../components/ui/Sidebar';
import Sidebar from '../../components/ui/Sidebar';
import MobileMenuButton from '../../components/ui/MobileMenuButton';
import QuickActionDropdown from '../../components/ui/QuickActionDropdown';
import AuditLogTable from './components/AuditLogTable';
import FilterToolbar from './components/FilterToolbar';
import CategorySidebar from './components/CategorySidebar';
import EventDetailsPanel from './components/EventDetailsPanel';
import SecurityMonitoringDashboard from './components/SecurityMonitoringDashboard';
import IntegrationMonitoringPanel from './components/IntegrationMonitoringPanel';
import SearchBar from './components/SearchBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AuditTrailAndSystemMonitoring = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);
  const [savedFilters, setSavedFilters] = useState([
    {
      name: 'Today\'s Security Events',
      filters: {
        dateRange: 'today',
        user: 'all',
        actionType: 'all',
        severity: 'critical',
        status: 'all'
      }
    },
    {
      name: 'Failed Login Attempts',
      filters: {
        dateRange: 'last7days',
        user: 'all',
        actionType: 'login',
        severity: 'high',
        status: 'failed'
      }
    }
  ]);

  const auditLogs = [
    {
      id: 1,
      date: '29/11/2025',
      time: '20:09:24',
      userName: 'Rajesh Kumar',
      userRole: 'Administrator',
      action: 'Employee Record Updated',
      actionType: 'update',
      description: 'Salary information updated for Employee ID EMP-1234',
      ipAddress: '192.168.1.105',
      severity: 'medium',
      status: 'success',
      sessionId: 'SES-2025-11-29-001',
      affectedData: 'Employee Record - EMP-1234',
      changes: {
        before: 'Salary: ₹45,000',
        after: 'Salary: ₹50,000'
      },
      relatedEvents: [
        {
          action: 'Approval Request Sent',
          time: '20:08:15'
        }
      ]
    },
    {
      id: 2,
      date: '29/11/2025',
      time: '19:45:12',
      userName: 'Priya Sharma',
      userRole: 'Manager',
      action: 'New Task Created',
      actionType: 'create',
      description: 'New task TASK-5678 created for Development Team',
      ipAddress: '192.168.1.112',
      severity: 'low',
      status: 'success',
      sessionId: 'SES-2025-11-29-002',
      affectedData: 'Task Record - TASK-5678'
    },
    {
      id: 3,
      date: '29/11/2025',
      time: '19:30:45',
      userName: 'Amit Verma',
      userRole: 'Employee',
      action: 'Login Attempt Failed',
      actionType: 'login',
      description: 'Login attempt failed due to incorrect password',
      ipAddress: '192.168.1.125',
      severity: 'high',
      status: 'failed',
      sessionId: 'SES-2025-11-29-003'
    },
    {
      id: 4,
      date: '29/11/2025',
      time: '19:15:30',
      userName: 'Sunita Patel',
      userRole: 'Finance',
      action: 'Salary Payment Processed',
      actionType: 'update',
      description: 'Salary payment processed for November 2025',
      ipAddress: '192.168.1.108',
      severity: 'critical',
      status: 'success',
      sessionId: 'SES-2025-11-29-004',
      affectedData: 'Salary Record - November 2025',
      changes: {
        before: 'Status: Pending',
        after: 'Status: Paid'
      }
    },
    {
      id: 5,
      date: '29/11/2025',
      time: '18:50:20',
      userName: 'Vikas Mehta',
      userRole: 'Human Resources',
      action: 'New Employee Added',
      actionType: 'create',
      description: 'New employee EMP-5678 added to system',
      ipAddress: '192.168.1.115',
      severity: 'medium',
      status: 'success',
      sessionId: 'SES-2025-11-29-005',
      affectedData: 'Employee Record - EMP-5678'
    },
    {
      id: 6,
      date: '29/11/2025',
      time: '18:30:15',
      userName: 'Anuj Singh',
      userRole: 'Administrator',
      action: 'System Configuration Change',
      actionType: 'update',
      description: 'Working hours settings updated',
      ipAddress: '192.168.1.101',
      severity: 'high',
      status: 'success',
      sessionId: 'SES-2025-11-29-006',
      affectedData: 'System Configuration',
      changes: {
        before: 'Working Hours: 9:00 AM - 6:00 PM',
        after: 'Working Hours: 9:30 AM - 6:30 PM'
      }
    },
    {
      id: 7,
      date: '29/11/2025',
      time: '18:10:05',
      userName: 'Neha Gupta',
      userRole: 'Manager',
      action: 'Report Exported',
      actionType: 'export',
      description: 'Monthly attendance report exported in PDF format',
      ipAddress: '192.168.1.118',
      severity: 'low',
      status: 'success',
      sessionId: 'SES-2025-11-29-007',
      affectedData: 'Attendance Report - November 2025'
    },
    {
      id: 8,
      date: '29/11/2025',
      time: '17:55:40',
      userName: 'Rohit Sharma',
      userRole: 'Employee',
      action: 'Unauthorized Access Attempt',
      actionType: 'access',
      description: 'Attempted unauthorized access to Finance module',
      ipAddress: '192.168.1.130',
      severity: 'critical',
      status: 'failed',
      sessionId: 'SES-2025-11-29-008'
    },
    {
      id: 9,
      date: '29/11/2025',
      time: '17:40:25',
      userName: 'Pooja Desai',
      userRole: 'Human Resources',
      action: 'Candidate Status Updated',
      actionType: 'update',
      description: 'Candidate CAND-9012 status updated to Interview',
      ipAddress: '192.168.1.120',
      severity: 'low',
      status: 'success',
      sessionId: 'SES-2025-11-29-009',
      affectedData: 'Candidate Record - CAND-9012'
    },
    {
      id: 10,
      date: '29/11/2025',
      time: '17:20:10',
      userName: 'Sanjay Kumar',
      userRole: 'Administrator',
      action: 'User Permissions Modified',
      actionType: 'permission',
      description: 'Permissions updated for user USER-3456',
      ipAddress: '192.168.1.105',
      severity: 'high',
      status: 'success',
      sessionId: 'SES-2025-11-29-010',
      affectedData: 'User Permissions - USER-3456',
      changes: {
        before: 'Role: Employee',
        after: 'Role: Manager'
      }
    },
    {
      id: 11,
      date: '29/11/2025',
      time: '17:05:55',
      userName: 'Meena Rao',
      userRole: 'Finance',
      action: 'Payment Proof Uploaded',
      actionType: 'create',
      description: 'Salary payment proof uploaded for Employee EMP-7890',
      ipAddress: '192.168.1.110',
      severity: 'medium',
      status: 'success',
      sessionId: 'SES-2025-11-29-011',
      affectedData: 'Payment Record - EMP-7890'
    },
    {
      id: 12,
      date: '29/11/2025',
      time: '16:50:30',
      userName: 'Arjun Patel',
      userRole: 'Manager',
      action: 'Task Reopened',
      actionType: 'update',
      description: 'Completed task TASK-3456 reopened',
      ipAddress: '192.168.1.115',
      severity: 'medium',
      status: 'success',
      sessionId: 'SES-2025-11-29-012',
      affectedData: 'Task Record - TASK-3456',
      changes: {
        before: 'Status: Completed',
        after: 'Status: In Progress'
      }
    },
    {
      id: 13,
      date: '29/11/2025',
      time: '16:35:15',
      userName: 'Deepika Singh',
      userRole: 'Employee',
      action: 'Attendance Marked',
      actionType: 'create',
      description: 'Daily attendance successfully marked',
      ipAddress: '192.168.1.125',
      severity: 'info',
      status: 'success',
      sessionId: 'SES-2025-11-29-013',
      affectedData: 'Attendance Record - 29/11/2025'
    },
    {
      id: 14,
      date: '29/11/2025',
      time: '16:20:45',
      userName: 'Karan Malhotra',
      userRole: 'Administrator',
      action: 'Database Backup',
      actionType: 'create',
      description: 'Automated daily database backup completed',
      ipAddress: '192.168.1.100',
      severity: 'info',
      status: 'success',
      sessionId: 'SYS-2025-11-29-001',
      affectedData: 'System Backup'
    },
    {
      id: 15,
      date: '29/11/2025',
      time: '16:05:20',
      userName: 'Swati Joshi',
      userRole: 'Human Resources',
      action: 'Interview Scheduled',
      actionType: 'create',
      description: 'Interview scheduled for candidate CAND-5678',
      ipAddress: '192.168.1.122',
      severity: 'low',
      status: 'success',
      sessionId: 'SES-2025-11-29-014',
      affectedData: 'Interview Schedule - CAND-5678'
    },
    {
      id: 16,
      date: '29/11/2025',
      time: '15:50:10',
      userName: 'Rahul Tripathi',
      userRole: 'Manager',
      action: 'Task Assigned',
      actionType: 'update',
      description: 'Task TASK-7890 assigned to Employee EMP-2345',
      ipAddress: '192.168.1.118',
      severity: 'low',
      status: 'success',
      sessionId: 'SES-2025-11-29-015',
      affectedData: 'Task Assignment - TASK-7890'
    },
    {
      id: 17,
      date: '29/11/2025',
      time: '15:35:55',
      userName: 'Asha Reddy',
      userRole: 'Finance',
      action: 'Salary Slip Generated',
      actionType: 'create',
      description: 'Salary slips generated for all employees for November 2025',
      ipAddress: '192.168.1.108',
      severity: 'medium',
      status: 'success',
      sessionId: 'SES-2025-11-29-016',
      affectedData: 'Salary Slips - November 2025'
    },
    {
      id: 18,
      date: '29/11/2025',
      time: '15:20:30',
      userName: 'Vinay Kumar',
      userRole: 'Employee',
      action: 'Password Changed',
      actionType: 'update',
      description: 'User successfully changed their password',
      ipAddress: '192.168.1.130',
      severity: 'low',
      status: 'success',
      sessionId: 'SES-2025-11-29-017',
      affectedData: 'User Credentials'
    },
    {
      id: 19,
      date: '29/11/2025',
      time: '15:05:15',
      userName: 'Reena Shah',
      userRole: 'Administrator',
      action: 'System Updated',
      actionType: 'update',
      description: 'System software updated to version 2.5.0',
      ipAddress: '192.168.1.101',
      severity: 'critical',
      status: 'success',
      sessionId: 'SYS-2025-11-29-002',
      affectedData: 'System Version',
      changes: {
        before: 'Version: 2.4.8',
        after: 'Version: 2.5.0'
      }
    },
    {
      id: 20,
      date: '29/11/2025',
      time: '14:50:45',
      userName: 'Manish Agarwal',
      userRole: 'Manager',
      action: 'Team Meeting Scheduled',
      actionType: 'create',
      description: 'Weekly meeting scheduled for Development Team',
      ipAddress: '192.168.1.112',
      severity: 'info',
      status: 'success',
      sessionId: 'SES-2025-11-29-018',
      affectedData: 'Meeting Schedule'
    },
    {
      id: 21,
      date: '29/11/2025',
      time: '14:35:20',
      userName: 'Preeti Nair',
      userRole: 'Human Resources',
      action: 'Leave Request Approved',
      actionType: 'update',
      description: 'Leave request for Employee EMP-4567 approved',
      ipAddress: '192.168.1.120',
      severity: 'low',
      status: 'success',
      sessionId: 'SES-2025-11-29-019',
      affectedData: 'Leave Record - EMP-4567'
    },
    {
      id: 22,
      date: '29/11/2025',
      time: '14:20:10',
      userName: 'Gaurav Saxena',
      userRole: 'Employee',
      action: 'Document Uploaded',
      actionType: 'create',
      description: 'Document uploaded for Task TASK-1234',
      ipAddress: '192.168.1.128',
      severity: 'info',
      status: 'success',
      sessionId: 'SES-2025-11-29-020',
      affectedData: 'Task Document - TASK-1234'
    },
    {
      id: 23,
      date: '29/11/2025',
      time: '14:05:55',
      userName: 'Kavita Banerjee',
      userRole: 'Finance',
      action: 'Expense Report Reviewed',
      actionType: 'access',
      description: 'Expense report for November 2025 reviewed',
      ipAddress: '192.168.1.110',
      severity: 'low',
      status: 'success',
      sessionId: 'SES-2025-11-29-021',
      affectedData: 'Expense Report - November 2025'
    },
    {
      id: 24,
      date: '29/11/2025',
      time: '13:50:30',
      userName: 'Abhishek Chauhan',
      userRole: 'Administrator',
      action: 'User Account Deactivated',
      actionType: 'update',
      description: 'Former employee USER-6789 account deactivated',
      ipAddress: '192.168.1.105',
      severity: 'high',
      status: 'success',
      sessionId: 'SES-2025-11-29-022',
      affectedData: 'User Account - USER-6789',
      changes: {
        before: 'Status: Active',
        after: 'Status: Inactive'
      }
    },
    {
      id: 25,
      date: '29/11/2025',
      time: '13:35:15',
      userName: 'Simran Kaur',
      userRole: 'Manager',
      action: 'Performance Review',
      actionType: 'create',
      description: 'Quarterly performance review completed for Employee EMP-8901',
      ipAddress: '192.168.1.115',
      severity: 'medium',
      status: 'success',
      sessionId: 'SES-2025-11-29-023',
      affectedData: 'Performance Review - EMP-8901'
    },
    {
      id: 26,
      date: '29/11/2025',
      time: '13:20:45',
      userName: 'Tarun Mittal',
      userRole: 'Employee',
      action: 'Task Comment Added',
      actionType: 'create',
      description: 'New comment added to Task TASK-2345',
      ipAddress: '192.168.1.132',
      severity: 'info',
      status: 'success',
      sessionId: 'SES-2025-11-29-024',
      affectedData: 'Task Comment - TASK-2345'
    },
    {
      id: 27,
      date: '29/11/2025',
      time: '13:05:20',
      userName: 'Urvashi Pandey',
      userRole: 'Human Resources',
      action: 'Training Session Scheduled',
      actionType: 'create',
      description: 'Onboarding training scheduled for new employees',
      ipAddress: '192.168.1.122',
      severity: 'low',
      status: 'success',
      sessionId: 'SES-2025-11-29-025',
      affectedData: 'Training Schedule'
    },
    {
      id: 28,
      date: '29/11/2025',
      time: '12:50:10',
      userName: 'Vishal Rathore',
      userRole: 'Administrator',
      action: 'API Key Generated',
      actionType: 'create',
      description: 'New API key generated for WhatsApp integration',
      ipAddress: '192.168.1.101',
      severity: 'high',
      status: 'success',
      sessionId: 'SES-2025-11-29-026',
      affectedData: 'API Key - WhatsApp'
    },
    {
      id: 29,
      date: '29/11/2025',
      time: '12:35:55',
      userName: 'Anjali Verma',
      userRole: 'Finance',
      action: 'Invoice Generated',
      actionType: 'create',
      description: 'Invoice INV-2025-1234 generated for Client CLI-5678',
      ipAddress: '192.168.1.108',
      severity: 'medium',
      status: 'success',
      sessionId: 'SES-2025-11-29-027',
      affectedData: 'Invoice - INV-2025-1234'
    },
    {
      id: 30,
      date: '29/11/2025',
      time: '12:20:30',
      userName: 'Yogesh Kumar',
      userRole: 'Manager',
      action: 'Project Milestone Updated',
      actionType: 'update',
      description: 'Project PROJ-9012 Milestone 3 marked as Complete',
      ipAddress: '192.168.1.118',
      severity: 'medium',
      status: 'success',
      sessionId: 'SES-2025-11-29-028',
      affectedData: 'Project Milestone - PROJ-9012',
      changes: {
        before: 'Milestone 3: In Progress',
        after: 'Milestone 3: Complete'
      }
    }
  ];

  const categoryCounts = {
    all: 156,
    user: 89,
    system: 23,
    security: 12,
    data: 45,
    authentication: 34,
    permissions: 8,
    integration: 15,
    export: 18
  };

  const securityMetrics = {
    failedLogins: 24,
    permissionViolations: 8,
    unusualAccess: 15,
    threats: 3,
    recentIncidents: [
      {
        title: 'Multiple Failed Login Attempts',
        description: 'User Amit Verma made 3 failed login attempts within 5 minutes',
        severity: 'high',
        user: 'Amit Verma',
        ipAddress: '192.168.1.125',
        time: '2 hours ago'
      },
      {
        title: 'Unauthorized Access Attempt',
        description: 'Attempted unauthorized access to Finance module',
        severity: 'critical',
        user: 'Rohit Sharma',
        ipAddress: '192.168.1.130',
        time: '3 hours ago'
      },
      {
        title: 'Unusual Data Export',
        description: 'Large volume data export outside working hours',
        severity: 'medium',
        user: 'Neha Gupta',
        ipAddress: '192.168.1.118',
        time: '5 hours ago'
      }
    ]
  };

  const integrations = [
    {
      name: 'WhatsApp Business API',
      description: 'Messages and Notifications',
      icon: 'MessageSquare',
      status: 'connected',
      apiCalls: '1,234',
      successRate: '99.8%',
      lastSync: '2 minutes ago',
      recentErrors: 0
    },
    {
      name: 'Email Service',
      description: 'Email Notifications',
      icon: 'Mail',
      status: 'connected',
      apiCalls: '856',
      successRate: '98.5%',
      lastSync: '5 minutes ago',
      recentErrors: 2
    },
    {
      name: 'Cloud Storage',
      description: 'File Storage',
      icon: 'Cloud',
      status: 'connected',
      apiCalls: '445',
      successRate: '100%',
      lastSync: '1 minute ago',
      recentErrors: 0
    },
    {
      name: 'Payment Gateway',
      description: 'Salary Payments',
      icon: 'CreditCard',
      status: 'warning',
      apiCalls: '123',
      successRate: '95.2%',
      lastSync: '15 minutes ago',
      recentErrors: 5
    }
  ];

  const handleFilterChange = (filters) => {
    console.log('Filters applied:', filters);
  };

  const handleSaveFilter = (filter) => {
    setSavedFilters([...savedFilters, filter]);
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  const handleExportReport = () => {
    console.log('Exporting audit report...');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar userRole="admin" />
        <MobileMenuButton />

        <div className="main-content">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Audit Trail and System Monitoring
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive monitoring of system activities, user actions, and security events
                </p>
              </div>
              <div className="flex items-center gap-3">
                <QuickActionDropdown userRole="admin" />
                <Button
                  variant="default"
                  iconName="FileDown"
                  iconPosition="left"
                  onClick={handleExportReport}
                >
                  Export Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <CategorySidebar
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  categoryCounts={categoryCounts}
                />
              </div>

              <div className="lg:col-span-3 space-y-6">
                <SearchBar onSearch={handleSearch} />

                <FilterToolbar
                  onFilterChange={handleFilterChange}
                  savedFilters={savedFilters}
                  onSaveFilter={handleSaveFilter}
                />

                <SecurityMonitoringDashboard securityMetrics={securityMetrics} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Icon name="FileText" size={20} />
                        Audit Logs ({auditLogs?.length})
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={16} />
                        <span>Last Updated: Now</span>
                      </div>
                    </div>
                    <AuditLogTable
                      logs={auditLogs}
                      onSelectLog={setSelectedLog}
                      selectedLogId={selectedLog?.id}
                    />
                  </div>

                  <div className="lg:col-span-1">
                    <EventDetailsPanel
                      event={selectedLog}
                      onClose={() => setSelectedLog(null)}
                    />
                  </div>
                </div>

                <IntegrationMonitoringPanel integrations={integrations} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AuditTrailAndSystemMonitoring;