import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoleConfirmationModal = ({ user, onClose }) => {
  const navigate = useNavigate();

  const roleConfig = {
    admin: {
      icon: 'Shield',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      title: 'व्यवस्थापक',
      permissions: [
        'सभी सिस्टम सुविधाओं तक पूर्ण पहुंच',
        'उपयोगकर्ता और भूमिका प्रबंधन',
        'सिस्टम कॉन्फ़िगरेशन नियंत्रण',
        'ऑडिट ट्रेल और रिपोर्ट देखें',
        'वित्तीय डेटा पहुंच'
      ],
      redirectPath: '/admin-dashboard-and-system-overview'
    },
    manager: {
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      title: 'प्रबंधक',
      permissions: [
        'टीम और कार्य प्रबंधन',
        'कर्मचारी असाइनमेंट',
        'उपस्थिति निगरानी',
        'टीम रिपोर्ट देखें',
        'कार्य निर्माण और असाइनमेंट'
      ],
      redirectPath: '/admin-dashboard-and-system-overview'
    },
    finance: {
      icon: 'DollarSign',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      title: 'वित्त',
      permissions: [
        'वेतन प्रबंधन',
        'भुगतान प्रसंस्करण',
        'वित्तीय रिपोर्ट',
        'वेतन पर्ची जनरेशन',
        'भुगतान प्रमाण अपलोड'
      ],
      redirectPath: '/finance-module-and-payroll-management'
    },
    hr: {
      icon: 'Briefcase',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      title: 'मानव संसाधन',
      permissions: [
        'कर्मचारी भर्ती',
        'उम्मीदवार प्रबंधन',
        'कर्मचारी ऑनबोर्डिंग',
        'HR रिपोर्ट देखें',
        'कर्मचारी डेटा प्रबंधन'
      ],
      redirectPath: '/hr-module-and-hiring-management'
    },
    employee: {
      icon: 'User',
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
      title: 'कर्मचारी',
      permissions: [
        'असाइन किए गए कार्य देखें',
        'कार्य पूर्णता ट्रैकिंग',
        'उपस्थिति चिह्नित करें',
        'वेतन पर्ची डाउनलोड करें',
        'सूचनाएं प्राप्त करें'
      ],
      redirectPath: '/admin-dashboard-and-system-overview'
    }
  };

  const config = roleConfig?.[user?.role] || roleConfig?.employee;

  const handleContinue = () => {
    if (user?.isFirstLogin) {
      onClose();
    } else {
      navigate(config?.redirectPath);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4 animate-fade-in">
      <div className="bg-card rounded-xl shadow-elevation-3 max-w-md w-full p-6 space-y-6 animate-slide-in">
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 ${config?.bgColor} rounded-full flex items-center justify-center mx-auto`}>
            <Icon name={config?.icon} size={32} className={config?.color} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              स्वागत है, {user?.name}!
            </h2>
            <p className="text-muted-foreground">
              {user?.department} विभाग
            </p>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${config?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={config?.icon} size={20} className={config?.color} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">आपकी भूमिका</p>
              <p className="font-semibold text-foreground">{config?.title}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Icon name="CheckCircle2" size={18} className="text-success" />
            अनुमतियाँ
          </h3>
          <ul className="space-y-2">
            {config?.permissions?.map((permission, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="text-success flex-shrink-0 mt-0.5" />
                <span>{permission}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={onClose}
            iconName="X"
            iconPosition="left"
            className="flex-1"
          >
            रद्द करें
          </Button>
          <Button
            variant="default"
            size="default"
            onClick={handleContinue}
            iconName="ArrowRight"
            iconPosition="right"
            className="flex-1"
          >
            जारी रखें
          </Button>
        </div>

        {user?.isFirstLogin && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-start gap-2 text-sm text-warning">
              <Icon name="AlertCircle" size={16} className="flex-shrink-0 mt-0.5" />
              <p>पहली लॉगिन: कृपया अपना पासवर्ड अपडेट करें</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleConfirmationModal;