import React, { useState, useEffect, SyntheticEvent } from "react";
import { Resource } from "./ResourceListView.types";
import { LazyTableState, ResourceListField } from "../../types/commonTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getFilterPayload } from "../../utils/getFilterPayload";
import { useNavigate } from "react-router-dom";

import {
  LINE_FUNCTION,
  NAME,
  TITLE,
  EMAIL,
  STAGE,
  VDR_ACCESS,
  WEB_TRAINING,
  NOVARTIS_ID,
  KICK_OFF_ATTENDANCE,
  OPTIONAL,
  CORE_TEAM_MEMBER,
  SITE,
  EMPTY_MESSAGE,
  INITIAL_FILTERS,
} from "./ResourceListView.constants";

import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";

import {
  CONFIRM_LABEL,
  CANCEL_LABEL,
  CLEAR_ALL_LABEL,
  SUCCESS_MESSAGES,
} from "../../constants/global.constants";

import {
  paginatorTemplate,
  multiSelectFilterTemplate,
  dropdownFilterTemplate,
  inputTextFilterTemplate,
  booleanFieldBodyTemplate,
} from "../../utils/templates";

import {
  webTrainingOptions,
  booleanOptions,
} from "./ResourceListView.constants";

// PrimeReact imports
import {
  DataTable,
  DataTablePageEvent,
  DataTableFilterEvent,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Path } from "../../routes";
import {
  RESOURCE_DELETION_CONFIRMATION_HEADER,
  RESOURCE_DELETION_CONFIRMATION_MSG,
} from "../../pages/AddResourcePage/AddResourcePage.constants";
import { handleSuccess } from "../../utils/handleSuccess";

interface ResourceListViewProps {
  dealId: number;
}

