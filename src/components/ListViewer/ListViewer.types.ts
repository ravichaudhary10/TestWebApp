export interface ListViewerProps {
  config?: ListViewerConfig | null;
  data?: Array<Record<string, string>> | null;
}

interface ListViewerConfig {
  showFilters?: boolean;
  allowPagination?: boolean;
  allowRecordSelection?: boolean;
  allowSorting?: boolean;
  fieldConfigs: Array<ListViewerFieldConfig>;
}

interface ListViewerFieldConfig {
  name: String;
  label: String;
  type: String;
  values?: Array<String>;
  multiSelect?: boolean;
  width?: Number;
}
