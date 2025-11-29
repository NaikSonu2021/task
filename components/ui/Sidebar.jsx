import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        isMobileOpen,
        toggleCollapse,
        toggleMobile,
        closeMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

const Sidebar = ({ userRole = 'admin' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard-and-system-overview',
      icon: 'LayoutDashboard',
      roles: ['admin', 'manager', 'employee'],
    },
    {
      label: 'Tasks',
      icon: 'CheckSquare',
      roles: ['admin', 'manager', 'employee'],
      children: [
        {
          label: 'Task Hub',
          path: '/task-management-and-assignment-hub',
          icon: 'ListTodo',
        },
        {
          label: 'Task Details',
          path: '/task-detail-and-conversation-interface',
          icon: 'MessageSquare',
        },
      ],
    },
    {
      label: 'People',
      icon: 'Users',
      roles: ['admin', 'manager', 'hr'],
      children: [
        {
          label: 'Employees',
          path: '/employee-management-and-user-administration',
          icon: 'UserCog',
        },
        {
          label: 'Attendance',
          path: '/attendance-tracking-and-working-hours-monitor',
          icon: 'Clock',
        },
        {
          label: 'HR Module',
          path: '/hr-module-and-hiring-management',
          icon: 'Briefcase',
        },
      ],
    },
    {
      label: 'Finance',
      path: '/finance-module-and-payroll-management',
      icon: 'DollarSign',
      roles: ['admin', 'finance'],
    },
    {
      label: 'Communications',
      path: '/notification-center-and-communication-hub',
      icon: 'Bell',
      roles: ['admin', 'manager', 'employee'],
      badge: 5,
    },
    {
      label: 'Reports',
      path: '/reports-and-analytics-dashboard',
      icon: 'BarChart3',
      roles: ['admin', 'manager'],
    },
    {
      label: 'System',
      icon: 'Settings',
      roles: ['admin'],
      children: [
        {
          label: 'Configuration',
          path: '/system-configuration-and-settings',
          icon: 'Sliders',
        },
        {
          label: 'Audit Trail',
          path: '/audit-trail-and-system-monitoring',
          icon: 'FileText',
        },
      ],
    },
  ];

  const filteredNavigation = navigationItems?.filter((item) =>
    item?.roles ? item?.roles?.includes(userRole) : true
  );

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
      closeMobile();
    }
  };

  const isActive = (path) => location?.pathname === path;

  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (label) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev?.[label],
    }));
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Icon name="Layers" size={24} />
          </div>
          <span className="sidebar-brand-text">Baba Groups</span>
          <button
            onClick={toggleCollapse}
            className="ml-auto p-1.5 rounded-lg hover:bg-muted transition-colors hidden lg:block"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              size={20}
            />
          </button>
        </div>

        <nav className="sidebar-nav">
          {filteredNavigation?.map((item) => (
            <div key={item?.label}>
              {item?.children ? (
                <>
                  <button
                    onClick={() => toggleExpand(item?.label)}
                    className="sidebar-nav-item w-full"
                    aria-expanded={expandedItems?.[item?.label]}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="sidebar-nav-item-text">{item?.label}</span>
                    {!isCollapsed && (
                      <Icon
                        name={
                          expandedItems?.[item?.label]
                            ? 'ChevronDown' :'ChevronRight'
                        }
                        size={16}
                        className="ml-auto"
                      />
                    )}
                  </button>
                  {expandedItems?.[item?.label] && !isCollapsed && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item?.children?.map((child) => (
                        <button
                          key={child?.path}
                          onClick={() => handleNavigation(child?.path)}
                          className={`sidebar-nav-item w-full ${
                            isActive(child?.path) ? 'active' : ''
                          }`}
                        >
                          <Icon name={child?.icon} size={18} />
                          <span className="sidebar-nav-item-text">
                            {child?.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className={`sidebar-nav-item w-full ${
                    isActive(item?.path) ? 'active' : ''
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="sidebar-nav-item-text">{item?.label}</span>
                  {item?.badge && !isCollapsed && (
                    <span className="sidebar-nav-badge">{item?.badge}</span>
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;