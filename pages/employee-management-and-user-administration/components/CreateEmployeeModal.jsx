import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateEmployeeModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    jobDescription: '',
    generatePassword: true
  });

  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'developer', label: 'Developer' },
    { value: 'manager', label: 'Manager' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'HR' },
    { value: 'employee', label: 'Employee' }
  ];

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'operations', label: 'Operations' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.name?.trim()) newErrors.name = 'Name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.role) newErrors.role = 'Select role';
    if (!formData?.department) newErrors.department = 'Select department';
    if (!formData?.jobDescription?.trim()) newErrors.jobDescription = 'Job description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        jobDescription: '',
        generatePassword: true
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] animate-fade-in">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slide-in">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Add New Employee</h3>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter employee name"
              value={formData?.name}
              onChange={(e) => handleChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="email@example.com"
                value={formData?.email}
                onChange={(e) => handleChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData?.phone}
                onChange={(e) => handleChange('phone', e?.target?.value)}
                error={errors?.phone}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Role"
                options={roleOptions}
                value={formData?.role}
                onChange={(value) => handleChange('role', value)}
                placeholder="Select role"
                error={errors?.role}
                required
              />

              <Select
                label="Department"
                options={departmentOptions}
                value={formData?.department}
                onChange={(value) => handleChange('department', value)}
                placeholder="Select department"
                error={errors?.department}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Description
              </label>
              <textarea
                value={formData?.jobDescription}
                onChange={(e) => handleChange('jobDescription', e?.target?.value)}
                placeholder="Describe employee responsibilities and duties"
                rows={4}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors?.jobDescription ? 'border-error' : 'border-input'
                } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring`}
              />
              {errors?.jobDescription && (
                <p className="text-xs text-error mt-1">{errors?.jobDescription}</p>
              )}
            </div>

            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Automatic Credential Generation</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    A secure password will be automatically generated and sent to the employee's email. The employee can change their password after first login.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-border flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="UserPlus"
            iconPosition="left"
            onClick={handleSubmit}
          >
            Add Employee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeModal;