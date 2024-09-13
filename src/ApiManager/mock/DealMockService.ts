import dealData from "./data/dealData.json";
import { Deal } from "../../components/DealListView";

class DealMockService {
  static getDeals(payload: Object) {
    const { start, rows, filters } = payload as any;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let data = [...dealData];
        console.log("filters", filters);

        if (filters) {
          data = data.filter((item: Deal) => {
            // Filter by name
            if (
              filters.name &&
              !(item.name as any)
                .toLowerCase()
                .includes(filters.name.toLowerCase())
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
              filters.therapeuticArea.length &&
              !(filters.therapeuticArea as any).includes(
                (item.therapeuticArea as any).id
              )
            ) {
              return false;
            }

            // Filter by date modified
            if (
              filters.dateModified &&
              filters.dateModified.getTime() !== item.dateModified
            ) {
              return false;
            }

            return true;
          });
        }

        const totalRecords = data.length;

        data = data.slice(start, start + rows);
        const response = { data, totalRecords };

        resolve(response);
      }, 1000);
    });
  }
}

export default DealMockService;
