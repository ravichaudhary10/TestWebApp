import ApiManager from "../../ApiManager/ApiManager";
import { SUCCESS_MESSAGES } from "../../constants/global.constants";
import { handleError } from "../../utils/handleError";
import { handleSuccess } from "../../utils/handleSuccess";
import { startLoading, stopLoading, hasError } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const createDeal =
  (dealId: number | null, data: any) => async (dispatch: AppDispatch) => {
    // Show loading spinner
    dispatch(startLoading());

    // Reset the error
    dispatch(hasError(null));

    try {
      if (dealId) {
        await ApiManager.updateDeal(dealId, data);

        // Show success toast
        handleSuccess(dispatch, SUCCESS_MESSAGES.DEAL_UPDATION_SUCCESS);
      } else {
        await ApiManager.createDeal(data);

        // Show success toast
        handleSuccess(dispatch, SUCCESS_MESSAGES.DEAL_CREATION_SUCCESS);
      }

      // TODO: Temporary solution. Will figure out some other way to navigate the user back to previous page
      // eslint-disable-next-line no-restricted-globals
      history.back();
    } catch (error: any) {
      // Show error toast
      handleError(dispatch, error);
    } finally {
      dispatch(stopLoading());
    }
  };
