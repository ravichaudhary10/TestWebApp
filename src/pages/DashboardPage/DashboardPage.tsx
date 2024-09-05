import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import Header from "../../components/Header";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

import DashboardTabView from "../../components/DashboardTabView";

import "./DashboardPage.scss";

const DashboardPage: React.FC = () => {
  return (
    <div className="page">
      <Header />

      <div className="page__content-area">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            MUI
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Core
          </Link>
          <Typography
            sx={{
              color: "text.primary",
              display: "flex",
              alignItems: "center",
            }}
          >
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Breadcrumb
          </Typography>
        </Breadcrumbs>

        <h1 className="page__title">Dashboard</h1>

        <DashboardTabView />
      </div>
    </div>
  );
};

export default DashboardPage;
