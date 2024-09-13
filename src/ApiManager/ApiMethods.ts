import { LazyTableState } from "../types/commonTypes";

const BASE_URL = "https://dev.novartis.com/api"; // TODO: Change it with the acutal base url

const getHeaders = () => {
  // Get auth token from redux store
  const getAuthToken = () => {
    const userData = { authToken: "dummy_auth_token" }; //store.getState()?.userData;
    return userData?.authToken || null;
  };

  // Return headers
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  };
};

class ApiMethods {
  static apiRequest(method: string, url: string, body: Object = {}) {
    url = BASE_URL + url;

    return new Promise((resolve, reject) => {
      fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: getHeaders(),
      })
        .then((res) => res.json())
        .then(resolve)
        .catch(reject);
    });
  }

  static get(url: string) {
    return this.apiRequest("GET", url);
  }

  static post(url: string, data: Object) {
    return this.apiRequest("POST", url, data);
  }

  static put(url: string, data: Object) {
    return this.apiRequest("PUT", url, data);
  }

  static delete(url: string) {
    return this.apiRequest("DELETE", url);
  }
}

export default ApiMethods;
