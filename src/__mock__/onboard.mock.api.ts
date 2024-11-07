import personData from "./data/personData.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";

mock.onPost("/onboard-deallead").reply(async (config: any) => {
  try {
    await wait(1000);

    const { emailId } = JSON.parse(config.data);

    const person = personData.find((item) => item.email === emailId);

    if (person) {
      if (!person.role) {
        return [200, { id: 1 }];
      } else if (person.role === "Resource") {
        return [
          500,
          {
            data: null,
            error: {
              message:
                "This person is already assigned as a resource under one or more deals. Deal Lead permissions cannot be granted.",
            },
          },
        ];
      } else if (person.role === "DealLead") {
        return [
          500,
          {
            data: null,
            error: {
              message: "This person is already a Deal Lead",
            },
          },
        ];
      }
    }

    return [500, { data: null, error: { message: "Email not found" } }];
  } catch (err) {
    console.error(err);
    return [500, { data: null, error: { message: "Internal server error" } }];
  }
});
