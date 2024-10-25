import { SelectItem } from "primereact/selectitem";

/**
 * Generates a map having label to value mapping from an array of SelectItems
 * @param list - List of objects having value and label
 * @returns
 */
export const getLabelToValueMap = (
  list: SelectItem[] | null
): Map<string, string> | null => {
  if (!list) {
    return null;
  }

  let map = new Map();
  for (const item of list) {
    map.set(item.label, item.value);
  }
  return map;
};
