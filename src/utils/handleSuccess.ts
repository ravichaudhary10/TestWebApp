import { AppDispatch } from "../redux/store";
import { showToast } from "../redux/slices/rootSlice";

export const handleSuccess = (dispatch: AppDispatch, message: string) => {
  // Show success toast
  dispatch(
    showToast({
      severity: "success",
      message,
    })
  );
};
