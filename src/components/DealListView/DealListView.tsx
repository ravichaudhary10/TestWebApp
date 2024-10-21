import React, { useState, useEffect, SyntheticEvent } from "react";
import { Deal, DealListField } from "./DealListView.types";
import { LazyTableState } from "../../types/commonTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getFilterPayload } from "../../utils/getFilterPayload";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../routes";
import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";
import { handleSuccess } from "../../utils/handleSuccess";

import {
  paginatorTemplate,
  inputTextFilterTemplate,
  multiSelectFilterTemplate,
  dateFilterTemplate,
} from "../../utils/templates";

import {
  THERAPEUTIC_AREA,
  DEAL_NAME,
  DEAL_STAGE,
  DEAL_LEAD,
  MODIFIED_BY,
  MODIFIED_AT,
  EMPTY_MESSAGE,
  INITIAL_FILTERS,
} from "./DealListView.constants";

import {
  DEAL_DELETION_CONFIRMATION_HEADER,
  DEAL_DELETION_CONFIRMATION_MSG,
} from "../../pages/CreateDealPage/CreateDealPage.constants";

import {
  SUCCESS_MESSAGES,
  CONFIRM_LABEL,
  CANCEL_LABEL,
  CLEAR_ALL_LABEL,
} from "../../constants/global.constants";

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

const DealListView: React.FC = () => {
  // States
  const [deals, setDeals] = useState<{
    data: Deal[];
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

  // Dispatch function
  const dispatch = useAppDispatch();

  // Navigate method
  const navigate = useNavigate();

  // Selectors
  const user = useAppSelector((state) => state.user);
  const therapeuticAreas = useAppSelector((state) => state.therapeuticAreas);
  const stages = useAppSelector((state) => state.stages);

  useEffect(() => {
    // Fetches the deals satisfying the filters, page and limit parameters
    const fetchDeals = async (
      userId: number,
      filters: Record<string, any>,
      page: number,
      limit: number
    ) => {
      // Show loading spinner
      setIsLoading(true);

      try {
        const response = await ApiManager.fetchDeals(
          userId,
          filters,
          page,
          limit
        );
        setDeals(response.data);
      } catch (error: any) {
        // Show error toast
        handleError(dispatch, error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch the list of deals from backend API
    user?.id &&
      fetchDeals(
        user.id,
        getFilterPayload(lazyState.filters),
        lazyState.page + 1,
        lazyState.rows
      );
  }, [dispatch, lazyState, user]);

  /**
   * Action buttons template for Data table
   * @param rowData
   * @returns {React.ReactNode}
   */
  const actionColumnTemplate = (rowData: Deal) => {
    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-pencil"
          rounded
          text
          aria-label="Edit Resource Button"
          className="action-icon-button"
          onClick={() => navigate(`${Path.UPDATE_DEAL}/${rowData.id}`)}
        />
        <Button
          icon="pi pi-trash"
          text
          aria-label="Delete Resource Button"
          className="action-icon-button"
          onClick={() => handleDealDeletion(rowData.id)}
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
   * Content template for Deal name column
   * @param rowData
   * @returns
   */
  const dealNameBodyTemplate = (rowData: Deal) => {
    const dealName = rowData[DealListField.NAME] || "";
    return (
      <Link to={`/deals/${rowData.id}`} state={{ dealName }}>
        <span>{dealName}</span>
      </Link>
    );
  };

  /**
   * Content template for Deal lead column
   * @param rowData
   * @returns
   */
  const dealLeadBodyTemplate = (rowData: Deal) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData[DealListField.LEADS]?.[0]?.name || ""}</span>
      </div>
    );
  };

  /**
   * Content template for Deal lead column
   * @param rowData
   * @returns
   */
  const modifiedAtBodyTemplate = (rowData: Deal) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>
          {rowData[DealListField.MODIFIED_AT]
            ? new Date(rowData[DealListField.MODIFIED_AT] as any).toDateString()
            : ""}
        </span>
      </div>
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
        value={deals?.data}
        size="small"
        lazy
        dataKey="id"
        paginator
        first={lazyState.first}
        rows={lazyState.rows}
        totalRecords={deals?.totalRecords || 0}
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
          body={dealNameBodyTemplate}
          field={DealListField.NAME}
          header={DEAL_NAME}
          filter
          showFilterMenu={false}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "15rem" }}
        />
        <Column
          field={DealListField.THERAPEUTIC_AREA + ".name"}
          header={THERAPEUTIC_AREA}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.THERAPEUTIC_AREA}
          filterElement={multiSelectFilterTemplate(therapeuticAreas)}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field={DealListField.STAGE + ".name"}
          header={DEAL_STAGE}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.STAGE}
          filterElement={multiSelectFilterTemplate(stages)}
          style={{ minWidth: "10rem" }}
        />
        <Column
          field={DealListField.MODIFIED_BY + ".name"}
          header={MODIFIED_BY}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.MODIFIED_BY}
          filterElement={inputTextFilterTemplate}
          style={{ minWidth: "10rem" }}
        />
        <Column
          body={modifiedAtBodyTemplate}
          header={MODIFIED_AT}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.MODIFIED_AT}
          filterElement={dateFilterTemplate}
          style={{ minWidth: "10rem" }}
        />
        <Column
          body={dealLeadBodyTemplate}
          header={DEAL_LEAD}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.DEAL_LEAD}
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
          style={{ minWidth: "110px" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default DealListView;
