import ApiManager from "../../ApiManager/ApiManager";
import { createListOptionsFromItemArray } from "../../utils/createListOptionsFromItemArray";
import { handleError } from "../../utils/handleError";
import { storeLineFunctions } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const fetchLineFunctions = () => async (dispatch: AppDispatch) => {
  try {
    // Make API request to fetch line funcitons
    const response = await ApiManager.fetchLineFunctions();

    // Convert data to required format
    const lineFuncitons = createListOptionsFromItemArray(response.data?.data);

    // Save line funcitons areas in redux store
    dispatch(storeLineFunctions(lineFuncitons));
  } catch (error: any) {
    // Show error toast
    handleError(dispatch, error);
  }
};
