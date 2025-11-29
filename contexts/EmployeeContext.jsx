import React, { createContext, useContext, useState, useEffect } from 'react';
import { sendEmployeeCredentialsNotification } from '../utils/whatsappService';

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const defaultEmployees = [
    {
      id: 'EMP-2024-001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@babagroups.com',
      phone: '+91 98765 43210',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17de2c40c-1763294952850.png",
      avatarAlt: 'Professional headshot of Indian man with short black hair wearing blue formal shirt',
      role: 'Senior Developer',
      roleIcon: 'Code',
      department: 'Engineering',
      status: 'active',
      lastActivity: '5 minutes ago',
      whatsappConnected: true,
      joinDate: '15/01/2023',
      jobDescription: 'Responsible for frontend application development, code review, and mentoring junior developers. Expert in React and TypeScript.',
      permissions: {
        taskCreate: true,
        taskView: true,
        taskEdit: true,
        employeeView: true,
        employeeManage: false,
        financeView: false,
        reportsAccess: true,
        systemConfig: false
      },
      stats: {
        assigned: 24,
        completed: 18,
        pending: 6
      }
    },
    {
      id: 'EMP-2024-002',
      name: 'Priya Sharma',
      email: 'priya.sharma@babagroups.com',
      phone: '+91 98765 43211',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1947937c9-1763297984932.png",
      avatarAlt: 'Professional headshot of Indian woman with long black hair wearing red formal blazer',
      role: 'Project Manager',
      roleIcon: 'Briefcase',
      department: 'Engineering',
      status: 'active',
      lastActivity: '15 minutes ago',
      whatsappConnected: true,
      joinDate: '10/03/2022',
      jobDescription: 'Project planning, team coordination, and client communication. Experienced in Agile methodology.',
      permissions: {
        taskCreate: true,
        taskView: true,
        taskEdit: true,
        employeeView: true,
        employeeManage: true,
        financeView: false,
        reportsAccess: true,
        systemConfig: false
      },
      stats: {
        assigned: 32,
        completed: 28,
        pending: 4
      }
    },
    {
      id: 'EMP-2024-003',
      name: 'Amit Patel',
      email: 'amit.patel@babagroups.com',
      phone: '+91 98765 43212',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10eae7444-1763298565879.png",
      avatarAlt: 'Professional headshot of Indian man with glasses wearing grey formal suit',
      role: 'Finance Manager',
      roleIcon: 'DollarSign',
      department: 'Finance',
      status: 'active',
      lastActivity: '1 hour ago',
      whatsappConnected: true,
      joinDate: '05/06/2021',
      jobDescription: 'Financial planning, budget management, and payroll processing. Expert in tax compliance and auditing.',
      permissions: {
        taskCreate: false,
        taskView: true,
        taskEdit: false,
        employeeView: true,
        employeeManage: false,
        financeView: true,
        reportsAccess: true,
        systemConfig: false
      },
      stats: {
        assigned: 15,
        completed: 12,
        pending: 3
      }
    },
    {
      id: 'EMP-2024-004',
      name: 'Neha Gupta',
      email: 'neha.gupta@babagroups.com',
      phone: '+91 98765 43213',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9ddc757-1763297359216.png",
      avatarAlt: 'Professional headshot of Indian woman with short hair wearing green formal dress',
      role: 'HR Manager',
      roleIcon: 'Users',
      department: 'Human Resources',
      status: 'active',
      lastActivity: '30 minutes ago',
      whatsappConnected: true,
      joinDate: '20/08/2022',
      jobDescription: 'Recruitment, employee onboarding, and performance management. Company policy implementation.',
      permissions: {
        taskCreate: true,
        taskView: true,
        taskEdit: false,
        employeeView: true,
        employeeManage: true,
        financeView: false,
        reportsAccess: true,
        systemConfig: false
      },
      stats: {
        assigned: 20,
        completed: 16,
        pending: 4
      }
    },
    {
      id: 'EMP-2024-005',
      name: 'Vikas Singh',
      email: 'vikas.singh@babagroups.com',
      phone: '+91 98765 43214',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1221b5557-1763292864149.png",
      avatarAlt: 'Professional headshot of Indian man with beard wearing black formal shirt',
      role: 'Backend Developer',
      roleIcon: 'Server',
      department: 'Engineering',
      status: 'on-leave',
      lastActivity: '2 days ago',
      whatsappConnected: true,
      joinDate: '12/11/2023',
      jobDescription: 'API development, database design, and server maintenance. Expert in Node.js and MongoDB.',
      permissions: {
        taskCreate: false,
        taskView: true,
        taskEdit: false,
        employeeView: true,
        employeeManage: false,
        financeView: false,
        reportsAccess: false,
        systemConfig: false
      },
      stats: {
        assigned: 18,
        completed: 14,
        pending: 4
      }
    },
    {
      id: 'EMP-2024-006',
      name: 'Anjali Verma',
      email: 'anjali.verma@babagroups.com',
      phone: '+91 98765 43215',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1294c6a82-1763298165483.png",
      avatarAlt: 'Professional headshot of Indian woman with curly hair wearing yellow formal top',
      role: 'UI/UX Designer',
      roleIcon: 'Palette',
      department: 'Engineering',
      status: 'active',
      lastActivity: '10 minutes ago',
      whatsappConnected: false,
      joinDate: '08/04/2023',
      jobDescription: 'User interface design, prototyping, and user research. Expert in Figma and Adobe XD.',
      permissions: {
        taskCreate: false,
        taskView: true,
        taskEdit: false,
        employeeView: true,
        employeeManage: false,
        financeView: false,
        reportsAccess: false,
        systemConfig: false
      },
      stats: {
        assigned: 22,
        completed: 19,
        pending: 3
      }
    },
    {
      id: 'EMP-2024-007',
      name: 'Sanjay Mehta',
      email: 'sanjay.mehta@babagroups.com',
      phone: '+91 98765 43216',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_196dc26da-1763292106962.png",
      avatarAlt: 'Professional headshot of Indian man with grey hair wearing white formal shirt',
      role: 'Sales Manager',
      roleIcon: 'TrendingUp',
      department: 'Sales',
      status: 'active',
      lastActivity: '2 hours ago',
      whatsappConnected: true,
      joinDate: '15/02/2020',
      jobDescription: 'Sales strategy, client relationship management, and team leadership. 10+ years experience in B2B sales.',
      permissions: {
        taskCreate: true,
        taskView: true,
        taskEdit: true,
        employeeView: true,
        employeeManage: true,
        financeView: false,
        reportsAccess: true,
        systemConfig: false
      },
      stats: {
        assigned: 28,
        completed: 24,
        pending: 4
      }
    },
    {
      id: 'EMP-2024-008',
      name: 'Pooja Desai',
      email: 'pooja.desai@babagroups.com',
      phone: '+91 98765 43217',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fb8935c7-1763295823143.png",
      avatarAlt: 'Professional headshot of Indian woman with straight hair wearing pink formal blazer',
      role: 'Marketing Specialist',
      roleIcon: 'Megaphone',
      department: 'Marketing',
      status: 'active',
      lastActivity: '45 minutes ago',
      whatsappConnected: true,
      joinDate: '22/09/2022',
      jobDescription: 'Digital marketing, social media management, and content creation. Expert in SEO and SEM.',
      permissions: {
        taskCreate: false,
        taskView: true,
        taskEdit: false,
        employeeView: true,
        employeeManage: false,
        financeView: false,
        reportsAccess: true,
        systemConfig: false
      },
      stats: {
        assigned: 25,
        completed: 21,
        pending: 4
      }
    },
    {
      id: 'EMP-2024-009',
      name: 'Rohit Khanna',
      email: 'rohit.khanna@babagroups.com',
      phone: '+91 98765 43218',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f25c7d06-1763296539848.png",
      avatarAlt: 'Professional headshot of Indian man with short hair wearing brown formal jacket',
      role: 'Operations Manager',
      roleIcon: 'Settings',
      department: 'Operations',
      status: 'active',
      lastActivity: '20 minutes ago',
      whatsappConnected: true,
      joinDate: '10/07/2021',
      jobDescription: 'Operational efficiency, process optimization, and vendor management. Experienced in supply chain.',
      permissions: {
        taskCreate: true,
        taskView: true,
        taskEdit: true,
        employeeView: true,
        employeeManage: false,
        financeView: false,
        reportsAccess: true,
        systemConfig: false
      },
      stats: {
        assigned: 30,
        completed: 26,
        pending: 4
      }
    },
    {
      id: 'EMP-2024-010',
      name: 'Deepika Rao',
      email: 'deepika.rao@babagroups.com',
      phone: '+91 98765 43219',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12c4ad9ff-1763298094776.png",
      avatarAlt: 'Professional headshot of Indian woman with long hair wearing blue formal dress',
      role: 'Junior Developer',
      roleIcon: 'Code',
      department: 'Engineering',
      status: 'active',
      lastActivity: '5 minutes ago',
      whatsappConnected: true,
      joinDate: '01/12/2024',
      jobDescription: 'Frontend development, bug fixing, and feature implementation. Learning React and JavaScript.',
      permissions: {
        taskCreate: false,
        taskView: true,
        taskEdit: false,
        employeeView: true,
        employeeManage: false,
        financeView: false,
        reportsAccess: false,
        systemConfig: false
      },
      stats: {
        assigned: 12,
        completed: 8,
        pending: 4
      }
    }
  ];

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('babagroups_employees');
    return savedEmployees ? JSON.parse(savedEmployees) : defaultEmployees;
  });

  useEffect(() => {
    localStorage.setItem('babagroups_employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = async (employee) => {
    const newEmployee = {
      ...employee,
      id: `EMP-2024-${String(employees?.length + 1)?.padStart(3, '0')}`,
      status: 'active',
      lastActivity: 'Just now',
      stats: {
        assigned: 0,
        completed: 0,
        pending: 0
      },
      permissions: {
        taskCreate: false,
        taskView: true,
        taskEdit: false,
        employeeView: true,
        employeeManage: false,
        financeView: false,
        reportsAccess: false,
        systemConfig: false
      }
    };
    
    setEmployees((prev) => [...prev, newEmployee]);

    // Generate temporary password
    const temporaryPassword = `Baba${Math.random()?.toString(36)?.slice(-8)}!`;

    // Send credentials via WhatsApp if employee has WhatsApp connected
    try {
      if (newEmployee?.whatsappConnected && newEmployee?.phone) {
        const result = await sendEmployeeCredentialsNotification(
          newEmployee, 
          temporaryPassword
        );
        
        if (result?.success) {
          console.log(`Credentials sent to ${newEmployee?.name} via WhatsApp`);
        } else {
          console.log(`Credentials not sent: ${result?.reason || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Failed to send employee credentials:', error);
    }

    return { ...newEmployee, temporaryPassword };
  };

  const updateEmployee = (employeeId, updates) => {
    setEmployees((prev) =>
      prev?.map((emp) => (emp?.id === employeeId ? { ...emp, ...updates } : emp))
    );
  };

  const deleteEmployee = (employeeId) => {
    setEmployees((prev) => prev?.filter((emp) => emp?.id !== employeeId));
  };

  const getActiveEmployees = () => {
    return employees?.filter((emp) => emp?.status === 'active');
  };

  const getEmployeeById = (employeeId) => {
    return employees?.find((emp) => emp?.id === employeeId);
  };

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getActiveEmployees,
    getEmployeeById
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
};