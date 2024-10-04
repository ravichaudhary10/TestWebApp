import therapeuticAreas from "./data/therapeuticAreas.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";

mock.onGet(/therapeutic-areas\/?.*/).reply(async (config) => {
  try {
    await wait(1000);

    return [200, therapeuticAreas];
  } catch (err) {
    console.error(err);
    return [500, { data: null, error: { message: "Internal server error" } }];
  }
});

mock.onPost("therapeutic-areas/assign").reply(async (config) => {
  try {
    await wait(1000);

    const { adminUserId, dealLeadId, therapeuticAreaIds } = JSON.parse(
      config.data
    );

    console.log(adminUserId, dealLeadId, therapeuticAreaIds);

    return [200, { message: "Therapeutic areas assigned successfully" }];
  } catch (err) {
    console.error(err);
    return [500, { data: null, error: { message: "Internal server error" } }];
  }
});
