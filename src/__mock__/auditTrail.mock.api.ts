import auditTrailData from "./data/auditTrailData.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";
import { AuditTrailDataItem } from "../components/AuditTrailListView";

mock.onPost("/audit-trail").reply(async (config: any) => {
  try {
    await wait(1000);

    const { page, limit, filters } = JSON.parse(config.data);

    let data = [...auditTrailData.data];

    if (filters) {
      data = data.filter((item: AuditTrailDataItem) => {
        // Filter by action
        if (filters.action && !(item.action as any).includes(filters.action)) {
          return false;
        }

        // Filter by performedBy
        if (
          filters.performedBy &&
          !(item.performedBy as any).name
            .toLowerCase()
            .includes(filters.performedBy.toLowerCase())
        ) {
          return false;
        }

        // Filter by action date
        if (filters.actionDate && item.actionDate) {
          let date = new Date(filters.actionDate);
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          if (
            date.toDateString() !== new Date(item.actionDate).toDateString()
          ) {
            return false;
          }
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
