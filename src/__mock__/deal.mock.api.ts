import dealData from "./data/dealData.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";
import { Deal } from "../components/DealListView";

mock.onPost("/deals").reply(async (config: any) => {
  try {
    await wait(1000);

    const { page, limit, filters } = JSON.parse(config.data);

    let data = [...dealData.data];

    if (filters) {
      data = data.filter((item: Deal) => {
        // Filter by name
        if (
          filters.name &&
          !(item.name as any).toLowerCase().includes(filters.name.toLowerCase())
        ) {
          return false;
        }

        // Filter by mofifiedBy
        if (
          filters.modifiedBy &&
          !(item.modifiedBy as any).name
            .toLowerCase()
            .includes(filters.modifiedBy.toLowerCase())
        ) {
          return false;
        }

        // Filter by deal lead
        if (filters.leads) {
          const leadNames = item.leads?.map((o) => o.name);
          let isMatch = leadNames?.some((o) =>
            o.toLowerCase().includes(filters.leads.toLowerCase())
          );
          if (!isMatch) {
            return false;
          }
        }

        // Filter by stage
        if (
          filters.stage?.length &&
          !(filters.stage as any).includes((item.stage as any).id)
        ) {
          return false;
        }

        // Filter by stage
        if (
          filters.therapeuticArea?.length &&
          !(filters.therapeuticArea as any).includes(
            (item.therapeuticArea as any).id
          )
        ) {
          return false;
        }

        // Filter by date modified
        if (
          filters.modifiedAt &&
          filters.modifiedAt.getTime() !== item.modifiedAt
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
    return [500, { message: "Internal server error" }];
  }
});
