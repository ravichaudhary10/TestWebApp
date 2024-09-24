import React from "react";
import { ERROR_MESSAGES } from "../../constants/global.constants";
import { useLocation } from "react-router-dom";

interface ErrorPageProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  const { state } = useLocation();
  return (
    <h1 style={{ padding: "1rem" }}>
      {message || state.message || ERROR_MESSAGES.GENERIC}
    </h1>
  );
};

export default ErrorPage;
