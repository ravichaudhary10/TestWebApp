import { DataTableFilterMeta } from "primereact/datatable";
import { ResourceListField } from "./ResourceListView.types";

// Field labels
export const LINE_FUNCTION = "Line Function";
export const NAME = "Full Name";
export const TITLE = "Title";
export const EMAIL = "Email";
export const STAGE = "Stage";
export const VDR_ACCESS = "VDR Access";
export const WEB_TRAINING = "Web-base Training";
export const NOVARTIS_ID = "Novartis 521 Id";
export const KICK_OFF_ATTENDANCE = "Kickoff Attendance";
export const OPTIONAL = "Optional";
export const CORE_TEAM_MEMBER = "Core Team Member";
export const SITE = "Site";

// Other labels
export const EMPTY_MESSAGE = "No resources found.";

// Dropdown options
export const webTrainingOptions = [
  { label: "Not Started", value: "not started" },
  { label: "In-progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export const booleanOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

// Intial values of inline filters
export const INITIAL_FILTERS: DataTableFilterMeta = {
  [ResourceListField.LINE_FUNCTION]: { value: null, matchMode: "contains" },
  [ResourceListField.NAME]: { value: null, matchMode: "contains" },
  [ResourceListField.TITLE]: { value: null, matchMode: "contains" },
  [ResourceListField.EMAIL]: { value: null, matchMode: "contains" },
  [ResourceListField.STAGE]: { value: null, matchMode: "contains" },
  [ResourceListField.VDR_ACCESS]: { value: null, matchMode: "contains" },
  [ResourceListField.WEB_TRAINING]: { value: null, matchMode: "contains" },
  [ResourceListField.NOVARTIS_ID]: { value: null, matchMode: "contains" },
  [ResourceListField.KICK_OFF_ATTENDANCE]: {
    value: null,
    matchMode: "contains",
  },
  [ResourceListField.OPTIONAL]: { value: null, matchMode: "contains" },
  [ResourceListField.CORE_TEAM_MEMBER]: { value: null, matchMode: "contains" },
  [ResourceListField.SITE]: { value: null, matchMode: "contains" },
};
