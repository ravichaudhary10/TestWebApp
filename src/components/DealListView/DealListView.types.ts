export interface Item {
  id: string;
  name: string;
}

export interface Deal {
  id: string;
  name?: string | null;
  therapeuticArea?: Item | null;
  stage?: Item | null;
  modifiedBy?: Item | null;
  dateModified?: number | null;
  leads?: Item[] | null;
}

// Field names
export enum DealListField {
  ID = "id",
  NAME = "name",
  THERAPEUTIC_AREA = "therapeuticArea",
  STAGE = "stage",
  MODIFIED_BY = "modifiedBy",
  DATE_MODIFIED = "dateModified",
  LEADS = "leads",
}
