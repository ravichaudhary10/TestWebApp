import { useRef, useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Header } from "../../components/Header";
import {
  generateResourcePayloadFromExcelFile,
  generateResourceTemplateFile,
  getBreadcrumbItems,
} from "./DealDetailPage.helpers";
import {
  ADD_NEW_RESOURCE_BUTTON_TITLE,
  DOWNLOAD_TEMPLATE,
  TAB_MENU_ITEMS,
  UPLOAD_EXCEL,
  FILE_ERROR_MESSAGES,
  VALID_FILE_EXTENSIONS,
} from "./DealDetailPage.constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Path } from "../../routes";
import { ResourceListView } from "../../components/ResourceListView";
import { Tab } from "./DealDetailPage.types";

//@ts-ignore
import { ExcelRenderer } from "react-excel-renderer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";
import { handleSuccess } from "../../utils/handleSuccess";
import { SUCCESS_MESSAGES } from "../../constants/global.constants";
import { showToast } from "../../redux/slices/rootSlice";
import { webTrainingOptions } from "../../components/ResourceListView/ResourceListView.constants";

// Primereact imports
import { TabMenu, TabMenuTabChangeEvent } from "primereact/tabmenu";
import { Button } from "primereact/button";
import { getLabelToValueMap } from "../../utils/getLabelToValueMap";

const DealDetailPage = () => {
  // States
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  // Ref to hold the reference of file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user info, stages and line functions from the redux store
  const user = useAppSelector((state) => state.user);
  const stages = useAppSelector((state) => state.stages);
  const lineFunctions = useAppSelector((state) => state.lineFunctions);

  // Dispatch function
  const dispatch = useAppDispatch();

  // Navigate method
  const navigate = useNavigate();

  // Fetch stateful value from the route
  const { state } = useLocation();

  // If no dealId present in params, return nothing
  const { dealId } = useParams<{ dealId: string }>();
  if (!dealId || isNaN(parseInt(dealId))) {
    return null;
  }

  // Handles tab change event of the TabMenu
  const handleTabChange = (e: TabMenuTabChangeEvent) => {
    setActiveTabIndex(e.index);
  };

  // Opens create deal view
  const openAddResourceView = () => {
    navigate(Path.ADD_RESOURCE);
  };

  /**
   * Gets invoked when Upload Excel button is clicked,
   * Which in turn performed the click operation on the file input element.
   */
  const handleExcelUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Gets invoked when a file is uploaded using File input element.
   * @param event
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file =
        event.target.files && event.target.files.length
          ? event.target.files[0]
          : null;

      if (!file) {
        return;
      }

      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !VALID_FILE_EXTENSIONS.includes(fileExtension)) {
        throw new Error(FILE_ERROR_MESSAGES.invalidFile);
      }

      // Parse the Excel sheet
      ExcelRenderer(file, (err: any, response: any) => {
        if (err) {
          throw new Error(FILE_ERROR_MESSAGES.parseError);
        }

        // Generate payload from excel file data
        generateResourcePayloadFromExcelFile(response, {
          lineFunctions: getLabelToValueMap(lineFunctions),
          stages: getLabelToValueMap(stages),
          webTrainingOptions: getLabelToValueMap(webTrainingOptions),
        })
          .then((resources) => {
            // Add resources
            addResources({
              dealId: parseInt(dealId),
              userId: user?.id,
              resources: resources,
            });
          })
          .catch((e) => {
            // Show error toast message
            showErrorToast(e.message);

            // Clear file input
            clearFileInput();
          });
      });
    } catch (e: any) {
      // Show error toast message
      showErrorToast(e.message);

      // Clear file input
      clearFileInput();
    }
  };

  // Clear file input element
  const clearFileInput = () => {
    if (fileInputRef?.current?.value) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Shows error toast with the specified message
   * @param message
   */
  const showErrorToast = (message: string) => {
    dispatch(
      showToast({
        severity: "error",
        message,
      })
    );
  };

  /**
   * Adds resources by making an API call and passing required data
   * @param data - Payload for add resource API call
   */
  const addResources = async (data: any) => {
    try {
      await ApiManager.addResources(data);
      // Show success toast
      handleSuccess(dispatch, SUCCESS_MESSAGES.RESOURCE_CREATION_SUCCESS);
    } catch (error: any) {
      // Show error toast
      handleError(dispatch, error);
    } finally {
    }
  };

  // Create the appropriate view based on the selected tab in TabMenu
  const selectedTabView =
    activeTabIndex === Tab.RESOURCES ? (
      <ResourceListView dealId={parseInt(dealId)} />
    ) : (
      <p className="m-0">History</p>
    );

  return (
    <div className="flex flex-column align-items-center">
      <Header />

      <div className="flex-1  w-11  p-3">
        <Breadcrumb items={getBreadcrumbItems(navigate)} />

        <h1 className="font-bold text-xl line-height-2">{state.dealName}</h1>

        <div className="flex align-items-center mb-3 w-full">
          <TabMenu
            activeIndex={activeTabIndex}
            model={TAB_MENU_ITEMS}
            onTabChange={handleTabChange}
            style={{ display: "inline-block" }}
          />
          <div className="flex flex-1 gap-2 justify-content-end ">
            <Button
              icon="pi pi-download"
              outlined
              aria-label={DOWNLOAD_TEMPLATE}
              tooltip={DOWNLOAD_TEMPLATE}
              tooltipOptions={{ position: "top" }}
              onClick={generateResourceTemplateFile}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls"
              style={{ display: "none" }} // Hiding the file input element
              onChange={handleFileChange}
            />

            <Button
              icon="pi pi-upload"
              outlined
              aria-label={UPLOAD_EXCEL}
              tooltip={UPLOAD_EXCEL}
              tooltipOptions={{ position: "top" }}
              onClick={handleExcelUpload}
            />
            <Button
              label={ADD_NEW_RESOURCE_BUTTON_TITLE}
              size="small"
              onClick={openAddResourceView}
            />
          </div>
        </div>

        {selectedTabView}
      </div>
    </div>
  );
};

export default DealDetailPage;
