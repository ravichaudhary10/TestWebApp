import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";
import { startLoading, stopLoading, storeDeals } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const fetchDeals =
  (userId: number, filters: Record<string, any>, page: number, limit: number) =>
  async (dispatch: AppDispatch) => {
    // Show loading spinner
    dispatch(startLoading());

    try {
      const response = await ApiManager.fetchDeals(
        userId,
        filters,
        page,
        limit
      );
      dispatch(storeDeals(response.data));
    } catch (error: any) {
      // Show error toast
      handleError(dispatch, error);
    } finally {
      dispatch(stopLoading());
    }
  };
