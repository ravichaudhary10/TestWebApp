import { getFormattedDateString } from "../../utils/getFormattedDateString";

export const getFilterPayload = (filters: Record<string, any>) => {
  const filterPayload: Record<string, any> = {};

  for (const key of Object.keys(filters)) {
    let item = filters[key];
    if (item instanceof Date) {
      // Convert the date to yyyy-mm-dd format
      item = getFormattedDateString(item);
    }

    filterPayload[key] = item;
  }

  return filterPayload;
};
