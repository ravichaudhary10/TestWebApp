import { DataTableFilterMeta } from "primereact/datatable";

export interface LazyTableState {
  first: number;
  rows: number;
  page: number;
  filters: DataTableFilterMeta;
}

export interface Item {
  id: number;
  name: string;
}

export enum Role {
  ADMIN = "admin",
  DEAL_LEAD = "deal lead",
}

export interface User {
  id: number;
  name: string;
  role: Role;
}

export interface Person {
  id?: string;
  email?: string;
  novartisId?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
}
