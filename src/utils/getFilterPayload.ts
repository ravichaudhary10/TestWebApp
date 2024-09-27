import {
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { getFormattedDateString } from "./getFormattedDateString";

/**
 * This method forms the payload required by getDeals API from the provided params
 * @param userId
 * @param lazyState
 * @returns {Object} Payload required by getDeals API
 */
export const getFilterPayload = (filters: DataTableFilterMeta) => {
  const filterPayload: Record<string, any> = {};

  for (const key of Object.keys(filters)) {
    let item = (filters[key] as DataTableFilterMetaData)?.value;

    if (item instanceof Date) {
      // Convert the date to yyyy-mm-dd format
      item = getFormattedDateString(item);
    }

    filterPayload[key] = item;
  }

  return filterPayload;
};
