import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EmployeeManagement from './pages/employee-management-and-user-administration';
import TaskManagementHub from './pages/task-management-and-assignment-hub';
import ReportsAndAnalyticsDashboard from './pages/reports-and-analytics-dashboard';
import NotificationCenterAndCommunicationHub from './pages/notification-center-and-communication-hub';
import SystemConfigurationAndSettings from './pages/system-configuration-and-settings';
import AttendanceTrackingPage from './pages/attendance-tracking-and-working-hours-monitor';
import FinanceModuleAndPayrollManagement from './pages/finance-module-and-payroll-management';
import TaskDetailAndConversationInterface from './pages/task-detail-and-conversation-interface';
import AdminDashboard from './pages/admin-dashboard-and-system-overview';
import HRModuleAndHiringManagement from './pages/hr-module-and-hiring-management';
import AuditTrailAndSystemMonitoring from './pages/audit-trail-and-system-monitoring';
import AuthenticationAndRoleSelection from './pages/authentication-and-role-selection';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationAndRoleSelection />} />
        <Route path="/employee-management-and-user-administration" element={<EmployeeManagement />} />
        <Route path="/task-management-and-assignment-hub" element={<TaskManagementHub />} />
        <Route path="/reports-and-analytics-dashboard" element={<ReportsAndAnalyticsDashboard />} />
        <Route path="/notification-center-and-communication-hub" element={<NotificationCenterAndCommunicationHub />} />
        <Route path="/system-configuration-and-settings" element={<SystemConfigurationAndSettings />} />
        <Route path="/attendance-tracking-and-working-hours-monitor" element={<AttendanceTrackingPage />} />
        <Route path="/finance-module-and-payroll-management" element={<FinanceModuleAndPayrollManagement />} />
        <Route path="/task-detail-and-conversation-interface" element={<TaskDetailAndConversationInterface />} />
        <Route path="/admin-dashboard-and-system-overview" element={<AdminDashboard />} />
        <Route path="/hr-module-and-hiring-management" element={<HRModuleAndHiringManagement />} />
        <Route path="/audit-trail-and-system-monitoring" element={<AuditTrailAndSystemMonitoring />} />
        <Route path="/authentication-and-role-selection" element={<AuthenticationAndRoleSelection />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
