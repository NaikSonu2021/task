import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/ui/Sidebar';
import Sidebar from '../../components/ui/Sidebar';
import MobileMenuButton from '../../components/ui/MobileMenuButton';
import Button from '../../components/ui/Button';
import DepartmentTree from './components/DepartmentTree';
import FilterToolbar from './components/FilterToolbar';
import EmployeeDataGrid from './components/EmployeeDataGrid';
import EmployeeDetailsPanel from './components/EmployeeDetailsPanel';
import BulkActionsBar from './components/BulkActionsBar';
import CreateEmployeeModal from './components/CreateEmployeeModal';
import { useEmployees } from '../../contexts/EmployeeContext';

const EmployeeManagement = () => {
  const { employees, addEmployee, updateEmployee } = useEmployees();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    department: 'all',
    role: 'all',
    status: 'all'
  });

  const departments = [
    {
      id: 'all',
      name: 'All Departments',
      icon: 'Building2',
      count: 156,
      children: []
    },
    {
      id: 'engineering',
      name: 'Engineering',
      icon: 'Code',
      count: 45,
      children: [
        { id: 'frontend', name: 'Frontend', icon: 'Monitor', count: 18 },
        { id: 'backend', name: 'Backend', icon: 'Server', count: 15 },
        { id: 'mobile', name: 'Mobile', icon: 'Smartphone', count: 12 }
      ]
    },
    {
      id: 'sales',
      name: 'Sales',
      icon: 'TrendingUp',
      count: 32,
      children: [
        { id: 'inside-sales', name: 'Inside Sales', icon: 'Phone', count: 20 },
        { id: 'field-sales', name: 'Field Sales', icon: 'MapPin', count: 12 }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: 'Megaphone',
      count: 24,
      children: []
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: 'DollarSign',
      count: 18,
      children: []
    },
    {
      id: 'hr',
      name: 'Human Resources',
      icon: 'Users',
      count: 15,
      children: []
    },
    {
      id: 'operations',
      name: 'Operations',
      icon: 'Settings',
      count: 22,
      children: []
    }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'operations', label: 'Operations' }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'developer', label: 'Developer' },
    { value: 'manager', label: 'Manager' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'HR' },
    { value: 'employee', label: 'Employee' }
  ];

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      department: 'all',
      role: 'all',
      status: 'all'
    });
  };

  const handleSelectEmployee = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees((prev) => [...prev, employeeId]);
    } else {
      setSelectedEmployees((prev) => prev?.filter((id) => id !== employeeId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(employees?.map((emp) => emp?.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsPanel(true);
  };

  const handleEditEmployee = (employee) => {
    console.log('Edit employee:', employee);
  };

  const handleToggleStatus = (employee) => {
    console.log('Toggle status:', employee);
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, selectedEmployees);
  };

  const handleCreateEmployee = (formData) => {
    const newEmployee = addEmployee(formData);
    console.log('Employee created:', newEmployee);
    setShowCreateModal(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <MobileMenuButton />
        <Sidebar userRole="admin" />

        <div className="main-content">
          <div className="h-screen flex flex-col">
            <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Employee Management</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Total {employees?.length} employees • {employees?.filter((e) => e?.status === 'active')?.length} active
                </p>
              </div>
              <Button
                variant="default"
                size="default"
                iconName="UserPlus"
                iconPosition="left"
                onClick={() => setShowCreateModal(true)}>
                Add New Employee
              </Button>
            </div>

            <FilterToolbar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onClearFilters={handleClearFilters}
              departments={departmentOptions}
              roles={roleOptions} />


            <div className="flex-1 flex overflow-hidden">
              <div className="w-64 border-r border-border bg-card overflow-hidden">
                <DepartmentTree
                  departments={departments}
                  selectedDepartment={selectedDepartment}
                  onSelectDepartment={setSelectedDepartment} />

              </div>

              <div className="flex-1 overflow-hidden">
                <EmployeeDataGrid
                  employees={employees}
                  selectedEmployees={selectedEmployees}
                  onSelectEmployee={handleSelectEmployee}
                  onSelectAll={handleSelectAll}
                  onViewDetails={handleViewDetails}
                  onEditEmployee={handleEditEmployee}
                  onToggleStatus={handleToggleStatus} />

              </div>

              {showDetailsPanel &&
              <div className="w-96 border-l border-border overflow-hidden">
                  <EmployeeDetailsPanel
                  employee={selectedEmployee}
                  onClose={() => setShowDetailsPanel(false)}
                  onEdit={handleEditEmployee} />

                </div>
              }
            </div>
          </div>
        </div>

        <BulkActionsBar
          selectedCount={selectedEmployees?.length}
          onClearSelection={() => setSelectedEmployees([])}
          onBulkAction={handleBulkAction} />


        <CreateEmployeeModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateEmployee} />

      </div>
    </SidebarProvider>
  );
};

export default EmployeeManagement;