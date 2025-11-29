import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import LoginForm from './components/LoginForm';
import RoleConfirmationModal from './components/RoleConfirmationModal';
import PasswordUpdateModal from './components/PasswordUpdateModal';
import WhatsAppIntegration from './components/WhatsAppIntegration';
import SecurityAuditPanel from './components/SecurityAuditPanel';
import SessionTimeoutWarning from './components/SessionTimeoutWarning';

const AuthenticationAndRoleSelection = () => {
  const navigate = useNavigate();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [showRoleConfirmation, setShowRoleConfirmation] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [currentYear] = useState(new Date()?.getFullYear());

  useEffect(() => {
    const existingUser = localStorage.getItem('userRole');
    if (existingUser) {
      navigate('/admin-dashboard-and-system-overview');
    }
  }, [navigate]);

  const handleLoginSuccess = (user) => {
    setAuthenticatedUser(user);
    setShowRoleConfirmation(true);
  };

  const handleRoleConfirmationClose = () => {
    setShowRoleConfirmation(false);
    if (authenticatedUser?.isFirstLogin) {
      setShowPasswordUpdate(true);
    } else {
      const roleConfig = {
        admin: '/admin-dashboard-and-system-overview',
        manager: '/admin-dashboard-and-system-overview',
        finance: '/finance-module-and-payroll-management',
        hr: '/hr-module-and-hiring-management',
        employee: '/admin-dashboard-and-system-overview'
      };
      navigate(roleConfig?.[authenticatedUser?.role] || '/admin-dashboard-and-system-overview');
    }
  };

  const handlePasswordUpdateClose = () => {
    setShowPasswordUpdate(false);
    const roleConfig = {
      admin: '/admin-dashboard-and-system-overview',
      manager: '/admin-dashboard-and-system-overview',
      finance: '/finance-module-and-payroll-management',
      hr: '/hr-module-and-hiring-management',
      employee: '/admin-dashboard-and-system-overview'
    };
    navigate(roleConfig?.[authenticatedUser?.role] || '/admin-dashboard-and-system-overview');
  };

  const handleSessionExtend = () => {
    setShowSessionWarning(false);
  };

  const handleSessionLogout = () => {
    localStorage.clear();
    navigate('/authentication-and-role-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <div className="text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-elevation-2">
                  <Icon name="Layers" size={32} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Baba Groups</h1>
                  <p className="text-sm text-muted-foreground">कार्य प्रबंधन प्रणाली</p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  अपने खाते में लॉगिन करें
                </h2>
                <p className="text-muted-foreground">
                  अपने कार्यों और टीम तक पहुंचने के लिए अपनी साख दर्ज करें
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="Info" size={18} />
                  <span className="font-medium text-sm">डेमो क्रेडेंशियल्स</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1 ml-6">
                  <p><strong>व्यवस्थापक:</strong> admin@babagroups.com / Admin@2025</p>
                  <p><strong>प्रबंधक:</strong> manager@babagroups.com / Manager@2025</p>
                  <p><strong>वित्त:</strong> finance@babagroups.com / Finance@2025</p>
                  <p><strong>HR:</strong> hr@babagroups.com / HR@2025</p>
                  <p><strong>कर्मचारी:</strong> employee@babagroups.com / Employee@2025</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-elevation-2">
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>

            <div className="hidden lg:block">
              <WhatsAppIntegration />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-elevation-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    प्रमुख विशेषताएं
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: 'CheckSquare',
                        title: 'कार्य प्रबंधन',
                        description: 'कार्य बनाएं, असाइन करें और ट्रैक करें'
                      },
                      {
                        icon: 'Users',
                        title: 'टीम सहयोग',
                        description: 'रीयल-टाइम संचार और अपडेट'
                      },
                      {
                        icon: 'Clock',
                        title: 'उपस्थिति ट्रैकिंग',
                        description: 'स्वचालित कार्य घंटे निगरानी'
                      },
                      {
                        icon: 'DollarSign',
                        title: 'वेतन प्रबंधन',
                        description: 'सुरक्षित वित्तीय प्रसंस्करण'
                      }
                    ]?.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={feature?.icon} size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{feature?.title}</p>
                          <p className="text-sm text-muted-foreground">{feature?.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span>एंटरप्राइज़-ग्रेड सुरक्षा</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="Lock" size={14} />
                      <span>एन्क्रिप्टेड डेटा</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Eye" size={14} />
                      <span>भूमिका-आधारित पहुंच</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="FileText" size={14} />
                      <span>ऑडिट ट्रेल</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={14} />
                      <span>सत्र प्रबंधन</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SecurityAuditPanel />

            <div className="lg:hidden">
              <WhatsAppIntegration />
            </div>
          </div>
        </div>
      </div>
      {showRoleConfirmation && authenticatedUser && (
        <RoleConfirmationModal
          user={authenticatedUser}
          onClose={handleRoleConfirmationClose}
        />
      )}
      {showPasswordUpdate && authenticatedUser && (
        <PasswordUpdateModal
          user={authenticatedUser}
          onClose={handlePasswordUpdateClose}
        />
      )}
      {showSessionWarning && (
        <SessionTimeoutWarning
          onExtend={handleSessionExtend}
          onLogout={handleSessionLogout}
        />
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Baba Groups. सर्वाधिकार सुरक्षित।</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              गोपनीयता नीति
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              सेवा की शर्तें
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              सहायता
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationAndRoleSelection;