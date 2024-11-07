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
    const axios = getAxiosInstance("dealListAPI");
    return axios.post(url, { userId, filters, page, limit });
  }

  static fetchDealDetail(dealId: number) {
    const url = END_POINTS.FETCH_DEAL_DETAIL(dealId);
    const axios = getAxiosInstance("dealDetailAPI");
    return axios.get(url);
  }

  static fetchStages() {
    const url = END_POINTS.FETCH_STAGES();
    const axios = getAxiosInstance("stagesAPI");
    return axios.get(url);
  }

  static fetchTherapeuticAreas(userId: number) {
    const url = END_POINTS.FETCH_TA();
    const axios = getAxiosInstance("therapeuticAreasAPI");
    return axios.get(url, { params: { userId } });
  }

  static fetchLineFunctions() {
    const url = END_POINTS.FETCH_LINE_FUNCTIONS();
    const axios = getAxiosInstance("lineFunctionsAPI");
    return axios.get(url);
  }

  static fetchResources(
    dealId: number,
    filters: Record<string, any>,
    page: number,
    limit: number
  ) {
    const url = END_POINTS.FETCH_RESOURCES();
    const axios = getAxiosInstance("resourceListAPI");
    return axios.post(url, { dealId, filters, page, limit });
  }

  static fetchResourceDetail(
    resourceId: number,
    dealId: number,
    stageId: number
  ) {
    const url = END_POINTS.FETCH_RESOURCE_DETAIL();
    const axios = getAxiosInstance("resourceDetailAPI");
    return axios.get(url, { params: { resourceId, dealId, stageId } });
  }

  static login() {
    const url = END_POINTS.LOGIN();
    const axios = getAxiosInstance("loginAPI");
    return axios.post(url);
  }

  static searchPersonByEmail(email: string) {
    const url = END_POINTS.SEARCH_PERSON();
    const axios = getAxiosInstance("searchPersonAPI");
    return axios.get(url, { params: { email } });
  }

  static createDeal(data: any) {
    const url = END_POINTS.CREATE_DEAL();
    const axios = getAxiosInstance("createDealAPI");
    return axios.post(url, data);
  }

  static updateDeal(dealId: number, data: any) {
    const url = END_POINTS.UPDATE_DEAL(dealId);
    const axios = getAxiosInstance("updateDealAPI");
    return axios.put(url, data);
  }

  static deleteDeal(dealId: number, userId: number) {
    const url = END_POINTS.DELETE_DEAL(dealId, userId);
    const axios = getAxiosInstance("deleteDealAPI");
    return axios.delete(url);
  }

  static assignTherapeuticAreas(data: any) {
    const url = END_POINTS.ASSIGN_TA();
    const axios = getAxiosInstance("taAssignAPI");
    return axios.post(url, data);
  }

  static addResources(data: any) {
    const url = END_POINTS.ADD_RESOURCES();
    const axios = getAxiosInstance("addResourcesAPI");
    return axios.post(url, data);
  }

  static updateResource(data: any) {
    const url = END_POINTS.UPDATE_RESOURCE();
    const axios = getAxiosInstance("updateResourceAPI");
    return axios.put(url, data);
  }

  static deleteResource(
    dealId: number,
    stageId: number,
    resourceId: number,
    userId?: number
  ) {
    const url = END_POINTS.DELETE_RESOURCE(dealId, stageId, resourceId);
    const axios = getAxiosInstance("deleteResourceAPI");
    return axios.delete(url, { params: { userId } });
  }

  static onboardDealLead(data: any) {
    const url = END_POINTS.ONBOARD_DEAL_LEAD();
    const axios = getAxiosInstance("onboardDealLeadAPI");
    return axios.post(url, data);
  }
}

export default ApiManager;
