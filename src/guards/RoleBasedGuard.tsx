import React from "react";

// hooks
import useAuth from "../hooks/useAuth";

import { Role } from "../types/commonTypes";

interface RoleBasedGuardProps {
  accessibleRoles: Role[]; // Example ["SystemAdmin", "DealLead", "Resource"]
  children: React.ReactNode;
}

const RoleBasedGuard: React.FC<RoleBasedGuardProps> = ({
  accessibleRoles,
  children,
}) => {
  const { user } = useAuth();

  if (!user?.role || !accessibleRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleBasedGuard;
