import { getAxiosInstance } from "../utils/getAxiosInstance";
import END_POINTS from "./EndPoints";

class ApiManager {
  static fetchDeals(
    userId: number,
    filters: Record<string, any>,
    page: number,
    limit: number
  ) {
    const url = END_POINTS.FETCH_DEALS();
    const axios = getAxiosInstance(url);
    return axios.post(url, { userId, filters, page, limit });
  }

  static fetchStages() {
    const url = END_POINTS.FETCH_STAGES();
    const axios = getAxiosInstance(url);
    return axios.get(url);
  }

  static fetchTherapeuticAreas(userId: number) {
    const url = END_POINTS.FETCH_TA();
    const axios = getAxiosInstance(url);
    return axios.get(url, { params: { userId } });
  }

  static fetchLineFunctions() {
    const url = END_POINTS.FETCH_LINE_FUNCTIONS();
    const axios = getAxiosInstance(url);
    return axios.get(url);
  }

  static login() {
    const url = END_POINTS.LOGIN();
    const axios = getAxiosInstance(url);
    return axios.post(url);
  }

  static searchPersonByEmail(email: string) {
    const url = END_POINTS.SEARCH_PERSON();
    const axios = getAxiosInstance(url);
    return axios.get(url, { params: { email } });
  }

  static createDeal(data: any) {
    const url = END_POINTS.CREATE_DEAL();
    const axios = getAxiosInstance(url);
    return axios.post(url, data);
  }
}

export default ApiManager;
