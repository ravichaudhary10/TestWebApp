import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { login } from "../../redux/middleware/login";
import { Path } from "../../routes";
import { ERROR_MESSAGES } from "../../constants/global.constants";

import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const isInitialized = useAppSelector((state) => state.isInitialized);
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isInitialized) {
      dispatch(login());
    }
  }, [isInitialized, dispatch]);

  if (isInitialized && isAuthenticated) {
    return <Navigate to={Path.ROOT} />;
  }

  if (!isInitialized) {
    return <></>;
  }

  return (
    <Navigate
      to={"/" + Path.ERROR}
      state={{ message: ERROR_MESSAGES.AUTHORIZATION }}
    />
  );
};

export default Login;
