import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar, { SidebarProvider } from '../../components/ui/Sidebar';
import MobileMenuButton from '../../components/ui/MobileMenuButton';
import QuickActionDropdown from '../../components/ui/QuickActionDropdown';
import NotificationBadge from '../../components/ui/NotificationBadge';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import QuickStatsGrid from './components/QuickStatsGrid';
import EmployeeStatusWidget from './components/EmployeeStatusWidget';
import TaskMetricsWidget from './components/TaskMetricsWidget';
import RecentActivityList from './components/RecentActivityList';
import SystemHealthPanel from './components/SystemHealthPanel';
import ProductivityChart from './components/ProductivityChart';
import PendingApprovalsWidget from './components/PendingApprovalsWidget';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userRole] = useState('admin');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const adminProfile = {
    name: 'Amit Sharma',
    role: 'System Administrator',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1229ec330-1763295849716.png",
    avatarAlt: 'Professional headshot of Indian man with short black hair wearing navy blue formal suit'
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <MobileMenuButton />
        <Sidebar userRole={userRole} />
        
        <div className="main-content">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-card border-b border-border shadow-elevation-1">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(currentTime)} • {formatTime(currentTime)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <QuickActionDropdown userRole={userRole} />
                  
                  <button
                    onClick={() => navigate('/notification-center-and-communication-hub')}
                    className="relative p-2 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Notifications">

                    <Icon name="Bell" size={20} />
                    <NotificationBadge count={5} variant="error" className="absolute -top-1 -right-1" />
                  </button>

                  <div className="flex items-center gap-3 pl-4 border-l border-border">
                    <Image
                      src={adminProfile?.avatar}
                      alt={adminProfile?.avatarAlt}
                      className="w-10 h-10 rounded-full object-cover" />

                    <div className="hidden lg:block">
                      <p className="text-sm font-semibold text-foreground">{adminProfile?.name}</p>
                      <p className="text-xs text-muted-foreground">{adminProfile?.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            {/* Quick Stats */}
            <section className="mb-8">
              <QuickStatsGrid onCardClick={handleCardClick} />
            </section>

            {/* Four Quadrant Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Top Left - Employee Status */}
              <EmployeeStatusWidget />

              {/* Top Right - Task Metrics */}
              <TaskMetricsWidget />

              {/* Bottom Left - Recent Activities */}
              <RecentActivityList />

              {/* Bottom Right - System Health */}
              <SystemHealthPanel />
            </div>

            {/* Productivity Chart */}
            <section className="mb-8">
              <ProductivityChart />
            </section>

            {/* Pending Approvals */}
            <section className="mb-8">
              <PendingApprovalsWidget />
            </section>

            {/* Quick Links Grid */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                {
                  label: 'Employee Management',
                  icon: 'Users',
                  path: '/employee-management-and-user-administration',
                  color: 'bg-primary/10 text-primary'
                },
                {
                  label: 'Reports and Analytics',
                  icon: 'BarChart3',
                  path: '/reports-and-analytics-dashboard',
                  color: 'bg-success/10 text-success'
                },
                {
                  label: 'System Settings',
                  icon: 'Settings',
                  path: '/system-configuration-and-settings',
                  color: 'bg-warning/10 text-warning'
                },
                {
                  label: 'Audit Trail',
                  icon: 'FileText',
                  path: '/audit-trail-and-system-monitoring',
                  color: 'bg-accent/10 text-accent'
                }]?.
                map((link, index) =>
                <button
                  key={index}
                  onClick={() => navigate(link?.path)}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-elevation-2 transition-all duration-200">

                    <div className={`p-3 rounded-lg ${link?.color}`}>
                      <Icon name={link?.icon} size={24} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{link?.label}</span>
                  </button>
                )}
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="mt-12 py-6 px-6 border-t border-border bg-card">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Baba Groups. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button className="hover:text-foreground transition-colors">Help</button>
                <span>•</span>
                <button className="hover:text-foreground transition-colors">Privacy Policy</button>
                <span>•</span>
                <button className="hover:text-foreground transition-colors">Contact Us</button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>);

};

export default AdminDashboard;