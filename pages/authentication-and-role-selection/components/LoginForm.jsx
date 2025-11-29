import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberDevice: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const mockCredentials = [
    {
      email: 'admin@babagroups.com',
      password: 'Admin@2025',
      role: 'admin',
      name: 'राजेश कुमार',
      department: 'प्रशासन',
      isFirstLogin: false
    },
    {
      email: 'manager@babagroups.com',
      password: 'Manager@2025',
      role: 'manager',
      name: 'प्रिया शर्मा',
      department: 'परियोजना प्रबंधन',
      isFirstLogin: false
    },
    {
      email: 'finance@babagroups.com',
      password: 'Finance@2025',
      role: 'finance',
      name: 'अमित वर्मा',
      department: 'वित्त',
      isFirstLogin: false
    },
    {
      email: 'hr@babagroups.com',
      password: 'HR@2025',
      role: 'hr',
      name: 'नेहा गुप्ता',
      department: 'मानव संसाधन',
      isFirstLogin: false
    },
    {
      email: 'employee@babagroups.com',
      password: 'Employee@2025',
      role: 'employee',
      name: 'विकास सिंह',
      department: 'विकास',
      isFirstLogin: true
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'ईमेल आवश्यक है';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'मान्य ईमेल दर्ज करें';
    }

    if (!formData?.password) {
      newErrors.password = 'पासवर्ड आवश्यक है';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए';
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

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rememberDevice: e?.target?.checked
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (isLocked) {
      setErrors({ general: 'बहुत अधिक असफल प्रयास। कृपया 5 मिनट बाद पुनः प्रयास करें।' });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const user = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (user) {
        setLoginAttempts(0);
        localStorage.setItem('userRole', user?.role);
        localStorage.setItem('userName', user?.name);
        localStorage.setItem('userDepartment', user?.department);
        localStorage.setItem('userEmail', user?.email);
        localStorage.setItem('isFirstLogin', user?.isFirstLogin);
        
        if (formData?.rememberDevice) {
          localStorage.setItem('rememberDevice', 'true');
        }

        onLoginSuccess(user);
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= 3) {
          setIsLocked(true);
          setErrors({ general: 'बहुत अधिक असफल प्रयास। खाता 5 मिनट के लिए लॉक कर दिया गया है।' });
          setTimeout(() => {
            setIsLocked(false);
            setLoginAttempts(0);
          }, 300000);
        } else {
          setErrors({ 
            general: `गलत ईमेल या पासवर्ड। शेष प्रयास: ${3 - newAttempts}` 
          });
        }
      }

      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error rounded-lg flex items-start gap-3">
          <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{errors?.general}</p>
        </div>
      )}
      <Input
        label="ईमेल पता"
        type="email"
        name="email"
        placeholder="आपका ईमेल दर्ज करें"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        disabled={isLocked}
      />
      <Input
        label="पासवर्ड"
        type="password"
        name="password"
        placeholder="आपका पासवर्ड दर्ज करें"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
        disabled={isLocked}
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="डिवाइस याद रखें"
          checked={formData?.rememberDevice}
          onChange={handleCheckboxChange}
          disabled={isLocked}
        />
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-primary hover:underline"
          disabled={isLocked}
        >
          पासवर्ड भूल गए?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLocked}
        iconName="LogIn"
        iconPosition="right"
      >
        लॉगिन करें
      </Button>
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          सुरक्षित लॉगिन • सत्र समय समाप्ति: 30 मिनट
        </p>
      </div>
    </form>
  );
};

export default LoginForm;