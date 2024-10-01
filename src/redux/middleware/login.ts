import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";
import { initialized, storeAuthInfo } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const login = () => async (dispatch: AppDispatch) => {
  try {
    const response = await ApiManager.login();
    dispatch(storeAuthInfo(response.data));
    localStorage.setItem("accessToken", response.data.accessToken);
  } catch (error) {
    handleError(dispatch, error);
  } finally {
    dispatch(initialized());
  }
};
