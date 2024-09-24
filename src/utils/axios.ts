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

const axiosInstance = process.env.REACT_APP_IS_AXIOS_MOCK
  ? axiosMockInstance
  : axiosLiveInstance;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default axiosInstance;
