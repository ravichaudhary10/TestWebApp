import { DataTableFilterMeta } from "primereact/datatable";
import { ResourceListField } from "./ResourceListView.types";

// Field labels
export const LINE_FUNCTION = "Line Function";
export const NAME = "Full Name";
export const TITLE = "Title";
export const EMAIL = "Email";
export const STAGE = "Stage";
export const VDR_ACCESS = "VDR Access";
export const WEB_TRAINING = "Web-based Training";
export const NOVARTIS_ID = "Novartis 521 Id";
export const KICK_OFF_ATTENDANCE = "Kick-off attendance or 1:1 discussions";
export const OPTIONAL = "Optional";
export const CORE_TEAM_MEMBER = "Core Team Member";
export const SITE = "Site";

// Other labels
export const EMPTY_MESSAGE = "No resources found.";

// List of options for web-training-status dropdown field
export const webTrainingOptions = [
  { label: "Not Started", value: "Not Started" },
  { label: "In-Progress", value: "In-progress" },
  { label: "Completed", value: "completed" },
];

// This list of options is source of data for dropdown fields like VDR Access, Core Team Member
// dropdown fields etc. which have only 2 possible boolean values - Yes or No
export const booleanOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
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
