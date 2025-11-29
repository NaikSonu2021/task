import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PasswordUpdateModal = ({ user, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  const passwordRequirements = [
    { label: 'कम से कम 8 अक्षर', regex: /.{8,}/, met: false },
    { label: 'एक अपरकेस अक्षर', regex: /[A-Z]/, met: false },
    { label: 'एक लोअरकेस अक्षर', regex: /[a-z]/, met: false },
    { label: 'एक संख्या', regex: /[0-9]/, met: false },
    { label: 'एक विशेष वर्ण (@$!%*?&)', regex: /[@$!%*?&]/, met: false }
  ];

  const checkPasswordRequirements = (password) => {
    return passwordRequirements?.map(req => ({
      ...req,
      met: req?.regex?.test(password)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.currentPassword) {
      newErrors.currentPassword = 'वर्तमान पासवर्ड आवश्यक है';
    }

    if (!formData?.newPassword) {
      newErrors.newPassword = 'नया पासवर्ड आवश्यक है';
    } else {
      const requirements = checkPasswordRequirements(formData?.newPassword);
      const allMet = requirements?.every(req => req?.met);
      if (!allMet) {
        newErrors.newPassword = 'पासवर्ड सभी आवश्यकताओं को पूरा नहीं करता';
      }
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'पासवर्ड पुष्टि आवश्यक है';
    } else if (formData?.newPassword !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'पासवर्ड मेल नहीं खाते';
    }

    if (formData?.currentPassword === formData?.newPassword) {
      newErrors.newPassword = 'नया पासवर्ड वर्तमान पासवर्ड से अलग होना चाहिए';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('isFirstLogin', 'false');
      localStorage.setItem('passwordUpdated', 'true');
      setIsLoading(false);
      
      const roleConfig = {
        admin: '/admin-dashboard-and-system-overview',
        manager: '/admin-dashboard-and-system-overview',
        finance: '/finance-module-and-payroll-management',
        hr: '/hr-module-and-hiring-management',
        employee: '/admin-dashboard-and-system-overview'
      };

      navigate(roleConfig?.[user?.role] || '/admin-dashboard-and-system-overview');
    }, 1500);
  };

  const requirements = checkPasswordRequirements(formData?.newPassword);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4 animate-fade-in">
      <div className="bg-card rounded-xl shadow-elevation-3 max-w-md w-full p-6 space-y-6 animate-slide-in">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Lock" size={32} className="text-warning" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            पासवर्ड अपडेट करें
          </h2>
          <p className="text-sm text-muted-foreground">
            सुरक्षा के लिए, कृपया अपना पासवर्ड बदलें
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="वर्तमान पासवर्ड"
            type="password"
            name="currentPassword"
            placeholder="वर्तमान पासवर्ड दर्ज करें"
            value={formData?.currentPassword}
            onChange={handleInputChange}
            error={errors?.currentPassword}
            required
          />

          <div className="relative">
            <Input
              label="नया पासवर्ड"
              type="password"
              name="newPassword"
              placeholder="नया पासवर्ड दर्ज करें"
              value={formData?.newPassword}
              onChange={handleInputChange}
              onFocus={() => setShowRequirements(true)}
              error={errors?.newPassword}
              required
            />
            {showRequirements && formData?.newPassword && (
              <div className="mt-2 p-3 bg-muted rounded-lg space-y-2">
                <p className="text-xs font-medium text-foreground">पासवर्ड आवश्यकताएं:</p>
                {requirements?.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <Icon 
                      name={req?.met ? "CheckCircle2" : "Circle"} 
                      size={14} 
                      className={req?.met ? "text-success" : "text-muted-foreground"} 
                    />
                    <span className={req?.met ? "text-success" : "text-muted-foreground"}>
                      {req?.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Input
            label="पासवर्ड की पुष्टि करें"
            type="password"
            name="confirmPassword"
            placeholder="नया पासवर्ड फिर से दर्ज करें"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={onClose}
              iconName="X"
              iconPosition="left"
              className="flex-1"
            >
              बाद में
            </Button>
            <Button
              type="submit"
              variant="default"
              size="default"
              loading={isLoading}
              iconName="Check"
              iconPosition="right"
              className="flex-1"
            >
              अपडेट करें
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-border">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Icon name="Info" size={14} className="flex-shrink-0 mt-0.5" />
            <p>मजबूत पासवर्ड आपके खाते को सुरक्षित रखता है</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdateModal;