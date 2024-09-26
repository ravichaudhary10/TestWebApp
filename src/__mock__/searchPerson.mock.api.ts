import personData from "./data/personData.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";

mock.onGet(/search-person\/?.*/).reply(async (config) => {
  try {
    await wait(1000);

    const email = config.params.email;

    const person = personData.find((item) => item.email === email);

    if (person) {
      return [200, person];
    }

    return [500, { data: null, error: { message: "Email not found" } }];
  } catch (err) {
    console.error(err);
    return [500, { data: null, error: { message: "Internal server error" } }];
  }
});
