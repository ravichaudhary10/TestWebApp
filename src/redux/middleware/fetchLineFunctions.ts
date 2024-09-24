import ApiManager from "../../ApiManager/ApiManager";
import { createListOptionsFromItemArray } from "../../utils/createListOptionsFromItemArray";
import { storeLineFunctions, hasError } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const fetchLineFunctions = () => async (dispatch: AppDispatch) => {
  // Reset the error
  dispatch(hasError(null));
  try {
    // Make API request to fetch line funcitons
    const response = await ApiManager.fetchLineFunctions();

    // Convert data to required format
    const lineFuncitons = createListOptionsFromItemArray(response.data?.data);

    // Save line funcitons areas in redux store
    dispatch(storeLineFunctions(lineFuncitons));
  } catch (error) {
    dispatch(hasError(error));
  }
};