const ResourceListView: React.FC<ResourceListViewProps> = ({ dealId }) => {
  // States
  const [resources, setResources] = useState<{
    data: Resource[];
    totalRecords: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Create lazy state for the data table
  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 0,
    filters: INITIAL_FILTERS,
  });

  // Selectors
  const user = useAppSelector((state) => state.user);
  const lineFunctions = useAppSelector((state) => state.lineFunctions);
  const stages = useAppSelector((state) => state.stages);

  // Dispatch function
  const dispatch = useAppDispatch();

  // Navigate method
  const navigate = useNavigate();

  useEffect(() => {
    // Fetches the resources satisfying the filters, page and limit parameters
    const fetchResources = async (
      dealId: number,
      filters: Record<string, any>,
      page: number,
      limit: number
    ) => {
      // Show loading spinner
      setIsLoading(true);

      try {
        const response = await ApiManager.fetchResources(
          dealId,
          filters,
          page,
          limit
        );
        setResources(response.data);
      } catch (error: any) {
        // Show error toast
        handleError(dispatch, error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch the list of deals from backend API
    user?.id &&
      fetchResources(
        dealId,
        getFilterPayload(lazyState.filters),
        lazyState.page + 1,
        lazyState.rows
      );
  }, [dispatch, lazyState, user, dealId]);

  /**
   * Action buttons template for Data table
   * @param rowData
   * @returns {React.ReactNode}
   */
  const actionColumnTemplate = (rowData: Resource) => {
    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-pencil"
          rounded
          text
          aria-label="Edit Resource Button"
          className="action-icon-button"
          onClick={() =>
            navigate(
              `${Path.UPDATE_RESOURCE}/${rowData.id}/stage/${rowData.stage?.id}`
            )
          }
        />
        <Button
          icon="pi pi-trash"
          text
          aria-label="Delete Resource Button"
          className="action-icon-button"
          onClick={() => handleResourceDeletion(rowData.id, rowData.stage?.id)}
        />
      </div>
    );
  };

  /**
   * Gets invoked when page is changed in data table
   * @param event
   */
  const onPage = (event: DataTablePageEvent) => {
    setlazyState({
      ...lazyState,
      first: event.first,
      rows: event.rows,
      page: event.page ?? 0,
    });
  };

  /**
   * Gets invoked when filtering is modified on data table
   * @param event
   */
  const onFilter = (event: DataTableFilterEvent) => {
    setlazyState({ ...lazyState, filters: event.filters });
  };

  /**
   * Returns the template for clear filter button
   * @returns {React.ReactNode}
   */
  const clearFilterTemplate = () => {
    return (
      <Button
        size="small"
        label={CLEAR_ALL_LABEL}
        disabled={!isListFiltered()}
        onClick={clearAllFilters}
      />
    );
  };

  /**
   * Clear all the filters applied on data table
   */
  const clearAllFilters = (e: SyntheticEvent) => {
    setlazyState({ ...lazyState, filters: INITIAL_FILTERS });
  };

  /**
   * Checks whether the deals list is filtered or  not
   * @returns {boolean}
   */
  const isListFiltered = () => {
    return Object.values(lazyState.filters).some((item) => {
      const value = (item as DataTableFilterMetaData).value;
      return Boolean(value?.toString());
    });
  };

  /**
   * Handles deletion of resource by showing a confirmation popup before deletion
   * @param id {number} Id of the resource to be deleted
   */
  const handleResourceDeletion = (
    resourceId: number,
    stageId: number | undefined
  ) => {
    if (user?.id && resourceId && stageId) {
      const accept = () => {
        deleteResource(dealId, stageId, resourceId);
      };

      confirmDialog({
        message: RESOURCE_DELETION_CONFIRMATION_MSG,
        header: RESOURCE_DELETION_CONFIRMATION_HEADER,
        accept,
      });
    }
  };

  /**
   * Deletes a resource with given Id by making API call and passing on required data.
   * @param dealId
   * @param stageId
   * @param resourceId
   */
  const deleteResource = async (
    dealId: number,
    stageId: number,
    resourceId: number
  ) => {
    // Show loading spinner
    setIsLoading(true);

    try {
      await ApiManager.deleteResource(dealId, stageId, resourceId, user?.id);

      // Show success toast
      handleSuccess(dispatch, SUCCESS_MESSAGES.RESOURCE_DELETION_SUCCESS);

      // Rerender the deal list to fetch latest deals
      setlazyState({ ...lazyState });
    } catch (error: any) {
      // Show error toast
      handleError(dispatch, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ConfirmDialog
        acceptLabel={CONFIRM_LABEL}
        rejectLabel={CANCEL_LABEL}
        closable={false}
        acceptClassName="p-button-sm"
        rejectClassName="p-button-outlined p-button-sm"
        defaultFocus="reject"
      />

      <DataTable
        value={resources?.data}
        size="small"
        lazy
        dataKey="recordId"
        paginator
        first={lazyState.first}
        rows={lazyState.rows}
        totalRecords={resources?.totalRecords || 0}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName="justify-content-end"
        onPage={onPage}
        onFilter={onFilter}
        filterDisplay="row"
        filters={lazyState.filters}
        loading={isLoading}
        tableStyle={{ minWidth: "75rem" }}
        emptyMessage={EMPTY_MESSAGE}
        selectionMode="single"
        scrollable
      >
        <Column
          field={ResourceListField.LINE_FUNCTION + ".name"}
          header={LINE_FUNCTION}
          filter
          showFilterMenu={false}
          filterField={ResourceListField.LINE_FUNCTION}
          filterElement={multiSelectFilterTemplate(lineFunctions)}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field={ResourceListField.NAME}
          header={NAME}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.NAME}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field={ResourceListField.TITLE}
          header={TITLE}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.TITLE}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field={ResourceListField.EMAIL}
          header={EMAIL}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.EMAIL}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field={ResourceListField.STAGE + ".name"}
          header={STAGE}
          filter
          showFilterMenu={false}
          filterField={ResourceListField.STAGE}
          filterElement={multiSelectFilterTemplate(stages)}
          style={{ minWidth: "14rem" }}
        />
        <Column
          body={booleanFieldBodyTemplate(ResourceListField.VDR_ACCESS)}
          field={ResourceListField.VDR_ACCESS}
          header={VDR_ACCESS}
          filter
          showFilterMenu={false}
          filterElement={dropdownFilterTemplate(booleanOptions)}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field={ResourceListField.WEB_TRAINING}
          header={WEB_TRAINING}
          filter
          showFilterMenu={false}
          filterElement={multiSelectFilterTemplate(webTrainingOptions)}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field={ResourceListField.NOVARTIS_ID}
          header={NOVARTIS_ID}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.NOVARTIS_ID}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field={ResourceListField.KICK_OFF_ATTENDANCE}
          header={KICK_OFF_ATTENDANCE}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.KICK_OFF_ATTENDANCE}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field={ResourceListField.OPTIONAL}
          header={OPTIONAL}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.OPTIONAL}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "14rem" }}
        />
        <Column
          body={booleanFieldBodyTemplate(ResourceListField.CORE_TEAM_MEMBER)}
          field={ResourceListField.CORE_TEAM_MEMBER}
          header={CORE_TEAM_MEMBER}
          filter
          showFilterMenu={false}
          filterElement={dropdownFilterTemplate(booleanOptions)}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field={ResourceListField.SITE}
          header={SITE}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.SITE}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="actions"
          header=""
          body={actionColumnTemplate}
          filter
          showFilterMenu={false}
          showClearButton={false}
          filterElement={clearFilterTemplate}
          frozen
          alignFrozen="right"
          style={{ minWidth: "110px" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default ResourceListView;
