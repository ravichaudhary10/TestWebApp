import { SelectItem } from "primereact/selectitem";

export const getLabelByValue = (list: SelectItem[], id: number): string => {
  if (!list || !id) {
    return "";
  }

  const result = list.find((item) => item.value === id);
  return result?.label || "";
};
