import React from "react";

interface TabContentPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabContentPanel: React.FC<TabContentPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

export default TabContentPanel;
