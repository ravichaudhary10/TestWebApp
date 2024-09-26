import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const options = {
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
};

const axiosLiveInstance = axios.create(options);
const axiosMockInstance = axios.create(options);

export const axiosMockAdapterInstance = new AxiosMockAdapter(
  axiosMockInstance,
  {
    delayResponse: 0,
  }
);

const addHeaders = (config: any) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers["Content-Type"] = "application/json";
  return config;
};

axiosLiveInstance.interceptors.request.use(addHeaders);
axiosMockInstance.interceptors.request.use(addHeaders);

export { axiosLiveInstance, axiosMockInstance };
