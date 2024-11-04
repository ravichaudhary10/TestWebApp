/**
 * Returns the set of items in setA which are not present in setB
 * @param setA {Set<any>}
 * @param setB {Set<any>}
 * @returns {Set<any>}
 */
export const differenceBetweenSets = (
  setA: Set<any>,
  setB: Set<any>
): Set<any> => {
  const result = new Set();
  for (const item of Array.from(setA)) {
    if (!setB.has(item)) {
      result.add(item);
    }
  }
  return result;
};
