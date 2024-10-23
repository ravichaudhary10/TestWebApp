import { useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Header } from "../../components/Header";
import { getBreadcrumbItems, getFileName } from "./DealDetailPage.helpers";
import {
  ADD_NEW_RESOURCE_BUTTON_TITLE,
  DOWNLOAD_TEMPLATE,
  TAB_MENU_ITEMS,
  UPLOAD_EXCEL,
} from "./DealDetailPage.constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Path } from "../../routes";
import { ResourceListView } from "../../components/ResourceListView";
import { Tab } from "./DealDetailPage.types";
import { saveAs } from "file-saver";
import { RESOURCE_TEMPLATE_FILE_BASE64 } from "./ResourceTemplate.base64";

// Primereact imports
import { TabMenu, TabMenuTabChangeEvent } from "primereact/tabmenu";
import { Button } from "primereact/button";

const DealDetailPage = () => {
  // States
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

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

  // Create the appropriate view based on the selected tab in TabMenu
  const selectedTabView =
    activeTabIndex === Tab.RESOURCES ? (
      <ResourceListView dealId={parseInt(dealId)} />
    ) : (
      <p className="m-0">History</p>
    );

  /**
   * Generates and downloads the resource template excel file
   */
  const handleResourceTemplateDownload = () => {
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
              onClick={handleResourceTemplateDownload}
            />
            <Button icon="pi pi-upload" outlined aria-label="Upload" />
            <Button
              label={ADD_NEW_RESOURCE_BUTTON_TITLE}
              size="small"
              onClick={openAddResourceView}
              aria-label={UPLOAD_EXCEL}
              tooltip={UPLOAD_EXCEL}
              tooltipOptions={{ position: "top" }}
            />
          </div>
        </div>

        {selectedTabView}
      </div>
    </div>
  );
};

export default DealDetailPage;
