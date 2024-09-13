import END_POINTS from "./EndPoints";
import ApiMethods from "./ApiMethods";
import { isMock } from "../utils/isMock";
import DealMockService from "./mock/DealMockService";
import TAMockService from "./mock/TAMockService";
import StageMockService from "./mock/StageMockService";

class ApiManager {
  static getDeals(data: Object) {
    if (isMock()) {
      return DealMockService.getDeals(data);
    }

    const url = END_POINTS.GET_DEALS();
    return ApiMethods.post(url, data);
  }

  static getStages() {
    if (isMock()) {
      return StageMockService.getStages();
    }

    const url = END_POINTS.GET_STAGES();
    return ApiMethods.get(url);
  }

  static getTA(userId: string) {
    if (isMock()) {
      return TAMockService.getTA(userId);
    }

    const url = END_POINTS.GET_TA(userId);
    return ApiMethods.get(url);
  }
}

export default ApiManager;
