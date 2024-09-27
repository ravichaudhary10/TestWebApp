import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";
import {
  startLoading,
  stopLoading,
  storeDealDetail,
} from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const fetchDealDetail =
  (dealId: number) => async (dispatch: AppDispatch) => {
    // Show loading spinner
    dispatch(startLoading());

    try {
      const response = await ApiManager.fetchDealDetail(dealId);
      dispatch(storeDealDetail(response.data));
    } catch (error: any) {
      // Show error toast
      handleError(dispatch, error);
    } finally {
      dispatch(stopLoading());
    }
  };
