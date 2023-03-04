/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchTab from "./SearchTab";
import Button from "@mui/material/Button";
import ResultsTab from "./ResultsTab";
import Grid from "@mui/material/Grid";
import { css } from "@emotion/react";
import FileUploader from "./FileUploader";
import EditFiles from "./EditFiles";
import InstitutionTab from "./InstitutionTab";

const useStyles = {
  root: css`
    flex-grow: 1;
    display: flex;
    height: calc(100vh - 54px); /* 64-20: 44px is the height of the header */
    padding: 0;
  `,
  tabbar: css`
    border-right: 1px solid #ccc;
    height: 100%;
    background: #6e6e6e;
    align-items: center;
  `,
};

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

export default function AdminTabs({ handleButtonClick, results }) {
  const [value, setValue] = React.useState(0);

  //13573610
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container css={useStyles.root}>
      <Grid item xs={2.2} disableGutters css={useStyles.tabbar}>
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
      <Grid item xs={9.8} disableGutters css={useStyles.tab}>
        <TabPanel value={value} index={0}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FileUploader />
            </Grid>

            <Grid item xs={12}>
              <EditFiles />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InstitutionTab/>
        </TabPanel>
      </Grid>
    </Grid>
  );
}
