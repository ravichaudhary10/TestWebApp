/**
 * Checks if there is query param named "mock" in the URL
 * @returns {Boolean} returns true there is query param named "mock" in the URL else returns false
 */
export const isMock = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("mock") != null;
};
