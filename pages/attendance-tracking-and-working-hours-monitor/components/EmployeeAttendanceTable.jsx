import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmployeeAttendanceTable = ({ onEmployeeSelect, selectedEmployee }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const employees = [
    {
      id: 1,
      name: "Rajesh Kumar",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b09cae8d-1763295945796.png",
      avatarAlt: "Professional headshot of Indian man with short black hair wearing blue shirt",
      department: "Development",
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
      activeHours: "8h 45m",
      breakTime: "45m",
      status: "present",
      productivity: 92,
      lastActivity: "2 minutes ago"
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1947937c9-1763297984932.png",
      avatarAlt: "Professional headshot of Indian woman with long black hair wearing formal attire",
      department: "Design",
      checkIn: "09:00 AM",
      checkOut: "06:15 PM",
      activeHours: "8h 30m",
      breakTime: "45m",
      status: "present",
      productivity: 95,
      lastActivity: "Active now"
    },
    {
      id: 3,
      name: "Amit Patel",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b5759b8b-1763292053281.png",
      avatarAlt: "Professional headshot of Indian man with glasses wearing white shirt",
      department: "Development",
      checkIn: "09:30 AM",
      checkOut: "-",
      activeHours: "7h 15m",
      breakTime: "30m",
      status: "late",
      productivity: 88,
      lastActivity: "5 minutes ago"
    },
    {
      id: 4,
      name: "Neha Gupta",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e8c39b9a-1763299889892.png",
      avatarAlt: "Professional headshot of Indian woman with short hair wearing blue blazer",
      department: "Marketing",
      checkIn: "-",
      checkOut: "-",
      activeHours: "0h 0m",
      breakTime: "-",
      status: "absent",
      productivity: 0,
      lastActivity: "Yesterday"
    },
    {
      id: 5,
      name: "Vikram Singh",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12717b500-1763291922394.png",
      avatarAlt: "Professional headshot of Indian man with beard wearing black shirt",
      department: "Finance",
      checkIn: "09:05 AM",
      checkOut: "06:20 PM",
      activeHours: "8h 35m",
      breakTime: "40m",
      status: "present",
      productivity: 94,
      lastActivity: "1 minute ago"
    },
    {
      id: 6,
      name: "Sneha Reddy",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10ca32616-1763295905430.png",
      avatarAlt: "Professional headshot of Indian woman with long hair wearing red top",
      department: "HR",
      checkIn: "09:10 AM",
      checkOut: "-",
      activeHours: "7h 25m",
      breakTime: "35m",
      status: "present",
      productivity: 90,
      lastActivity: "Active now"
    },
    {
      id: 7,
      name: "Arjun Mehta",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13293a68f-1763292967175.png",
      avatarAlt: "Professional headshot of Indian man with short hair wearing grey shirt",
      department: "Development",
      checkIn: "09:45 AM",
      checkOut: "-",
      activeHours: "6h 50m",
      breakTime: "25m",
      status: "late",
      productivity: 85,
      lastActivity: "10 minutes ago"
    },
    {
      id: 8,
      name: "Kavya Desai",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_142754305-1763293808603.png",
      avatarAlt: "Professional headshot of Indian woman with wavy hair wearing green dress",
      department: "Design",
      checkIn: "09:00 AM",
      checkOut: "06:10 PM",
      activeHours: "8h 25m",
      breakTime: "45m",
      status: "present",
      productivity: 96,
      lastActivity: "Active now"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { label: 'Present', color: 'bg-success/10 text-success border-success' },
      absent: { label: 'Absent', color: 'bg-error/10 text-error border-error' },
      late: { label: 'Late', color: 'bg-warning/10 text-warning border-warning' }
    };

    const config = statusConfig?.[status];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        {config?.label}
      </span>);

  };

  const filteredEmployees = employees?.filter((emp) => {
    const matchesSearch = emp?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    emp?.department?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp?.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">Employee Attendance</h2>
            <p className="text-sm text-muted-foreground">Today's attendance status and working hours</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e?.target?.value)}
              className="px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Departments</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Check-In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Check-Out
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Active Hours
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Productivity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredEmployees?.map((employee) =>
            <tr
              key={employee?.id}
              className={`hover:bg-muted/50 transition-colors ${
              selectedEmployee?.id === employee?.id ? 'bg-primary/5' : ''}`
              }>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                      src={employee?.avatar}
                      alt={employee?.avatarAlt}
                      className="w-10 h-10 rounded-full object-cover" />

                      {employee?.status === 'present' &&
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card" />
                    }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{employee?.name}</p>
                      <p className="text-xs text-muted-foreground">{employee?.lastActivity}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{employee?.department}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{employee?.checkIn}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-foreground">{employee?.checkOut}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{employee?.activeHours}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                      className={`h-full ${
                      employee?.productivity >= 90 ?
                      'bg-success' :
                      employee?.productivity >= 70 ?
                      'bg-warning' : 'bg-error'}`
                      }
                      style={{ width: `${employee?.productivity}%` }} />

                    </div>
                    <span className="text-sm text-foreground">{employee?.productivity}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(employee?.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => onEmployeeSelect(employee)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredEmployees?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No employees found</p>
        </div>
      )}
    </div>);

};

export default EmployeeAttendanceTable;