import resourceData from "./data/resourceData.json";
import { axiosMockAdapterInstance as mock } from "../utils/axios";
import wait from "../utils/wait";
import { Resource, ResourceListField } from "../components/ResourceListView";

const LIST_FIELDS = [
  ResourceListField.LINE_FUNCTION,
  ResourceListField.STAGE,
  ResourceListField.WEB_TRAINING,
];

const TEXT_FIELDS = [
  ResourceListField.NAME,
  ResourceListField.TITLE,
  ResourceListField.EMAIL,
  ResourceListField.NOVARTIS_ID,
  ResourceListField.KICK_OFF_ATTENDANCE,
  ResourceListField.OPTIONAL,
  ResourceListField.SITE,
];

const BOOLEAN_FIELDS = [
  ResourceListField.VDR_ACCESS,
  ResourceListField.CORE_TEAM_MEMBER,
];

mock.onPost("/resources/list").reply(async (config: any) => {
  try {
    await wait(1000);

    const { page, limit, filters } = JSON.parse(config.data);

    let data = [...resourceData.data];

    if (filters) {
      data = data.filter((item: Resource) => {
        // Filter by all text fields
        for (const field of TEXT_FIELDS) {
          if (
            filters[field] &&
            !(item[field] as any)
              .toLowerCase()
              .includes(filters[field].toLowerCase())
          ) {
            return false;
          }
        }

        // Filter by all list fields
        for (const field of LIST_FIELDS) {
          if (
            filters[field]?.length &&
            !(filters[field] as any).includes(
              typeof item[field] === "object"
                ? (item[field] as any).id
                : (item[field] as string).toLowerCase()
            )
          ) {
            return false;
          }
        }

        // Filter by all text fields
        for (const field of BOOLEAN_FIELDS) {
          if (filters[field] !== null && item[field] !== filters[field]) {
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