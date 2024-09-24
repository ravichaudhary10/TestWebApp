import ApiManager from "../../ApiManager/ApiManager";
import { createListOptionsFromItemArray } from "../../utils/createListOptionsFromItemArray";
import { hasError, storeStages } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const fetchStages = () => async (dispatch: AppDispatch) => {
  // Reset the error
  dispatch(hasError(null));
  try {
    // Make API request to fetch stages
    const response = await ApiManager.fetchStages();

    // Convert data to required format
    const stages = createListOptionsFromItemArray(response.data?.data);

    // Save stages in redux store
    dispatch(storeStages(stages));
  } catch (error) {
    dispatch(hasError(error));
  }
};
