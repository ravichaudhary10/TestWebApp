import lineFunctions from "./data/lineFunctions.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";

mock.onGet(/line-functions\/?.*/).reply(async (config) => {
  try {
    await wait(1000);

    return [200, lineFunctions];
  } catch (err) {
    console.error(err);
    return [500, { data: null, error: { message: "Internal server error" } }];
  }
});
