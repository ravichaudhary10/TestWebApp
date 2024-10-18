import { Item } from "../../types/commonTypes";

export interface Resource {
  id: number;
  lineFunction?: Item | null;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  title?: string | null;
  email?: string | null;
  stage?: Item | null;
  vdrAccessRequested?: boolean;
  webTrainingStatus?: string | null;
  novartis521ID?: string | null;
  isCoreTeamMember?: boolean;
  oneToOneDiscussion?: string | null;
  optionalColumn?: string | null;
  siteCode?: string | null;
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
