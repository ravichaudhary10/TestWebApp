import { MOCK_CONFIG } from "../constants/global.constants";
import { axiosLiveInstance, axiosMockInstance } from "./axios";

export const getAxiosInstance = (api: string) => {
  return MOCK_CONFIG[api] ? axiosMockInstance : axiosLiveInstance;
};
