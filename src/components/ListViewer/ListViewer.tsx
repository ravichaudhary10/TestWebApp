import React from "react";
import "./ListViewer.scss";
import { ListViewerProps } from "./ListViewer.types";

const ListViewer: React.FC<ListViewerProps> = ({ config, data }) => {
  return (
    <div className="list-viewer">
      <div className="list-viewer__heading"></div>

      {config?.showFilters && <div className="list-viewer__filter"></div>}

      <div className="list-viewer__data-grid"></div>

      {config?.allowPagination && (
        <div className="list-viewer__pagination"></div>
      )}
    </div>
  );
};

export default ListViewer;
