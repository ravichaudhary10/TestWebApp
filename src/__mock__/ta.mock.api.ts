import therapeuticAreas from "./data/therapeuticAreas.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";

mock.onGet(/therapeutic-areas\/?.*/).reply(async (config) => {
  try {
    await wait(1000);

    return [200, therapeuticAreas];
  } catch (err) {
    console.error(err);
    return [500, { message: "Internal server error" }];
  }
});
