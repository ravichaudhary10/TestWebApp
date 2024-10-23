import { DASHBOARD_TITLE } from "../../constants/global.constants";
import { DEAL_DETAIL_PAGE_TITLE } from "./DealDetailPage.constants";

export const getBreadcrumbItems = (navigate: Function) => {
  return [
    {
      icon: "pi pi-arrow-left",
      label: "Go back",
      command: navigate(-1),
    },
    {
      icon: "pi pi-home",
      label: DASHBOARD_TITLE,
      url: "/",
    },
    { icon: "pi pi-folder", label: DEAL_DETAIL_PAGE_TITLE },
  ];
};

/**
 * Generates and returns the file name for resource template file.
 * @returns
 */
export const getFileName = () => {
  // current date and format as YYYY-MM-DD
  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toISOString().slice(0, 10);

  //filename with the current date
  return `Resource_Upload_Template_${formattedDate}.xlsx`;
};
