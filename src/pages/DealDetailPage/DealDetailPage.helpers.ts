import { DASHBOARD_TITLE } from "../../constants/global.constants";
import { ResourceListField } from "../../types/commonTypes";
import { validateEmail } from "../../utils/validateEmail";
import {
  COLUMN_NAME_TO_FIELD_MAP,
  DEAL_DETAIL_PAGE_TITLE,
  FILE_ERROR_MESSAGES,
  MANDATORY_FIELDS,
  TEMPLATE_FILE_NAME,
} from "./DealDetailPage.constants";

import { saveAs } from "file-saver";
import { RESOURCE_TEMPLATE_FILE_BASE64 } from "./ResourceTemplate.base64";

export const getBreadcrumbItems = () => {
  return [
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
  // Current date and format as YYYY-MM-DD
  const currentDate: Date = new Date();
  const formattedDate: string = currentDate.toISOString().slice(0, 10);

  // Filename with the current date
  return TEMPLATE_FILE_NAME.replace("{Date}", formattedDate);
};

/**
 * Generates resource template file from Base64 string
 */
export const generateResourceTemplateFile = () => {
  const sliceSize: number = 1024;
  const byteCharacters: string = atob(RESOURCE_TEMPLATE_FILE_BASE64);
  const bytesLength: number = byteCharacters.length;
  const slicesCount: number = Math.ceil(bytesLength / sliceSize);
  const byteArrays: Uint8Array[] = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin: number = sliceIndex * sliceSize;
    const end: number = Math.min(begin + sliceSize, bytesLength);
    const bytes: number[] = new Array(end - begin);

    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }

    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }

  // Save the file
  saveAs(
    new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
    getFileName()
  );
};

/**
 * Generates payload for resource data by iterating over file data if data is in valid format.
 * Throws exception, if data is invalid
 * @param fileData - Data parsed from the excel file
 * @param options - Object contaning maps for various dropdown items. This will be used to
 * identify the IDs from the Labels.
 * @returns
 */
export const generateResourcePayloadFromExcelFile = async (
  fileData: any,
  options: any
) => {
  // Check if file has no content
  if (!fileData?.rows?.length) {
    throw new Error(FILE_ERROR_MESSAGES.invalidFileData);
  }

  // Get data rows
  let dataRows = fileData.rows.slice(1);
  dataRows = dataRows.filter((row: any[]) => row?.length);

  // Check if dataRows is empty
  if (!dataRows.length) {
    throw new Error(FILE_ERROR_MESSAGES.emptyFile);
  }

  // Get header row
  const headerRow = fileData.rows[0];

  // Generate payload by iterating over dataRows array
  return dataRows.map((row: any[], rowIndex: number) => {
    const resource: any = {};

    if (!row || row.length !== headerRow.length) {
      throw new Error(FILE_ERROR_MESSAGES.invalidFileData);
    }

    headerRow.forEach((header: string, colIndex: number) => {
      const fieldName = COLUMN_NAME_TO_FIELD_MAP[header];

      if (!fieldName) {
        throw new Error(
          FILE_ERROR_MESSAGES.invalidColumnName.replace("{0}", header)
        );
      }

      const value = row[colIndex]?.toString()?.trim() || "";

      switch (fieldName) {
        case ResourceListField.EMAIL:
          if (validateEmail(value)) {
            resource[fieldName] = value;
          }
          break;

        case ResourceListField.LINE_FUNCTION:
          const lineFunctionId = options.lineFunctions.get(value);
          if (lineFunctionId) {
            resource[fieldName] = parseInt(lineFunctionId);
          }
          break;

        case ResourceListField.STAGE:
          const stageId = options.stages.get(value);
          if (stageId) {
            resource["stages"] = [parseInt(stageId)];
          }
          break;

        case ResourceListField.VDR_ACCESS:
        case ResourceListField.CORE_TEAM_MEMBER:
          if (["yes", "no"].includes(value.toLowerCase())) {
            resource[fieldName] = value === "yes";
          }
          break;

        case ResourceListField.WEB_TRAINING:
          const webTrainingStatus = options.webTrainingOptions.get(value);
          if (webTrainingStatus) {
            resource[fieldName] = webTrainingStatus;
          }
          break;

        case ResourceListField.KICK_OFF_ATTENDANCE:
        case ResourceListField.OPTIONAL:
          resource[fieldName] = value;
          break;
        default:
          break;
      }

      // If mandatory field is not populated, then must be some error while processing value
      if (MANDATORY_FIELDS.has(fieldName) && resource[fieldName] == null) {
        throw new Error(
          FILE_ERROR_MESSAGES.invalidColumnValue
            .replace("{0}", (rowIndex + 1).toString())
            .replace("{1}", header)
        );
      }
    });

    return resource;
  });
};
