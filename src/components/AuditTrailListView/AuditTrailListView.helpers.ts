import { getFormattedDateString } from "../../utils/getFormattedDateString";

/**
 * Generates payload for filters for Audit trail list API call
 * @param filters {Record<string, any>} - Collection of key value pairs for filters
 * @returns {Record<string, any>} collection of key values pairs in a format desired by API call
 */
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
