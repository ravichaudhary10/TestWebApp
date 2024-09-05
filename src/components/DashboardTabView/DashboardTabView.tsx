import React, { useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import TabContentPanel from "../TabContentPanel";
import DealList from "../DealList";

const DashboardTabView: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="Dashboard tab panel"
      >
        <Tab label="Deals" {...a11yProps(0)} />
        <Tab label="History" {...a11yProps(1)} />
      </Tabs>

      <TabContentPanel value={tabIndex} index={0}>
        <DealList />
      </TabContentPanel>
      <TabContentPanel value={tabIndex} index={1}>
        History
      </TabContentPanel>
    </Box>
  );
};

export default DashboardTabView;
