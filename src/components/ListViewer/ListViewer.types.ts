export interface ListViewerProps {
  config?: ListViewerConfig | null;
  data?: Array<Record<string, string>> | null;
}

interface ListViewerConfig {
  showFilters?: Boolean;
  allowPagination?: Boolean;
  allowRecordSelection?: Boolean;
  allowSorting?: Boolean;
  fieldConfigs: Array<ListViewerFieldConfig>;
}

interface ListViewerFieldConfig {
  name: String;
  label: String;
  type: String;
  values?: Array<String>;
  multiSelect?: Boolean;
  width?: Number;
}
