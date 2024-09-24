import { DataTableFilterMeta } from "primereact/datatable";
import { DealListField } from "./DealListView.types";

/**
 * Constants specific to Deal list view
 */
export const DEAL_NAME = "Project Code";
export const THERAPEUTIC_AREA = "Therapeutic Area";
export const DEAL_STAGE = "Stage";
export const MODIFIED_BY = "Modified By";
export const MODIFIED_AT = "Date Modified";
export const DEAL_LEAD = "Deal Lead";
export const EMPTY_MESSAGE = "No deals found.";
export const CLEAR_ALL_LABEL = "Clear All";

export const INITIAL_FILTERS: DataTableFilterMeta = {
  [DealListField.NAME]: { value: null, matchMode: "contains" },
  [DealListField.THERAPEUTIC_AREA]: { value: null, matchMode: "contains" },
  [DealListField.STAGE]: { value: null, matchMode: "contains" },
  [DealListField.MODIFIED_BY]: { value: null, matchMode: "contains" },
  [DealListField.MODIFIED_AT]: { value: null, matchMode: "contains" },
  [DealListField.LEADS]: { value: null, matchMode: "contains" },
};
