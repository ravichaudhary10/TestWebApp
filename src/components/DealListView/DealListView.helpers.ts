import { DataTableFilterMetaData } from "primereact/datatable";
import { LazyTableState } from "../../types/commonTypes";

/**
 * This method forms the payload required by getDeals API from the provided params
 * @param userId
 * @param lazyState
 * @returns {Object} Payload required by getDeals API
 */
export const createPayload = (userId: string, lazyState: LazyTableState) => {
  const payload: Record<string, any> = {
    userId,
    page: lazyState.page,
    limit: lazyState.rows,
  };

  if (lazyState.filters) {
    const filters: any = {};
    for (const key of Object.keys(lazyState.filters)) {
      let item = (lazyState.filters[key] as DataTableFilterMetaData).value;

      if (Array.isArray(item)) {
        item = item.map((o) => o?.id);
      }

      filters[key] = item;
    }
    payload["filters"] = filters;
  }

  return payload;
};
