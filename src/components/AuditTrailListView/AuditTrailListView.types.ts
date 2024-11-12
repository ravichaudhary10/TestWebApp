import { Item } from "../../types/commonTypes";

export interface AuditTrailDataItem {
  id: number;
  action?: string | null;
  actionDate?: string | null;
  performedBy?: Item | null;
  description?: string | null;
}
