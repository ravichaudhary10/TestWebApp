import { Item } from "../../types/commonTypes";

export interface Deal {
  id: number;
  name?: string | null;
  therapeuticArea?: Item | null;
  stage?: Item | null;
  modifiedBy?: Item | null;
  modifiedAt?: number | null;
  leads?: Item[] | null;
}

// Field names
export enum DealListField {
  ID = "id",
  NAME = "name",
  THERAPEUTIC_AREA = "therapeuticArea",
  STAGE = "stage",
  MODIFIED_BY = "modifiedBy",
  MODIFIED_AT = "modifiedAt",
  LEADS = "leads",
  DEAL_LEAD = "dealLead",
}
