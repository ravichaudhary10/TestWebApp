import taData from "./data/taData.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";

mock.onGet("/talist").reply(async () => {
  try {
    await wait(1000);

    return [200, taData];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
