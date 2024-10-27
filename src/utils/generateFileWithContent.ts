/**
 * Generates a text file with specified content
 * @param content {string}
 */
export const generateFileWithContent = (content: string) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "error-logs.txt";
  link.href = url;
  link.click();
};
