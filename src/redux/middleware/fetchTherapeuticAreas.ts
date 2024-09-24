import ApiManager from "../../ApiManager/ApiManager";
import { createListOptionsFromItemArray } from "../../utils/createListOptionsFromItemArray";
import { hasError, storeTherapeuticAreas } from "../slices/rootSlice";
import { AppDispatch } from "../store";

export const fetchTherapeuticAreas =
  (userId: number) => async (dispatch: AppDispatch) => {
    // Reset the error
    dispatch(hasError(null));
    try {
      // Make API request to fetch therapeutic areas
      const response = await ApiManager.fetchTherapeuticAreas(userId);

      // Convert data to required format
      const therapeuticAreas = createListOptionsFromItemArray(
        response.data?.data
      );

      // Save thetrapeutic areas in redux store
      dispatch(storeTherapeuticAreas(therapeuticAreas));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
