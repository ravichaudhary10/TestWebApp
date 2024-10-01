import ApiManager from "../../ApiManager/ApiManager";
import { createListOptionsFromItemArray } from "../../utils/createListOptionsFromItemArray";
import { handleError } from "../../utils/handleError";
import { storeStages } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const fetchStages = () => async (dispatch: AppDispatch) => {
  try {
    // Make API request to fetch stages
    const response = await ApiManager.fetchStages();

    // Convert data to required format
    const stages = createListOptionsFromItemArray(response.data?.data);

    // Save stages in redux store
    dispatch(storeStages(stages));
  } catch (error) {
    // Show error toast
    handleError(dispatch, error);
  }
};
