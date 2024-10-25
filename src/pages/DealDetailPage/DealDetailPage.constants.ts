import { ResourceListField } from "../../types/commonTypes";

export const DEAL_DETAIL_PAGE_TITLE = "Deal";
export const RESOURCE_LIST_TITLE = "Resource Details";
export const HISTORY_TITLE = "History";
export const ADD_NEW_RESOURCE_BUTTON_TITLE = "Add New Resource";
export const DOWNLOAD_TEMPLATE = "Download Template";
export const UPLOAD_EXCEL = "Upload Excel";
export const TEMPLATE_FILE_NAME = "Resource_Upload_Template_{Date}.xlsx";
export const VALID_FILE_EXTENSIONS = ["xlsx", "xls"];

export const TAB_MENU_ITEMS = [
  { label: RESOURCE_LIST_TITLE },
  { label: HISTORY_TITLE },
];

export const FILE_ERROR_MESSAGES: Record<string, string> = {
  noFile: "No file selected",
  invalidFile: "Please upload an Excel file (.xlsx or .xls)",
  parseError: "Failed to read the Excel File",
  invalidFileData: "Please upload a file with valid data",
  invalidColumnName: "Invalid column name: {0}",
  invalidColumnValue: "Invalid value : Row {0} Column: {1}",
};

export const MANDATORY_FIELDS = new Set([
  ResourceListField.EMAIL,
  ResourceListField.LINE_FUNCTION,
  ResourceListField.VDR_ACCESS,
  ResourceListField.WEB_TRAINING,
  ResourceListField.CORE_TEAM_MEMBER,
  "stages",
]);

export const COLUMN_NAME_TO_FIELD_MAP: Record<string, string> = {
  "E-mail": ResourceListField.EMAIL,
  "Line Function": ResourceListField.LINE_FUNCTION,
  Stage: ResourceListField.STAGE,
  "VDR access requested": ResourceListField.VDR_ACCESS,
  "Web based training": ResourceListField.WEB_TRAINING,
  "Kick-off attendance or 1:1 discussions":
    ResourceListField.KICK_OFF_ATTENDANCE,
  "Optional Column": ResourceListField.OPTIONAL,
  "Core team member": ResourceListField.CORE_TEAM_MEMBER,
};
