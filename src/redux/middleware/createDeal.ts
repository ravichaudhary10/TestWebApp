import ApiManager from "../../ApiManager/ApiManager";
import {
  startLoading,
  stopLoading,
  showToast,
  hasError,
} from "../slices/rootSlice";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

export const createDeal = (data: any) => async (dispatch: AppDispatch) => {
  // Show loading spinner
  dispatch(startLoading());

  // Reset the error
  dispatch(hasError(null));

  try {
    await ApiManager.createDeal(data);

    // Show success toast
    dispatch(
      showToast({ severity: "success", message: "Deal created successfully" })
    );
  } catch (error) {
    dispatch(hasError(error));
  } finally {
    dispatch(stopLoading());
  }
};
