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
