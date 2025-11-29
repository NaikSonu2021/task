import React, { useState } from 'react';
import { SidebarProvider } from '../../components/ui/Sidebar';
import Sidebar from '../../components/ui/Sidebar';
import MobileMenuButton from '../../components/ui/MobileMenuButton';
import RolePermissionGuard from '../../components/ui/RolePermissionGuard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import SalaryCard from './components/SalaryCard';
import PaymentProofUpload from './components/PaymentProofUpload';
import SalaryDetailsModal from './components/SalaryDetailsModal';
import BulkProcessingPanel from './components/BulkProcessingPanel';
import FinancialReportCard from './components/FinancialReportCard';
import PaymentTrackingTable from './components/PaymentTrackingTable';

const FinanceModuleAndPayrollManagement = () => {
  const userRole = 'finance';
  const [activeTab, setActiveTab] = useState('salary');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBulkPanel, setShowBulkPanel] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    {
      id: 1,
      name: "Rajesh Kumar Sharma",
      employeeId: "EMP001",
      department: "Development",
      designation: "Senior Developer",
      baseSalary: 75000,
      hra: 22500,
      transportAllowance: 5000,
      specialAllowance: 10000,
      overtime: 8500,
      pfDeduction: 9000,
      tds: 7500,
      otherDeductions: 2000,
      deductions: 18500,
      netPay: 102500,
      workingDays: 26,
      overtimeHours: 34,
      leaves: 2,
      paymentStatus: "paid",
      paymentDate: "25/11/2025",
      paymentProof: true
    },
    {
      id: 2,
      name: "Priya Verma",
      employeeId: "EMP002",
      department: "Human Resources",
      designation: "HR Manager",
      baseSalary: 65000,
      hra: 19500,
      transportAllowance: 4000,
      specialAllowance: 8000,
      overtime: 0,
      pfDeduction: 7800,
      tds: 6500,
      otherDeductions: 1500,
      deductions: 15800,
      netPay: 80700,
      workingDays: 28,
      overtimeHours: 0,
      leaves: 0,
      paymentStatus: "pending",
      paymentDate: "30/11/2025",
      paymentProof: false
    },
    {
      id: 3,
      name: "Amit Patel",
      employeeId: "EMP003",
      department: "Finance",
      designation: "Accountant",
      baseSalary: 55000,
      hra: 16500,
      transportAllowance: 3500,
      specialAllowance: 6000,
      overtime: 4200,
      pfDeduction: 6600,
      tds: 5500,
      otherDeductions: 1200,
      deductions: 13300,
      netPay: 71900,
      workingDays: 27,
      overtimeHours: 21,
      leaves: 1,
      paymentStatus: "processing",
      paymentDate: "28/11/2025",
      paymentProof: false
    },
    {
      id: 4,
      name: "Sunita Deshmukh",
      employeeId: "EMP004",
      department: "Development",
      designation: "Junior Developer",
      baseSalary: 45000,
      hra: 13500,
      transportAllowance: 3000,
      specialAllowance: 5000,
      overtime: 6300,
      pfDeduction: 5400,
      tds: 4500,
      otherDeductions: 1000,
      deductions: 10900,
      netPay: 61900,
      workingDays: 26,
      overtimeHours: 28,
      leaves: 2,
      paymentStatus: "paid",
      paymentDate: "25/11/2025",
      paymentProof: true
    },
    {
      id: 5,
      name: "Vikas Mehta",
      employeeId: "EMP005",
      department: "Operations",
      designation: "Operations Manager",
      baseSalary: 70000,
      hra: 21000,
      transportAllowance: 4500,
      specialAllowance: 9000,
      overtime: 5600,
      pfDeduction: 8400,
      tds: 7000,
      otherDeductions: 1800,
      deductions: 17200,
      netPay: 92900,
      workingDays: 28,
      overtimeHours: 22,
      leaves: 0,
      paymentStatus: "pending",
      paymentDate: "30/11/2025",
      paymentProof: false
    },
    {
      id: 6,
      name: "Neha Gupta",
      employeeId: "EMP006",
      department: "Marketing",
      designation: "Marketing Executive",
      baseSalary: 50000,
      hra: 15000,
      transportAllowance: 3500,
      specialAllowance: 6500,
      overtime: 0,
      pfDeduction: 6000,
      tds: 5000,
      otherDeductions: 1100,
      deductions: 12100,
      netPay: 62900,
      workingDays: 28,
      overtimeHours: 0,
      leaves: 0,
      paymentStatus: "paid",
      paymentDate: "25/11/2025",
      paymentProof: true
    }
  ];

  const reports = [
    {
      id: 1,
      title: "Monthly Salary Report",
      type: "monthly",
      period: "November 2025",
      totalAmount: 472800,
      employeeCount: 6,
      status: "ready",
      generatedDate: "28/11/2025"
    },
    {
      id: 2,
      title: "Department-wise Analysis",
      type: "department",
      period: "Q4 2025",
      totalAmount: 1418400,
      employeeCount: 6,
      status: "ready",
      generatedDate: "27/11/2025"
    },
    {
      id: 3,
      title: "Annual Financial Summary",
      type: "annual",
      period: "2025",
      totalAmount: 5673600,
      employeeCount: 6,
      status: "generating",
      generatedDate: "29/11/2025"
    },
    {
      id: 4,
      title: "Tax Report",
      type: "tax",
      period: "November 2025",
      totalAmount: 36000,
      employeeCount: 6,
      status: "ready",
      generatedDate: "28/11/2025"
    }
  ];

  const payments = [
    {
      id: 1,
      employeeName: "Rajesh Kumar Sharma",
      employeeId: "EMP001",
      amount: 102500,
      paymentDate: "25/11/2025",
      paymentTime: "14:30",
      method: "bank",
      methodLabel: "Bank Transfer",
      status: "verified",
      hasProof: true
    },
    {
      id: 2,
      employeeName: "Sunita Deshmukh",
      employeeId: "EMP004",
      amount: 61900,
      paymentDate: "25/11/2025",
      paymentTime: "14:35",
      method: "bank",
      methodLabel: "Bank Transfer",
      status: "verified",
      hasProof: true
    },
    {
      id: 3,
      employeeName: "Neha Gupta",
      employeeId: "EMP006",
      amount: 62900,
      paymentDate: "25/11/2025",
      paymentTime: "14:40",
      method: "bank",
      methodLabel: "Bank Transfer",
      status: "verified",
      hasProof: true
    },
    {
      id: 4,
      employeeName: "Amit Patel",
      employeeId: "EMP003",
      amount: 71900,
      paymentDate: "28/11/2025",
      paymentTime: "10:15",
      method: "bank",
      methodLabel: "Bank Transfer",
      status: "processing",
      hasProof: false
    },
    {
      id: 5,
      employeeName: "Priya Verma",
      employeeId: "EMP002",
      amount: 80700,
      paymentDate: "30/11/2025",
      paymentTime: "09:00",
      method: "bank",
      methodLabel: "Bank Transfer",
      status: "pending",
      hasProof: false
    },
    {
      id: 6,
      employeeName: "Vikas Mehta",
      employeeId: "EMP005",
      amount: 92900,
      paymentDate: "30/11/2025",
      paymentTime: "09:00",
      method: "bank",
      methodLabel: "Bank Transfer",
      status: "pending",
      hasProof: false
    }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'development', label: 'Development' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' }
  ];

  const tabs = [
    { id: 'salary', label: 'Salary Management', icon: 'Wallet' },
    { id: 'payments', label: 'Payment Tracking', icon: 'CreditCard' },
    { id: 'reports', label: 'Financial Reports', icon: 'FileText' }
  ];

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const handleGenerateSlip = (employee) => {
    alert(`Generating salary slip for ${employee?.name}...`);
  };

  const handleUploadProof = (employee) => {
    setSelectedEmployee(employee);
    setShowUploadModal(true);
  };

  const handleProofUpload = (employeeId, file) => {
    alert(`${file?.name} uploaded successfully`);
  };

  const handleBulkProcess = (selectedIds) => {
    alert(`Processing salary for ${selectedIds?.length} employees...`);
  };

  const handleDownloadReport = (report) => {
    alert(`Downloading ${report?.title}...`);
  };

  const handleViewReport = (report) => {
    alert(`Opening ${report?.title}...`);
  };

  const handleViewProof = (payment) => {
    alert(`Viewing payment proof for ${payment?.employeeName}...`);
  };

  const handleVerifyPayment = (payment) => {
    alert(`Verifying payment for ${payment?.employeeName}...`);
  };

  const filteredEmployees = employees?.filter(emp => {
    const matchesSearch = emp?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         emp?.employeeId?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp?.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || emp?.paymentStatus === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalSalary = filteredEmployees?.reduce((sum, emp) => sum + emp?.netPay, 0);
  const paidCount = filteredEmployees?.filter(emp => emp?.paymentStatus === 'paid')?.length;
  const pendingCount = filteredEmployees?.filter(emp => emp?.paymentStatus === 'pending')?.length;

  return (
    <RolePermissionGuard allowedRoles={['admin', 'finance']} userRole={userRole}>
      <SidebarProvider>
        <div className="min-h-screen bg-background">
          <Sidebar userRole={userRole} />
          <MobileMenuButton />
          
          <div className="main-content">
            <div className="p-6 lg:p-8">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-foreground">Finance Module & Payroll Management</h1>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="default"
                      iconName="Download"
                      iconPosition="left"
                    >
                      Export
                    </Button>
                    {(userRole === 'admin' || userRole === 'finance') && (
                      <Button
                        variant="default"
                        size="default"
                        iconName="Zap"
                        iconPosition="left"
                        onClick={() => setShowBulkPanel(true)}
                      >
                        Bulk Processing
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground">Salary administration, payment processing, and financial reporting</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon name="Wallet" size={24} className="text-primary" />
                    <span className="text-xs text-muted-foreground">Total</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">₹{totalSalary?.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-muted-foreground">This Month's Salary</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon name="Users" size={24} className="text-accent" />
                    <span className="text-xs text-muted-foreground">Employees</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{filteredEmployees?.length}</p>
                  <p className="text-sm text-muted-foreground">Active Employees</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon name="CheckCircle2" size={24} className="text-success" />
                    <span className="text-xs text-muted-foreground">Payments</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{paidCount}</p>
                  <p className="text-sm text-muted-foreground">Paid</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon name="Clock" size={24} className="text-warning" />
                    <span className="text-xs text-muted-foreground">Pending</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending Payments</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg mb-6">
                <div className="border-b border-border">
                  <div className="flex items-center gap-1 p-2">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon name={tab?.icon} size={18} />
                        {tab?.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'salary' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Input
                          type="search"
                          placeholder="Search employees..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e?.target?.value)}
                        />
                        <Select
                          options={departmentOptions}
                          value={selectedDepartment}
                          onChange={setSelectedDepartment}
                          placeholder="Select department"
                        />
                        <Select
                          options={statusOptions}
                          value={selectedStatus}
                          onChange={setSelectedStatus}
                          placeholder="Select status"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEmployees?.map((employee) => (
                          <SalaryCard
                            key={employee?.id}
                            employee={employee}
                            onViewDetails={handleViewDetails}
                            onGenerateSlip={handleGenerateSlip}
                            onUploadProof={handleUploadProof}
                            userRole={userRole}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {activeTab === 'payments' && (
                    <PaymentTrackingTable
                      payments={payments}
                      onViewProof={handleViewProof}
                      onVerify={handleVerifyPayment}
                      userRole={userRole}
                    />
                  )}

                  {activeTab === 'reports' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {reports?.map((report) => (
                        <FinancialReportCard
                          key={report?.id}
                          report={report}
                          onDownload={handleDownloadReport}
                          onView={handleViewReport}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {showUploadModal && selectedEmployee && (
            <PaymentProofUpload
              employee={selectedEmployee}
              onClose={() => {
                setShowUploadModal(false);
                setSelectedEmployee(null);
              }}
              onUpload={handleProofUpload}
            />
          )}

          {showDetailsModal && selectedEmployee && (
            <SalaryDetailsModal
              employee={selectedEmployee}
              onClose={() => {
                setShowDetailsModal(false);
                setSelectedEmployee(null);
              }}
              userRole={userRole}
            />
          )}

          {showBulkPanel && (
            <BulkProcessingPanel
              employees={filteredEmployees}
              onProcess={handleBulkProcess}
              onClose={() => setShowBulkPanel(false)}
            />
          )}
        </div>
      </SidebarProvider>
    </RolePermissionGuard>
  );
};

export default FinanceModuleAndPayrollManagement;