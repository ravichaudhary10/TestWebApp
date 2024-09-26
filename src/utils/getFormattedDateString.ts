/**
 * Returns the date string in "yyyy-mm-dd" format
 * @param d {Date}
 * @returns
 */
export const getFormattedDateString = (d: Date) => {
  if (!d) {
    return "";
  }

  const month = d.getMonth() + 1;
  const date = d.getDate();
  const year = d.getFullYear();

  return [year, month, date].join("-");
};
