import loginResponse from "./data/loginResponse.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";

mock.onPost("/login").reply(async () => {
  try {
    await wait(1000);

    return [200, loginResponse];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
