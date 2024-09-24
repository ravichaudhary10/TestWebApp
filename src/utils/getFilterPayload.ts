import {
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";

/**
 * This method forms the payload required by getDeals API from the provided params
 * @param userId
 * @param lazyState
 * @returns {Object} Payload required by getDeals API
 */
export const getFiltersPayload = (filters: DataTableFilterMeta) => {
  const filterPayload: Record<string, any> = {};

  for (const key of Object.keys(filters)) {
    let item = (filters[key] as DataTableFilterMetaData)?.value;

    if (Array.isArray(item)) {
      item = item.map((o) => o?.id);
    }

    filterPayload[key] = item;
  }

  return filterPayload;
};
