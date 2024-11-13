import React, { useEffect, useMemo, useState } from "react";
import { AuditTrailDataItem } from "./AuditTrailListView.types";
import { EMPTY_MESSAGE, INITIAL_FILTERS } from "./AuditTrailListView.constants";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ApiManager from "../../ApiManager/ApiManager";
import { handleError } from "../../utils/handleError";
import { paginatorTemplate } from "../../utils/templates";
import AuditTrailFilter from "./AuditTrailFilter";
import { getFilterPayload } from "./AuditTrailListView.helpers";
import { LoadingIndicator } from "../LoadingIndicator";
import { debounce } from "../../utils/debounce";
import "./AuditTrailListView.styles.scss";

// Prime react imports
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

interface AuditTrailListViewProps {
  dealId: number;
}

const AuditTrailListView: React.FC<AuditTrailListViewProps> = ({ dealId }) => {
  // States
  const [auditTrailData, setAuditTrailData] = useState<{
    data: AuditTrailDataItem[];
    totalRecords: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  // Create lazy state for the data table
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    filters: INITIAL_FILTERS as Record<string, any>,
  });

  // Selectors
  const user = useAppSelector((state) => state.user);

  // Dispatch function
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetches the current deal's audit trail list satisfying the filters, page and limit parameters
    const fetchAuditTrailData = async (
      userId: number,
      dealId: number,
      filters: Record<string, any>,
      page: number,
      limit: number
    ) => {
      // Show loading spinner
      setIsLoading(true);

      try {
        const response = await ApiManager.fetchAuditTrailData(
          userId,
          dealId,
          filters,
          page,
          limit
        );
        setAuditTrailData(response.data);
      } catch (error: any) {
        // Show error toast
        handleError(dispatch, error);
      } finally {
        setIsLoading(false);
        setShowEmptyMessage(true);
      }
    };

    // Fetch the list of deals from backend API
    user?.id &&
      dealId &&
      fetchAuditTrailData(
        user.id,
        dealId,
        getFilterPayload(lazyState.filters),
        lazyState.page + 1,
        lazyState.rows
      );
  }, [dispatch, lazyState, user, dealId]);

  /**
   * Gets invoked when page is changed in data table
   * @param event
   */
  const onPage = (event: PaginatorPageChangeEvent) => {
    setlazyState({
      ...lazyState,
      first: event.first,
      rows: event.rows,
      page: event.page ?? 0,
    });
  };

  /**
   * Debounced filter handler. Gets invoked when filters are applied on Audit list.
   * @param event
   */
  const filterHandler = useMemo(() => {
    return debounce((filters: Record<string, any>) => {
      setlazyState({
        ...lazyState,
        filters,
      });
    }, 500);
  }, [lazyState]);

  return (
    <div className="relative">
      {isLoading && <LoadingIndicator />}

      {/* Audit trail filter section */}
      <AuditTrailFilter onFilter={filterHandler} />

      {auditTrailData?.data?.length ? (
        <>
          <div className="">
            {auditTrailData.data.map((item) => (
              <div
                key={item.id}
                className="flex justify-content-start gap-4 list-item text-gray font-normal text-base"
              >
                <div className="flex-grow-1 truncate-text">
                  {item.description}
                </div>
                <div style={{ minWidth: "9rem", textAlign: "right" }}>
                  {new Date(item.actionDate as any).toDateString()}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        showEmptyMessage && <div className="p-2 text-gray">{EMPTY_MESSAGE}</div>
      )}

      <div className="divider" />
      <Paginator
        template={paginatorTemplate}
        first={lazyState.first}
        rows={lazyState.rows}
        totalRecords={auditTrailData?.totalRecords || 0}
        onPageChange={onPage}
        className="justify-content-end"
      />
      <div className="divider" />
    </div>
  );
};

export default AuditTrailListView;
