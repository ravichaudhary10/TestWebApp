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
  ADMIN = "SystemAdmin",
  DEAL_LEAD = "DealLead",
  RESOURCE = "Resource",
}

export interface User {
  id: number;
  name: string;
  role: Role;
}

export interface Person {
  id?: number;
  role?: string;
  email?: string;
  novartis521ID?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  siteCode?: string;
  phone?: string;
  countryCode?: string;
  therapeuticAreas?: Item[];
}

// Field names
export enum ResourceListField {
  ID = "id",
  LINE_FUNCTION = "lineFunction",
  NAME = "name",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  TITLE = "title",
  EMAIL = "email",
  STAGE = "stage",
  VDR_ACCESS = "vdrAccessRequested",
  WEB_TRAINING = "webTrainingStatus",
  NOVARTIS_ID = "novartis521ID",
  CORE_TEAM_MEMBER = "isCoreTeamMember",
  KICK_OFF_ATTENDANCE = "oneToOneDiscussion",
  OPTIONAL = "optionalColumn",
  SITE = "siteCode",
}
