import { ListViewerProps } from "../ListViewer";

export const dealListViewerProps: ListViewerProps = {
  config: {
    showFilters: true,
    allowPagination: true,
    allowRecordSelection: true,
    allowSorting: false,

    fieldConfigs: [
      {
        name: "dealName",
        label: "Deal Name",
        type: "text",
        width: 1,
      },
      {
        name: "therapeuticArea",
        label: "Therapeutic Area",
        type: "list",
        values: [],
        multiSelect: true,
        width: 1,
      },
      {
        name: "dealStage",
        label: "Deal Stage",
        type: "list",
        values: [],
        multiSelect: true,
        width: 1,
      },
      {
        name: "modifiedBy",
        label: "Modified By",
        type: "text",
        width: 1,
      },
      {
        name: "dateModified",
        label: "Date Modified",
        type: "date",
        width: 1,
      },
      {
        name: "dealLead",
        label: "Deal Lead",
        type: "text",
        width: 1,
      },
    ],
  },
  data: null,
};
