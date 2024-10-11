// Prime react imports
import { Calendar } from "primereact/calendar";
import { ColumnFilterElementTemplateOptions } from "primereact/column";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import {
  PaginatorCurrentPageReportOptions,
  PaginatorRowsPerPageDropdownOptions,
} from "primereact/paginator";
import { SelectItem } from "primereact/selectitem";

/**
 * Paginator Template for Data table
 */
export const paginatorTemplate = {
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
      <>
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
      </>
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

const listItemTemplate = (option: SelectItem) => {
  return (
    <div key={option.value} className="flex align-items-center gap-2">
      <span>{option.label}</span>
    </div>
  );
};

/**
 * Multiselect filter field template
 * @param data
 * @returns
 */
export const multiSelectFilterTemplate =
  (data: SelectItem[] | null) =>
  (options: ColumnFilterElementTemplateOptions) => {
    return (
      <div className="p-float-label">
        <MultiSelect
          value={options.value}
          options={data || []}
          itemTemplate={listItemTemplate}
          onChange={(e: MultiSelectChangeEvent) =>
            options.filterApplyCallback(e.value)
          }
          optionLabel="label"
          className="p-column-filter"
          tooltip={
            options.value && options.value.length > 1
              ? options.value
                  ?.map(
                    (value: string) =>
                      (data as any).find((item: any) => item.value === value)
                        .label
                  )
                  .join(", ")
              : null
          }
          maxSelectedLabels={1}
        />
        <label>Select</label>
      </div>
    );
  };

/**
 * Dropdown filter field template
 * @param data
 * @returns
 */
export const dropdownFilterTemplate =
  (data: SelectItem[] | null) =>
  (options: ColumnFilterElementTemplateOptions) => {
    return (
      <div className="p-float-label">
        <Dropdown
          value={options.value}
          options={data || []}
          itemTemplate={listItemTemplate}
          onChange={(e: DropdownChangeEvent) =>
            options.filterApplyCallback(e.value)
          }
          optionLabel="label"
          className="p-column-filter"
        />
        <label>Select</label>
      </div>
    );
  };

/**
 * Filter field template for date column
 * @param options
 * @returns
 */
export const dateFilterTemplate = (
  options: ColumnFilterElementTemplateOptions
) => {
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

/**
 * Filter field template for plain input text column
 * @param options
 * @returns
 */
export const inputTextFilterTemplate = (
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

/**
 * Content template for any boolean column
 * @param rowData
 * @returns
 */
export const booleanFieldBodyTemplate = (fieldName: any) => (rowData: any) => {
  return <span>{rowData[fieldName] ? "Yes" : "No"}</span>;
};
