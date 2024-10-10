import resourceData from "./data/resourceData.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";
import { Resource } from "../components/ResourceListView";

mock.onPost("/resources/list").reply(async (config: any) => {
  try {
    await wait(1000);

    const { page, limit, filters } = JSON.parse(config.data);

    let data = [...resourceData.data];

    if (filters) {
      data = data.filter((item: Resource) => {
        // Filter by name
        if (
          filters.name &&
          !(item.name as any).toLowerCase().includes(filters.name.toLowerCase())
        ) {
          return false;
        }

        // Filter by stage
        if (
          filters.stage?.length &&
          !(filters.stage as any).includes((item.stage as any).id)
        ) {
          return false;
        }

        return true;
      });
    }

    const totalRecords = data.length;
    const start = (page - 1) * limit;
    data = data.slice(start, start + limit);

    return [200, { data, totalRecords }];
  } catch (err) {
    console.error(err);
    return [500, { data: null, error: { message: "Internal server error" } }];
  }
});
