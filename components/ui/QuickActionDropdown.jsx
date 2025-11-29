import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionDropdown = ({ userRole = 'admin', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Create Task',
      icon: 'Plus',
      roles: ['admin', 'manager'],
      onClick: () => {
        navigate('/task-management-and-assignment-hub');
        setIsOpen(false);
      },
    },
    {
      label: 'Add Employee',
      icon: 'UserPlus',
      roles: ['admin', 'hr'],
      onClick: () => {
        navigate('/employee-management-and-user-administration');
        setIsOpen(false);
      },
    },
    {
      label: 'View Reports',
      icon: 'FileText',
      roles: ['admin', 'manager'],
      onClick: () => {
        navigate('/reports-and-analytics-dashboard');
        setIsOpen(false);
      },
    },
    {
      label: 'System Settings',
      icon: 'Settings',
      roles: ['admin'],
      onClick: () => {
        navigate('/system-configuration-and-settings');
        setIsOpen(false);
      },
    },
  ];

  const filteredActions = actions?.filter((action) =>
    action?.roles?.includes(userRole)
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (filteredActions?.length === 0) return null;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="default"
        size="default"
        iconName="Zap"
        iconPosition="left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Quick Actions
      </Button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-3 z-[1100] animate-fade-in"
          role="menu"
        >
          <div className="py-1">
            {filteredActions?.map((action, index) => (
              <button
                key={index}
                onClick={action?.onClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                role="menuitem"
              >
                <Icon name={action?.icon} size={18} />
                <span>{action?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionDropdown;