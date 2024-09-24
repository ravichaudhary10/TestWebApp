import ApiManager from "../../ApiManager/ApiManager";
import { initialized, hasError, storeAuthInfo } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const login = () => async (dispatch: AppDispatch) => {
  // Reset the error
  dispatch(hasError(null));
  try {
    const response = await ApiManager.login();
    dispatch(storeAuthInfo(response.data));
    localStorage.setItem("accessToken", response.data.accessToken);
  } catch (error) {
    dispatch(hasError(error));
  } finally {
    dispatch(initialized());
  }
};
