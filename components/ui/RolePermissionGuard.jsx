import React from 'react';
import { Navigate } from 'react-router-dom';

const RolePermissionGuard = ({
  children,
  allowedRoles = [],
  userRole = 'employee',
  fallbackPath = '/admin-dashboard-and-system-overview',
}) => {
  const hasPermission = allowedRoles?.length === 0 || allowedRoles?.includes(userRole);

  if (!hasPermission) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default RolePermissionGuard;