import { Resource } from "../../components/ResourceListView";
import { DASHBOARD_TITLE } from "../../constants/global.constants";
import { ResourceListField } from "../../types/commonTypes";

import {
  ADD_RESOURCE_PAGE_TITLE,
  EDIT_RESOURCE_PAGE_TITLE,
  STAGES,
  RESOURCE_DETAILS_KEY,
} from "./AddResourcePage.constants";

/**
 * Create/Update resource form data based by parsing the data param
 * @param data {Resource} - Object received from Resource detail API which contains resource detail
 * @returns {object} formData - Object containing form values
 */
export const getFormValues = (data: Resource | null) => {
  const formValues = {
    [ResourceListField.LINE_FUNCTION]: data?.lineFunction?.id || null,
    [ResourceListField.STAGE]: data?.stage?.id || null,
    [ResourceListField.VDR_ACCESS]: data
      ? data.vdrAccessRequested
        ? "yes"
        : "no"
      : null,
    [ResourceListField.WEB_TRAINING]: data?.webTrainingStatus || "",
    [ResourceListField.KICK_OFF_ATTENDANCE]: data?.oneToOneDiscussion || "",
    [ResourceListField.CORE_TEAM_MEMBER]: data
      ? data.isCoreTeamMember
        ? "yes"
        : "no"
      : null,
    [ResourceListField.OPTIONAL]: data?.optionalColumn || "",
    [STAGES]: data?.stage?.id ? [data.stage?.id] : [],
    [RESOURCE_DETAILS_KEY]: data
      ? {
          [ResourceListField.EMAIL]: data[ResourceListField.EMAIL] || "",
          [ResourceListField.FIRST_NAME]:
            data[ResourceListField.FIRST_NAME] || "",
          [ResourceListField.LAST_NAME]:
            data[ResourceListField.LAST_NAME] || "",
          [ResourceListField.TITLE]: data[ResourceListField.TITLE] || "",
          [ResourceListField.NOVARTIS_ID]:
            data[ResourceListField.NOVARTIS_ID] || "",
        }
      : null,
  };

  return formValues;
};

/**
 * Method used to generate breadcrumItem
 * @param isEditPage
 * @returns
 */
export const getBreadcrumbItems = (isEditPage: boolean) => {
  return [
    {
      icon: "pi pi-arrow-left",
      label: "Go back",
    },
    {
      icon: "pi pi-home",
      label: DASHBOARD_TITLE,
      url: "/",
    },
    isEditPage
      ? { icon: "pi pi-pencil", label: EDIT_RESOURCE_PAGE_TITLE }
      : {
          icon: "pi pi-user-plus",
          label: ADD_RESOURCE_PAGE_TITLE,
        },
  ];
};

/**
 * Returns appropriate page title based on parameter
 * @param isEditPage {boolean}
 * @returns {string}
 */
export const getPageTitle = (isEditPage: boolean) => {
  return isEditPage ? EDIT_RESOURCE_PAGE_TITLE : ADD_RESOURCE_PAGE_TITLE;
};

/**
 * Generates the payload required for "Add Resource" API call
 * @param formData
 * @param userId
 * @param dealId
 * @returns Payload object
 */
export const getAddResourcePayload = (
  formData: any,
  userId: number,
  dealId: number
) => ({
  userId,
  dealId,
  resources: [{ ...getResourcePayload(formData), stages: formData.stages }],
});

/**
 * Generates the payload required for "Update Resource" API call
 * @param formData
 * @param userId
 * @param dealId
 * @param stageId
 * @param resourceId
 * @returns Payload object
 */
export const getUpdateResourcePayload = (
  formData: any,
  userId: number,
  dealId: number,
  stageId: number,
  resourceId: number
) => ({
  userId,
  dealId,
  stageId,
  resourceData: { resourceId, ...getResourcePayload(formData) },
});

/**
 * Generates payload for resource data
 * @param formData
 * @returns Payload for resource data
 */
const getResourcePayload = (formData: any) => {
  // Form payload for resource being added/updated
  return {
    [ResourceListField.EMAIL]: formData[RESOURCE_DETAILS_KEY].email,
    [ResourceListField.LINE_FUNCTION]:
      formData[ResourceListField.LINE_FUNCTION],
    [ResourceListField.VDR_ACCESS]:
      formData[ResourceListField.VDR_ACCESS] === "yes",
    [ResourceListField.WEB_TRAINING]: formData[ResourceListField.WEB_TRAINING],
    [ResourceListField.KICK_OFF_ATTENDANCE]:
      formData[ResourceListField.KICK_OFF_ATTENDANCE],
    [ResourceListField.CORE_TEAM_MEMBER]:
      formData[ResourceListField.CORE_TEAM_MEMBER] === "yes",
    [ResourceListField.OPTIONAL]: formData[ResourceListField.OPTIONAL],
  };
};
