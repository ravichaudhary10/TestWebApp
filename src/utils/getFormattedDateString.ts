/**
 * Returns the date string in "yyyy-mm-dd" format
 * @param d {Date}
 * @returns
 */
export const getFormattedDateString = (d: Date) => {
  if (!d) {
    return "";
  }

  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const date = d.getDate().toString().padStart(2, "0");
  const year = d.getFullYear();

  return [year, month, date].join("-");
};
