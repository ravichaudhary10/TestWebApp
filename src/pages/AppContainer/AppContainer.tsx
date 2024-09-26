import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchLineFunctions } from "../../redux/middleware/fetchLineFunctions";
import { fetchTherapeuticAreas } from "../../redux/middleware/fetchTherapeuticAreas";
import { fetchStages } from "../../redux/middleware/fetchStages";
import { Toast } from "primereact/toast";

const AppContainer: React.FC = () => {
  const toast = useRef(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const toastInfo = useAppSelector((state) => state.toastInfo);

  useEffect(() => {
    // Fetch line functions
    dispatch(fetchLineFunctions());
  }, [dispatch]);

  useEffect(() => {
    // Fetch stages
    dispatch(fetchStages());
  }, [dispatch]);

  useEffect(() => {
    // Fetch therapeutic areas
    user?.id && dispatch(fetchTherapeuticAreas(user.id));
  }, [user, dispatch]);

  useEffect(() => {
    if (toastInfo) {
      // Show toast
      (toast.current as any).show({
        severity: toastInfo?.severity,
        detail: toastInfo?.message,
        life: 3000,
      });
    }
  }, [toastInfo]);

  return (
    <div className="app-container">
      <Toast ref={toast} />
      <Outlet />
    </div>
  );
};

export default AppContainer;
