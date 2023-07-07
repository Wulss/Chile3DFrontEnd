/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchTab from "../Search/SearchTab";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { css } from "@emotion/react";
import FileUploader from "./FileUploader";
import EditFiles from "./SearchFile/EditFiles";
import InstitutionTab from "./InstitutionTab";

const useStyles = {
  root: css`
    flex-grow: 1;
    display: flex;
    height: calc(100vh - 64px); /* 64px is the height of the header */
  `,
  tabbar: css`
    border-right: 1px solid #ccc;
    height: 100%;
    background: #6e6e6e;
    align-items: center;
  `,
};

// Componente de panel de pestaña
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Componente principal que representa los tabs de administrador
export default function AdminTabs({ handleButtonClick, results }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container css={useStyles.root}>
      <Grid item xs={2.2} css={useStyles.tabbar}>
        {/* Componente de pestañas verticales */}
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          textColor="secondary"
        >
          <Tab label="Archivos" />
          <Tab label="Instituciones" />
        </Tabs>
      </Grid>
      <Grid item xs={9.8} css={useStyles.tab}>
        {/* Contenido de los paneles de pestañas */}
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Archivos
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* Componente de carga de archivos */}
              <FileUploader />
            </Grid>

            <Grid item xs={12}>
              {/* Componente de edición de archivos */}
              <EditFiles />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Componente de pestaña de instituciones */}
          <InstitutionTab />
        </TabPanel>
      </Grid>
    </Grid>
  );
}
