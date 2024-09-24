import React from "react";
import { Navigate } from "react-router-dom";
import { Path } from "../routes";

// hooks
import useAuth from "../hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={Path.SSO_LOGIN} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
