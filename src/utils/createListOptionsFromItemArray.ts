import { SelectItem } from "primereact/selectitem";
import { Item } from "../types/commonTypes";

export const createListOptionsFromItemArray = (
  arr: Item[] | null | undefined
): SelectItem[] | null | undefined =>
  arr?.map((item: Record<string, any>) => ({
    id: item.id,
    label: item.name,
    value: item.name,
  }));
