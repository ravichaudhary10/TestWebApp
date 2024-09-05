import React from "react";
import ListViewer from "../ListViewer";
import { dealListViewerProps } from "./DealList.constants";

const DealList: React.FC = () => <ListViewer {...dealListViewerProps} />;

export default DealList;
