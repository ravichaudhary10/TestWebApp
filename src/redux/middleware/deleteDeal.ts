import ApiManager from "../../ApiManager/ApiManager";
import { SUCCESS_MESSAGES } from "../../constants/global.constants";
import { handleError } from "../../utils/handleError";
import { handleSuccess } from "../../utils/handleSuccess";
import { startLoading, stopLoading, hasError } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const deleteDeal =
  (dealId: number, userId: number) => async (dispatch: AppDispatch) => {
    // Show loading spinner
    dispatch(startLoading());

    // Reset the error
    dispatch(hasError(null));

    try {
      if (dealId) {
        await ApiManager.deleteDeal(dealId, userId);

        // Show success toast
        handleSuccess(dispatch, SUCCESS_MESSAGES.DEAL_DELETION_SUCCESS);
      }
    } catch (error: any) {
      // Show error toast
      handleError(dispatch, error);
    } finally {
      dispatch(stopLoading());
    }
  };
