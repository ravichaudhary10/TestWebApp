import stageData from "./data/stageData.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";

mock.onGet("/stages").reply(async () => {
  try {
    await wait(1000);

    return [200, stageData];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
