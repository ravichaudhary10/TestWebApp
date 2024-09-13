import React, { useState, useEffect } from "react";
import { Deal, Item, DealListField } from "./DealListView.types";
import { LazyTableState } from "../../types/commonTypes";
import ApiManager from "../../ApiManager/ApiManager";
import { createPayload } from "./DealListView.helpers";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import {
  THERAPEUTIC_AREA,
  DEAL_NAME,
  DEAL_STAGE,
  DEAL_LEAD,
  MODIFIED_BY,
  DATE_MODIFIED,
  EMPTY_MESSAGE,
} from "./DealListView.constants";

import {
  DataTable,
  DataTablePageEvent,
  DataTableFilterEvent,
} from "primereact/datatable";
import {
  Column,
  ColumnBodyOptions,
  ColumnFilterElementTemplateOptions,
} from "primereact/column";
import {
  PaginatorCurrentPageReportOptions,
  PaginatorRowsPerPageDropdownOptions,
} from "primereact/paginator";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";

const DealListView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [deals, setDeals] = useState<Deal[] | undefined>();
  const [error, setError] = useState<string | null>(null);

  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 0,
    filters: {
      [DealListField.NAME]: { value: "", matchMode: "contains" },
      [DealListField.THERAPEUTIC_AREA]: { value: [], matchMode: "contains" },
      [DealListField.STAGE]: { value: [], matchMode: "contains" },
      [DealListField.MODIFIED_BY]: { value: "", matchMode: "contains" },
      [DealListField.DATE_MODIFIED]: { value: null, matchMode: "contains" },
      [DealListField.LEADS]: { value: "", matchMode: "contains" },
    },
  });

  // TODO: It's temporary. This harcoded data will be replaced with data fetched from API
  const [taList] = useState<Item[]>([
    {
      id: "1",
      name: "CRM",
    },
    {
      id: "2",
      name: "IMM",
    },
    {
      id: "3",
      name: "NS",
    },
    {
      id: "4",
      name: "GTX",
    },
    {
      id: "5",
      name: "ONCO",
    },
    {
      id: "6",
      name: "RLT",
    },
    {
      id: "7",
      name: "Platform",
    },
    {
      id: "8",
      name: "Others",
    },
  ]);

  // TODO: It's temporary. This harcoded data will be replaced with data fetched from API
  const [stageList] = useState<Item[]>([
    {
      id: "1",
      name: "Triage",
    },
    {
      id: "2",
      name: "Focused Diligence",
    },
    {
      id: "3",
      name: "Full Assessment",
    },
    {
      id: "4",
      name: "Final Negotiation",
    },
    {
      id: "5",
      name: "Signed",
    },
    {
      id: "6",
      name: "Closed",
    },
  ]);

  useEffect(() => {
    // Downloads list of deals associated with the user
    const fetchDealList = async () => {
      try {
        // Show loading state
        setLoading(true);

        // Fetch deal list
        const payload = createPayload("1", lazyState); // TODO: replace "1" with real user Id once login is implemented
        const res: any = await ApiManager.getDeals(payload);

        // Update data in states
        setTotalRecords(res.totalRecords);
        setDeals(res.data);
        console.log("Deal list response:", res);
      } catch (error: any) {
        // Update error state
        setError(error.message);
        console.log("Error while downloading deals:", error);
      } finally {
        // Hide loading state
        setLoading(false);
      }
    };

    // Download the list of deals from backend API
    fetchDealList();
  }, [lazyState]);

  const actionColumnTemplate = (data: any, options: ColumnBodyOptions) => {
    return (
      <div className="flex justify-content-center">
        {/* <button
          size="small"
          text
          rounded
          aria-label="Edit Button"
          style={{ width: "1.5rem", height: "1.5rem" }}
        > */}
        <img src={editIcon} alt="Edit Icon" />

        {/* <Button
          size="small"
          text
          rounded
          outlined
          aria-label="Delete Button"
          style={{ width: "1.5rem", height: "1.5rem" }}
        > */}
        <img src={deleteIcon} alt="Delete Icon" />
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
      page: event.page,
    });
  };

  const onFilter = (event: DataTableFilterEvent) => {
    setlazyState({ ...lazyState, filters: event.filters });
  };

  const taListItemTemplate = (option: Item) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option.name}</span>
      </div>
    );
  };

  const taFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <MultiSelect
        value={options.value}
        options={taList}
        itemTemplate={taListItemTemplate}
        onChange={(e: MultiSelectChangeEvent) =>
          options.filterApplyCallback(e.value)
        }
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
        tooltip={options.value?.map((item: any) => item.name)}
        maxSelectedLabels={1}
        style={{ minWidth: "13rem" }}
      />
    );
  };

  const stageListItemTemplate = (option: Item) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{option.name}</span>
      </div>
    );
  };

  const stageFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <MultiSelect
        value={options.value}
        options={stageList}
        itemTemplate={stageListItemTemplate}
        onChange={(e: MultiSelectChangeEvent) =>
          options.filterApplyCallback(e.value)
        }
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
        tooltip={options.value?.map((item: any) => item.name)}
        maxSelectedLabels={1}
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const dateModifiedFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Calendar
        value={options.value}
        placeholder="Search"
        onChange={(e) => options.filterApplyCallback(e.value)}
        style={{ minWidth: "10rem" }}
      />
    );
  };

  const dealLeadBodyTemplate = (rowData: Deal) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData[DealListField.LEADS]?.[0]?.name}</span>
      </div>
    );
  };

  const dateModifiedBodyTemplate = (rowData: Deal) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>
          {new Date(rowData[DealListField.DATE_MODIFIED] as any).toDateString()}
        </span>
      </div>
    );
  };

  // const countryBodyTemplate = (rowData: Customer) => {
  //   return (
  //     <div className="flex align-items-center gap-2">
  //       <img
  //         alt="flag"
  //         src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
  //         className={`flag flag-${rowData.country.code}`}
  //         style={{ width: "24px" }}
  //       />
  //       <span>{rowData.country.name}</span>
  //     </div>
  //   );
  // };

  return (
    <div>
      <DataTable
        value={deals}
        size="small"
        lazy
        dataKey="id"
        paginator
        first={lazyState.first}
        rows={lazyState.rows}
        totalRecords={totalRecords}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName="justify-content-end"
        onPage={onPage}
        onFilter={onFilter}
        filterDisplay="row"
        filters={lazyState.filters}
        loading={loading}
        tableStyle={{ minWidth: "75rem" }}
        emptyMessage={EMPTY_MESSAGE}
      >
        <Column
          field={DealListField.NAME}
          header={DEAL_NAME}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
        />
        <Column
          field={DealListField.THERAPEUTIC_AREA + ".name"}
          header={THERAPEUTIC_AREA}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.THERAPEUTIC_AREA}
          filterElement={taFilterTemplate}
        />
        <Column
          field={DealListField.STAGE + ".name"}
          header={DEAL_STAGE}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.STAGE}
          filterElement={stageFilterTemplate}
        />
        <Column
          field={DealListField.MODIFIED_BY + ".name"}
          header={MODIFIED_BY}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.MODIFIED_BY}
        />
        <Column
          body={dateModifiedBodyTemplate}
          header={DATE_MODIFIED}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.DATE_MODIFIED}
          filterElement={dateModifiedFilterTemplate}
        />
        <Column
          body={dealLeadBodyTemplate}
          header={DEAL_LEAD}
          filter
          filterPlaceholder="Search"
          showFilterMenu={false}
          filterField={DealListField.LEADS}
        />
        <Column field="actions" header="" body={actionColumnTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default DealListView;
