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
  novartis521ID?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
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
