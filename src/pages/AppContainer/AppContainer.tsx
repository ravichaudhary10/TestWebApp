import React from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchLineFunctions } from "../../redux/middleware/fetchLineFunctions";
import { fetchTherapeuticAreas } from "../../redux/middleware/fetchTherapeuticAreas";
import { fetchStages } from "../../redux/middleware/fetchStages";

const AppContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  // Fetch line functions
  dispatch(fetchLineFunctions());

  // Fetch stages
  dispatch(fetchStages());

  // Fetch therapeutic areas
  user?.id && dispatch(fetchTherapeuticAreas(user.id));

  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
};

export default AppContainer;
