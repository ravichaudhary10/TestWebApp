import { AppDispatch } from "../redux/store";
import { showToast } from "../redux/slices/rootSlice";
import { ERROR_MESSAGES } from "../constants/global.constants";

export const handleError = (dispatch: AppDispatch, error: any) => {
  // Show error toast
  dispatch(
    showToast({
      severity: "error",
      message:
        error?.response?.data?.message || ERROR_MESSAGES.GENERIC_API_ERROR,
    })
  );
};
