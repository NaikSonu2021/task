import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DepartmentTree = ({ departments, selectedDepartment, onSelectDepartment }) => {
  const [expandedDepts, setExpandedDepts] = useState({});

  const toggleExpand = (deptId) => {
    setExpandedDepts(prev => ({
      ...prev,
      [deptId]: !prev?.[deptId]
    }));
  };

  const renderDepartment = (dept, level = 0) => {
    const hasChildren = dept?.children && dept?.children?.length > 0;
    const isExpanded = expandedDepts?.[dept?.id];
    const isSelected = selectedDepartment === dept?.id;

    return (
      <div key={dept?.id}>
        <button
          onClick={() => {
            if (hasChildren) toggleExpand(dept?.id);
            onSelectDepartment(dept?.id);
          }}
          className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
            isSelected 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-muted text-foreground'
          }`}
          style={{ paddingLeft: `${(level * 16) + 12}px` }}
        >
          {hasChildren && (
            <Icon 
              name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
              size={16} 
            />
          )}
          <Icon name={dept?.icon} size={18} />
          <span className="flex-1 text-left">{dept?.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            isSelected 
              ? 'bg-primary-foreground/20 text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {dept?.count}
          </span>
        </button>
        {hasChildren && isExpanded && (
          <div>
            {dept?.children?.map(child => renderDepartment(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="Building2" size={18} />
          Department Structure
        </h3>
      </div>
      <div className="py-2">
        {departments?.map(dept => renderDepartment(dept))}
      </div>
    </div>
  );
};

export default DepartmentTree;