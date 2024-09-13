import { DataTableFilterMeta } from "primereact/datatable";

export interface LazyTableState {
  first: number;
  rows: number;
  page?: number;
  filters: DataTableFilterMeta;
}
