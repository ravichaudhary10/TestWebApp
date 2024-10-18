export const isValidId = (id: string) => {
  return id != null && !isNaN(parseInt(id));
};
