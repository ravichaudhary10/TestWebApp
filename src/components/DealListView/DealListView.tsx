import React, { useState, useEffect, SyntheticEvent } from "react";
import { Deal, DealListField } from "./DealListView.types";
import { LazyTableState } from "../../types/commonTypes";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import { fetchDeals } from "../../redux/middleware/fetchDeals";
import { deleteDeal } from "../../redux/middleware/deleteDeal";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getFilterPayload } from "../../utils/getFilterPayload";
import { Link } from "react-router-dom";
import { Path } from "../../routes";

import {
  THERAPEUTIC_AREA,
  DEAL_NAME,
  DEAL_STAGE,
  DEAL_LEAD,
  MODIFIED_BY,
  MODIFIED_AT,
  EMPTY_MESSAGE,
  INITIAL_FILTERS,
  CLEAR_ALL_LABEL,
} from "./DealListView.constants";

// PrimeReact imports
import {
  DataTable,
  DataTablePageEvent,
  DataTableFilterEvent,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import {
  PaginatorCurrentPageReportOptions,
  PaginatorRowsPerPageDropdownOptions,
} from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { SelectItem } from "primereact/selectitem";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import {
  CONFIRMATION_ACCEPT_LABEL,
  CONFIRMATION_REJECT_LABEL,
  DEAL_DELETION_CONFIRMATION_HEADER,
  DEAL_DELETION_CONFIRMATION_MSG,
} from "../../pages/CreateDealPage/CreateDealPage.constants";

const DealListView: React.FC = () => {
  // Dispatch function
  const dispatch = useAppDispatch();

  // Selectors
  const user = useAppSelector((state) => state.user);
  const deals = useAppSelector((state) => state.deals);
  const therapeuticAreas = useAppSelector((state) => state.therapeuticAreas);
  const stages = useAppSelector((state) => state.stages);
  const isLoading = useAppSelector((state) => state.isLoading);

  // Create lazy state for the data table
  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 0,
    filters: INITIAL_FILTERS,
  });

  useEffect(() => {
    // Fetch the list of deals from backend API
    user?.id &&
      dispatch(
        fetchDeals(
          user.id,
          getFilterPayload(lazyState.filters),
          lazyState.page + 1,
          lazyState.rows
        )
      );
  }, [dispatch, lazyState, user]);

  const actionColumnTemplate = (rowData: Deal) => {
    return (
      <div className="flex justify-content-center">
        <Link to={`${Path.UPDATE_DEAL}/${rowData.id}`}>
          <img src={editIcon} alt="Edit Icon" style={{ padding: "0 0.5rem" }} />
        </Link>

        <div
          onClick={() => handleDealDeletion(rowData.id)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={deleteIcon}
            alt="Delete Icon"
            style={{ padding: "0 1.5rem" }}
          />
        </div>
      </div>
    );
  };

  const paginatorTemplate = {
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 30, value: 30 },
        { label: 40, value: 40 },
        { label: 50, value: 50 },
      ];

      return (
        <React.Fragment>
          <span
            className="mx-1"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Rows per page:{" "}
          </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </React.Fragment>
      );
    },
    CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
      return (
        <span
          style={{
            color: "var(--text-color)",
            userSelect: "none",
            width: "120px",
            textAlign: "center",
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  const onPage = (event: DataTablePageEvent) => {
    setlazyState({
      ...lazyState,
      first: event.first,
      rows: event.rows,
      page: event.page ?? 0,
    });
  };

  const onFilter = (event: DataTableFilterEvent) => {
    setlazyState({ ...lazyState, filters: event.filters });
  };

  const multiSelectListItemTemplate = (option: SelectItem) => {
    return (
      <div key={option.value} className="flex align-items-center gap-2">
        <span>{option.label}</span>
      </div>
    );
  };

  const multiSelectFilterTemplate =
    (data: SelectItem[] | null) =>
    (options: ColumnFilterElementTemplateOptions) => {
      return (
        <div className="p-float-label">
          <MultiSelect
            value={options.value}
            options={data || []}
            itemTemplate={multiSelectListItemTemplate}
            onChange={(e: MultiSelectChangeEvent) =>
              options.filterApplyCallback(e.value)
            }
            optionLabel="label"
            className="p-column-filter"
            tooltip={
              options.value && options.value.length > 1
                ? options.value?.map((item: string) => item)
                : null
            }
            maxSelectedLabels={1}
            // style={{ minWidth: "12rem" }}
          />
          <label>Select</label>
        </div>
      );
    };

  const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <div className="p-float-label">
        <Calendar
          value={options.value}
          onChange={(e) => options.filterApplyCallback(e.value)}
          style={{ minWidth: "15rem" }}
          showIcon
          // icon={() => <img src={calendarIcon} alt="Calendar Icon" />}
        />
        <label>Select</label>
      </div>
    );
  };

  const inputTextFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <div className="p-float-label">
        <InputText
          value={options.value}
          onChange={(e) => options.filterApplyCallback(e.target.value)}
        />
        <label>Search</label>
      </div>
    );
  };

  const dealLeadBodyTemplate = (rowData: Deal) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData[DealListField.LEADS]?.[0]?.name || ""}</span>
      </div>
    );
  };

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
   * Handles deletion of deal by showing a confirmation popup before deletion
   * @param id {number} Id of the deal to be deleted
   */
  const handleDealDeletion = (id: number) => {
    const accept = () => {
      user?.id && dispatch(deleteDeal(id, user.id));
    };

    confirmDialog({
      message: DEAL_DELETION_CONFIRMATION_MSG,
      header: DEAL_DELETION_CONFIRMATION_HEADER,
      accept,
    });
  };

  return (
    <div>
      <ConfirmDialog
        acceptLabel={CONFIRMATION_ACCEPT_LABEL}
        rejectLabel={CONFIRMATION_REJECT_LABEL}
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
      >
        <Column
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
        ></Column>
      </DataTable>
    </div>
  );
};

export default DealListView;
