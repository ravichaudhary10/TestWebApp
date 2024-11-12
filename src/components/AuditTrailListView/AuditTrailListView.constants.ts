// Field names
export enum AuditTrailDataField {
  ID = "id",
  ACTION = "action",
  PERFORMED_BY = "performedBy",
  ACTION_DATE = "actionDate",
  DESCRIPTION = "description",
}

/**
 * Constants specific to Audit trail list view
 */
export const ACTION = "Action";
export const PERFORMED_BY = "Performed by";
export const ACTION_DATE = "Action date";
export const DESCRIPTION = "Description";
export const FILTER_BY_LABEL = "Filter by";
export const EMPTY_MESSAGE = "No records found.";

export const INITIAL_FILTERS = {
  [AuditTrailDataField.ACTION]: null,
  [AuditTrailDataField.ACTION_DATE]: null,
  [AuditTrailDataField.PERFORMED_BY]: null,
};

export const ACTIONS = [
  {
    label: "Created",
    value: "created",
  },
  {
    label: "Added",
    value: "added",
  },
  {
    label: "Removed",
    value: "removed",
  },
  {
    label: "Renamed",
    value: "renamed",
  },
  {
    label: "Updated",
    value: "updated",
  },
];
