import { useState } from "react";
import { listItemTemplate } from "../../utils/templates";
import { CLEAR_ALL_LABEL } from "../../constants/global.constants";
import {
  ACTION,
  ACTION_DATE,
  ACTIONS,
  AuditTrailDataField,
  FILTER_BY_LABEL,
  INITIAL_FILTERS,
  PERFORMED_BY,
} from "./AuditTrailListView.constants";

// Prime react imports
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface AuditTrailFilterProps {
  onFilter: (filters: Record<string, any>) => void;
}

const AuditTrailFilter: React.FC<AuditTrailFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const changeHandler = (field: string, value: any) => {
    const newFilters = {
      ...filters,
      [field]: value,
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  /**
   * Checks whether the list is filtered or  not
   * @returns {boolean}
   */
  const isListFiltered = () => {
    return Object.values(filters).some((item) => !!item);
  };

  /**
   * Clear all the filters applied on list
   */
  const clearAllFilters = () => {
    setFilters(INITIAL_FILTERS);
    onFilter(INITIAL_FILTERS);
  };

  return (
    <div className="flex align-items-center gap-5 p-2 filter-box">
      <div className="flex-grow-1 flex align-items-center gap-5">
        <span className="font-semibold text-base primary-text">
          {FILTER_BY_LABEL}
        </span>

        <div className="p-float-label">
          <InputText
            value={filters[AuditTrailDataField.PERFORMED_BY]}
            onChange={(e: any) =>
              changeHandler(AuditTrailDataField.PERFORMED_BY, e.target.value)
            }
            style={{ minWidth: "10rem" }}
          />
          <label>{PERFORMED_BY}</label>
        </div>

        <div className="p-float-label">
          <Dropdown
            value={filters[AuditTrailDataField.ACTION]}
            options={ACTIONS || []}
            itemTemplate={listItemTemplate}
            onChange={(e: DropdownChangeEvent) =>
              changeHandler(AuditTrailDataField.ACTION, e.value)
            }
            optionLabel="label"
            className="p-column-filter"
            style={{ minWidth: "10rem" }}
          />
          <label>{ACTION}</label>
        </div>

        <div className="p-float-label">
          <Calendar
            value={filters[AuditTrailDataField.ACTION_DATE]}
            onChange={(e: any) =>
              changeHandler(AuditTrailDataField.ACTION_DATE, e.value)
            }
            showIcon
            style={{ minWidth: "10rem" }}
          />
          <label>{ACTION_DATE}</label>
        </div>
      </div>

      <Button
        size="small"
        label={CLEAR_ALL_LABEL}
        disabled={!isListFiltered()}
        onClick={clearAllFilters}
        style={{ minWidth: "6rem" }}
      />
    </div>
  );
};

export default AuditTrailFilter;
