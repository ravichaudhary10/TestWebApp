import React, { useState, useEffect, SyntheticEvent } from "react";
import { Resource, ResourceListField } from "./ResourceListView.types";
import { LazyTableState } from "../../types/commonTypes";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getFilterPayload } from "../../utils/getFilterPayload";
import { Link } from "react-router-dom";
import { Path } from "../../routes";

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
  CLEAR_ALL_LABEL,
} from "./ResourceListView.constants";
import {
  DEAL_DELETION_CONFIRMATION_HEADER,
  DEAL_DELETION_CONFIRMATION_MSG,
} from "../../pages/CreateDealPage/CreateDealPage.constants";
import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";
import { handleSuccess } from "../../utils/handleSuccess";
import {
  SUCCESS_MESSAGES,
  CONFIRM_LABEL,
  CANCEL_LABEL,
} from "../../constants/global.constants";

import {
  paginatorTemplate,
  multiSelectFilterTemplate,
  inputTextFilterTemplate,
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

  useEffect(() => {
    // Fetches the resources satisfying the filters, page and limit parameters
    const fetchResources = async (
      userId: number,
      filters: Record<string, any>,
      page: number,
      limit: number
    ) => {
      // Show loading spinner
      setIsLoading(true);

      try {
        const response = await ApiManager.fetchResources(
          userId,
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
        user.id,
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
        <Link to={`${Path.UPDATE_DEAL}/${rowData.id}`}>
          <img
            src={editIcon}
            alt="Edit Resource Button"
            style={{ padding: "0 0.5rem" }}
          />
        </Link>

        <div
          onClick={() => handleDealDeletion(rowData.id)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={deleteIcon}
            alt="Delete Resource Button"
            style={{ padding: "0 1.5rem" }}
          />
        </div>
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
   * Handles deletion of deal by showing a confirmation popup before deletion
   * @param id {number} Id of the deal to be deleted
   */
  const handleDealDeletion = (id: number) => {
    if (id && user?.id) {
      const accept = () => {
        deleteDeal(id, user.id);
      };

      confirmDialog({
        message: DEAL_DELETION_CONFIRMATION_MSG,
        header: DEAL_DELETION_CONFIRMATION_HEADER,
        accept,
      });
    }
  };

  /**
   * Deletes a deal with given deal Id by making API call and passing on required data.
   * @param dealId - Id of the deal to be deleted.
   * @param userId - If of the logged in user.
   */
  const deleteDeal = async (dealId: number, userId: number) => {
    // Show loading spinner
    setIsLoading(true);

    try {
      await ApiManager.deleteDeal(dealId, userId);

      // Show success toast
      handleSuccess(dispatch, SUCCESS_MESSAGES.DEAL_DELETION_SUCCESS);

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
        dataKey="id"
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
      >
        <Column
          field={ResourceListField.LINE_FUNCTION + ".name"}
          header={LINE_FUNCTION}
          filter
          showFilterMenu={false}
          filterField={ResourceListField.LINE_FUNCTION}
          filterElement={multiSelectFilterTemplate(lineFunctions)}
          style={{ minWidth: "15rem" }}
        />
        <Column
          field={ResourceListField.NAME}
          header={NAME}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.NAME}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field={ResourceListField.TITLE}
          header={TITLE}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.TITLE}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field={ResourceListField.EMAIL}
          header={EMAIL}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.EMAIL}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field={ResourceListField.STAGE + ".name"}
          header={STAGE}
          filter
          showFilterMenu={false}
          filterField={ResourceListField.STAGE}
          filterElement={multiSelectFilterTemplate(stages)}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field={ResourceListField.VDR_ACCESS}
          header={VDR_ACCESS}
          filter
          showFilterMenu={false}
          filterElement={multiSelectFilterTemplate(booleanOptions)}
          style={{ minWidth: "15rem" }}
        />
        <Column
          field={ResourceListField.WEB_TRAINING}
          header={WEB_TRAINING}
          filter
          showFilterMenu={false}
          filterElement={multiSelectFilterTemplate(webTrainingOptions)}
          style={{ minWidth: "15rem" }}
        />
        <Column
          field={ResourceListField.NOVARTIS_ID}
          header={NOVARTIS_ID}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.NOVARTIS_ID}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field={ResourceListField.KICK_OFF_ATTENDANCE}
          header={KICK_OFF_ATTENDANCE}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.KICK_OFF_ATTENDANCE}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field={ResourceListField.OPTIONAL}
          header={OPTIONAL}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.OPTIONAL}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field={ResourceListField.CORE_TEAM_MEMBER}
          header={CORE_TEAM_MEMBER}
          filter
          showFilterMenu={false}
          filterElement={multiSelectFilterTemplate(booleanOptions)}
          style={{ minWidth: "15rem" }}
        />
        <Column
          field={ResourceListField.SITE}
          header={SITE}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={ResourceListField.SITE}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "10rem" }}
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
        ></Column>
      </DataTable>
    </div>
  );
};

export default ResourceListView;
