import React, { useState, useEffect } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import {
  Column,
  ColumnBodyOptions,
  ColumnFilterElementTemplateOptions,
} from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { DealService } from "../../services/DealService";
import {
  PaginatorRowsPerPageDropdownOptions,
  PaginatorCurrentPageReportOptions,
} from "primereact/paginator";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { DealData } from "./DealList.types";

const DealList: React.FC = () => {
  const [deals, setDeals] = useState<DealData[]>([]);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    dealName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    therapeuticArea: { value: null, matchMode: FilterMatchMode.EQUALS },
    dealStage: { value: null, matchMode: FilterMatchMode.EQUALS },
    modifiedBy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    dateModified: { value: null, matchMode: FilterMatchMode.EQUALS },
    dealLead: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //Fetch the list of deals from backend API
    DealService.getDeals().then((data) => setDeals(data));
    setLoading(false);
  }, []);

  const [therapeuticAreas] = useState([
    { label: "CRM", value: "crm" },
    { label: "AB", value: "ab" },
    { label: "CD", value: "cd" },
    { label: "SR", value: "sr" },
  ]);

  //   const taItemTemplate = (option: string) => {
  //     return (
  //       <div className="flex align-items-center">
  //         <span>{option}</span>
  //       </div>
  //     );
  //   };

  //   const taRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  //     return (
  //       <MultiSelect
  //         value={options}
  //         options={therapeuticAreas}
  //         // itemTemplate={taItemTemplate}
  //         // onChange={(e: MultiSelectChangeEvent) =>
  //         //   options.filterApplyCallback(e.value)
  //         // }
  //         optionLabel="name"
  //         placeholder="Any"
  //         className="p-column-filter"
  //         maxSelectedLabels={1}
  //         style={{ minWidth: "14rem" }}
  //       />
  //     );
  //   };

  const paginatorTemplate = {
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 120, value: 120 },
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

  const actionColumnTemplate = (data: any, options: ColumnBodyOptions) => {
    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-pencil"
          size="small"
          rounded
          text
          aria-label="Edit Button"
        />
        <Button
          icon="pi pi-trash"
          size="small"
          rounded
          text
          aria-label="Delete Button"
        />
      </div>
    );
  };

  return (
    <div>
      <DataTable
        value={deals}
        size="small"
        // paginator
        // rows={10}
        // rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
        tableStyle={{ minWidth: "50rem" }}
        // paginatorTemplate={paginatorTemplate}
        // currentPageReportTemplate="{first} - {last} of {totalRecords}"
        // paginatorClassName="justify-content-end"
        // filters={filters}
        // filterDisplay="row"
        // loading={loading}
        emptyMessage="No deals found."
      >
        <Column
          field="dealName"
          header="Deal Name"
          // filter
          // showFilterMenu={false}
          // filterPlaceholder="Search"
        />
        <Column
          field="therapeuticArea"
          header="Therapeutic Area"
          // showFilterMenu={false}
          // filter
          // filterPlaceholder="Search"
          //   filterElement={taRowFilterTemplate}
        />

        <Column
          field="dealStage"
          header="Deal Stage"
          // showFilterMenu={false}
          // filter
          // filterPlaceholder="Search"
          //   filterElement={stageRowFilterTemplate}
        />

        <Column
          field="modifiedBy"
          header="Modified By"
          // showFilterMenu={false}
          // filter
          // filterPlaceholder="Search"
        />

        <Column
          field="dealLead"
          header="Deal Lead"
          // showFilterMenu={false}
          // filter
          // filterPlaceholder="Search"
        ></Column>
        <Column field="actions" header="" body={actionColumnTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default DealList;

// import React, { useState, useEffect } from "react";
// import {
//   DataTable,
//   DataTableSelectionSingleChangeEvent,
//   DataTableSelectAllChangeEvent,
//   DataTablePageEvent,
//   DataTableSortEvent,
//   DataTableFilterEvent,
//   DataTableFilterMeta,
// } from "primereact/datatable";

// import { Column } from "primereact/column";
// import { CustomerService } from "../../services/CustomerService";

// interface Country {
//   name: string;
//   code: string;
// }

// interface Representative {
//   name: string;
//   code: string;
// }

// interface Customer {
//   id: number;
//   name: string;
//   country: Country;
//   company: string;
//   date: string;
//   status: string;
//   verified: boolean;
//   activity: number;
//   representative: Representative;
//   balance: number;
// }

// interface LazyTableState {
//   first: number;
//   rows: number;
//   page: number;
//   sortField?: string | null;
//   sortOrder?: number | null;
//   filters: DataTableFilterMeta;
// }

// export default function DealList() {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [totalRecords, setTotalRecords] = useState<number>(0);
//   const [customers, setCustomers] = useState<Customer[] | null>(null);
//   const [selectAll, setSelectAll] = useState<boolean>(false);
//   const [selectedCustomers, setSelectedCustomers] = useState<Customer[] | null>(
//     null
//   );
//   const [lazyState, setlazyState] = useState<LazyTableState>({
//     first: 0,
//     rows: 10,
//     page: 1,
//     sortField: null,
//     sortOrder: null,
//     filters: {
//       name: { value: "", matchMode: "contains" },
//       "country.name": { value: "", matchMode: "contains" },
//       company: { value: "", matchMode: "contains" },
//       "representative.name": { value: "", matchMode: "contains" },
//     },
//   });

//   let networkTimeout = null;

//   useEffect(() => {
//     loadLazyData();
//   }, [lazyState]);

//   const loadLazyData = () => {
//     setLoading(true);

//     if (networkTimeout) {
//       clearTimeout(networkTimeout);
//     }

//     //imitate delay of a backend call
//     networkTimeout = setTimeout(() => {
//       CustomerService.getCustomers({
//         lazyEvent: JSON.stringify(lazyState),
//       }).then((data) => {
//         setTotalRecords(data.totalRecords);
//         setCustomers(data.customers);
//         setLoading(false);
//       });
//     }, Math.random() * 1000 + 250);
//   };

//   const onPage = (event: DataTablePageEvent) => {
//     setlazyState(event);
//   };

//   const onSort = (event: DataTableSortEvent) => {
//     setlazyState(event);
//   };

//   const onFilter = (event: DataTableFilterEvent) => {
//     event["first"] = 0;
//     setlazyState(event);
//   };

//   const onSelectionChange = (event: DataTableSelectionSingleChangeEvent) => {
//     const value = event.value;

//     setSelectedCustomers(value);
//     setSelectAll(value.length === totalRecords);
//   };

//   const onSelectAllChange = (event: DataTableSelectAllChangeEvent) => {
//     const selectAll = event.checked;

//     if (selectAll) {
//       CustomerService.getCustomers().then((data) => {
//         setSelectAll(true);
//         setSelectedCustomers(data.customers);
//       });
//     } else {
//       setSelectAll(false);
//       setSelectedCustomers([]);
//     }
//   };

//   const representativeBodyTemplate = (rowData: Customer) => {
//     return (
//       <div className="flex align-items-center gap-2">
//         <img
//           alt={rowData.representative.name}
//           src={`https://primefaces.org/cdn/primereact/images/avatar/${rowData.representative.image}`}
//           width={32}
//         />
//         <span>{rowData.representative.name}</span>
//       </div>
//     );
//   };

//   const countryBodyTemplate = (rowData: Customer) => {
//     return (
//       <div className="flex align-items-center gap-2">
//         <img
//           alt="flag"
//           src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
//           className={`flag flag-${rowData.country.code}`}
//           style={{ width: "24px" }}
//         />
//         <span>{rowData.country.name}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="card">
//       <DataTable
//         value={customers}
//         lazy
//         filterDisplay="row"
//         dataKey="id"
//         paginator
//         first={lazyState.first}
//         rows={10}
//         totalRecords={totalRecords}
//         onPage={onPage}
//         onSort={onSort}
//         sortField={lazyState.sortField}
//         sortOrder={lazyState.sortOrder}
//         onFilter={onFilter}
//         filters={lazyState.filters}
//         loading={loading}
//         tableStyle={{ minWidth: "75rem" }}
//         selection={selectedCustomers}
//         onSelectionChange={onSelectionChange}
//         selectAll={selectAll}
//         onSelectAllChange={onSelectAllChange}
//       >
//         <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
//         <Column
//           field="name"
//           header="Name"
//           sortable
//           filter
//           filterPlaceholder="Search"
//         />
//         <Column
//           field="country.name"
//           sortable
//           header="Country"
//           filterField="country.name"
//           body={countryBodyTemplate}
//           filter
//           filterPlaceholder="Search"
//         />
//         <Column
//           field="company"
//           sortable
//           filter
//           header="Company"
//           filterPlaceholder="Search"
//         />
//         <Column
//           field="representative.name"
//           header="Representative"
//           body={representativeBodyTemplate}
//           filter
//           filterPlaceholder="Search"
//         />
//       </DataTable>
//     </div>
//   );
// }
