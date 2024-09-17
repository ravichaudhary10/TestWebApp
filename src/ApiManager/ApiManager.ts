import END_POINTS from "./EndPoints";
import axios from "../utils/axios";

class ApiManager {
  static getDeals(data: Object) {
    const url = END_POINTS.GET_DEALS();
    return axios.post(url, data);
  }

  static getStages() {
    const url = END_POINTS.GET_STAGES();
    return axios.get(url);
  }

  static getTA(userId: string) {
    const url = END_POINTS.GET_TA(userId);
    return axios.get(url, { params: { userId } });
  }
}

export default ApiManager;
