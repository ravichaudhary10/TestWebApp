import ApiManager from "../../ApiManager/ApiManager";
import {
  startLoading,
  stopLoading,
  storeDeals,
  hasError,
} from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const fetchDeals =
  (userId: number, filters: Record<string, any>, page: number, limit: number) =>
  async (dispatch: AppDispatch) => {
    // Show loading spinner
    dispatch(startLoading());

    // Reset the error
    dispatch(hasError(null));

    try {
      const response = await ApiManager.fetchDeals(
        userId,
        filters,
        page,
        limit
      );
      dispatch(storeDeals(response.data));
    } catch (error) {
      dispatch(hasError(error));
    } finally {
      dispatch(stopLoading());
    }
  };
