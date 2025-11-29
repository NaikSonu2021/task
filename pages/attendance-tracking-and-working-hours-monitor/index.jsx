import React, { useState } from 'react';
import { SidebarProvider } from '../../components/ui/Sidebar';
import Sidebar from '../../components/ui/Sidebar';
import MobileMenuButton from '../../components/ui/MobileMenuButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import AttendanceCalendar from './components/AttendanceCalendar';
import AttendanceStatsCard from './components/AttendanceStatsCard';
import EmployeeAttendanceTable from './components/EmployeeAttendanceTable';
import EmployeeDetailPanel from './components/EmployeeDetailPanel';
import WorkingHoursConfig from './components/WorkingHoursConfig';
import BulkOperationsModal from './components/BulkOperationsModal';
import LiveMonitoringPanel from './components/LiveMonitoringPanel';

const AttendanceTrackingPage = () => {
  const [selectedDate, setSelectedDate] = useState('2025-11-29');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState('daily');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  const viewModeOptions = [
    { value: 'daily', label: 'Daily View' },
    { value: 'weekly', label: 'Weekly View' },
    { value: 'monthly', label: 'Monthly View' }
  ];

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailPanel(true);
  };

  const handleExportReport = () => {
    console.log('Exporting attendance report...');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar userRole="admin" />
        <MobileMenuButton />

        <main className="main-content sidebar-collapsed lg:sidebar-expanded">
          <div className="p-4 lg:p-8">
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Tracking</h1>
                  <p className="text-muted-foreground">Employee attendance and working hours management</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="default"
                    iconName="Settings"
                    iconPosition="left"
                    onClick={() => setShowConfigModal(true)}
                  >
                    Working Hours Settings
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    iconName="Users"
                    iconPosition="left"
                    onClick={() => setShowBulkModal(true)}
                  >
                    Bulk Operations
                  </Button>
                  <Button
                    variant="default"
                    size="default"
                    iconName="Download"
                    iconPosition="left"
                    onClick={handleExportReport}
                  >
                    Export Report
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <AttendanceStatsCard
                  title="Total Present"
                  value="156"
                  subtitle="Total employees today"
                  icon="UserCheck"
                  variant="success"
                  trend="up"
                  trendValue="+5%"
                />
                <AttendanceStatsCard
                  title="Absent"
                  value="12"
                  subtitle="Employees absent today"
                  icon="UserX"
                  variant="error"
                  trend="down"
                  trendValue="-2%"
                />
                <AttendanceStatsCard
                  title="Late Arrivals"
                  value="8"
                  subtitle="Late check-ins"
                  icon="Clock"
                  variant="warning"
                  trend={undefined}
                  trendValue={undefined}
                />
                <AttendanceStatsCard
                  title="Average Working Hours"
                  value="8.5h"
                  subtitle="Today's average"
                  icon="TrendingUp"
                  variant="default"
                  trend="up"
                  trendValue="+0.5h"
                />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Select
                  options={viewModeOptions}
                  value={viewMode}
                  onChange={setViewMode}
                  className="w-48"
                />
                <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                  <Icon name="Calendar" size={18} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {new Date(selectedDate)?.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  <AttendanceCalendar
                    onDateSelect={setSelectedDate}
                    selectedDate={selectedDate}
                  />
                  <LiveMonitoringPanel />
                </div>
              </div>

              <div className="lg:col-span-6">
                <EmployeeAttendanceTable
                  onEmployeeSelect={handleEmployeeSelect}
                  selectedEmployee={selectedEmployee}
                />
              </div>

              <div className="lg:col-span-3">
                <div className={`lg:sticky lg:top-8 ${showDetailPanel ? 'block' : 'hidden lg:block'}`}>
                  <EmployeeDetailPanel
                    employee={selectedEmployee}
                    onClose={() => setShowDetailPanel(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        <WorkingHoursConfig
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
        />

        <BulkOperationsModal
          isOpen={showBulkModal}
          onClose={() => setShowBulkModal(false)}
        />
      </div>
    </SidebarProvider>
  );
};

export default AttendanceTrackingPage;