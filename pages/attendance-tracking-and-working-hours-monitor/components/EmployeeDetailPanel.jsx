import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmployeeDetailPanel = ({ employee, onClose }) => {
  if (!employee) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="UserCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">Select an employee to view details</p>
      </div>
    );
  }

  const attendanceHistory = [
    {
      date: "29/11/2025",
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
      hours: "8h 45m",
      status: "present",
      firstVisit: "09:15:23 AM"
    },
    {
      date: "28/11/2025",
      checkIn: "09:10 AM",
      checkOut: "06:25 PM",
      hours: "8h 40m",
      status: "present",
      firstVisit: "09:10:15 AM"
    },
    {
      date: "27/11/2025",
      checkIn: "09:30 AM",
      checkOut: "06:35 PM",
      hours: "8h 35m",
      status: "late",
      firstVisit: "09:30:42 AM"
    },
    {
      date: "26/11/2025",
      checkIn: "09:05 AM",
      checkOut: "06:20 PM",
      hours: "8h 50m",
      status: "present",
      firstVisit: "09:05:08 AM"
    },
    {
      date: "25/11/2025",
      checkIn: "09:00 AM",
      checkOut: "06:15 PM",
      hours: "8h 45m",
      status: "present",
      firstVisit: "09:00:32 AM"
    }
  ];

  const sessionActivity = [
    { time: "09:15 AM", activity: "Logged in to website", type: "login" },
    { time: "09:30 AM", activity: "Started working on Task #1234", type: "task" },
    { time: "11:00 AM", activity: "Took break (15 minutes)", type: "break" },
    { time: "01:00 PM", activity: "Lunch break (30 minutes)", type: "break" },
    { time: "03:30 PM", activity: "Joined meeting", type: "meeting" },
    { time: "05:45 PM", activity: "Completed Task #1234", type: "task" }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login':
        return 'LogIn';
      case 'task':
        return 'CheckSquare';
      case 'break':
        return 'Coffee';
      case 'meeting':
        return 'Users';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <Image
              src={employee?.avatar}
              alt={employee?.avatarAlt}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground">{employee?.name}</h3>
              <p className="text-sm text-muted-foreground">{employee?.department}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            className="lg:hidden"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Today's Check-In</p>
            <p className="text-lg font-semibold text-foreground">{employee?.checkIn}</p>
          </div>
          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Active Hours</p>
            <p className="text-lg font-semibold text-foreground">{employee?.activeHours}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Activity" size={18} />
            Today's Activity
          </h4>
          <div className="space-y-3">
            {sessionActivity?.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Icon name={getActivityIcon(activity?.type)} size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity?.activity}</p>
                  <p className="text-xs text-muted-foreground">{activity?.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Calendar" size={18} />
            Attendance History
          </h4>
          <div className="space-y-2">
            {attendanceHistory?.map((record, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{record?.date}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record?.status === 'present' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {record?.status === 'present' ? 'Present' : 'Late'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Check-In</p>
                    <p className="text-foreground font-medium">{record?.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Check-Out</p>
                    <p className="text-foreground font-medium">{record?.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Hours</p>
                    <p className="text-foreground font-medium">{record?.hours}</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    First Visit: {record?.firstVisit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left" fullWidth>
            Download Report
          </Button>
          <Button variant="default" size="sm" iconName="Edit" iconPosition="left" fullWidth>
            Edit Attendance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPanel;