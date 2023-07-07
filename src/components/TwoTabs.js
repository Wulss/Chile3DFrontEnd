import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchTab from "./Search/SearchTab";
import Button from "@mui/material/Button";
import ResultsTab from "./Search/ResultsTab";
import { set } from "date-fns";

// Componente que representa un panel de pestaña
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

// Componente principal de la interfaz con dos pestañas
export default function TwoTabs({
  handleClearButton,
  results,
  activeTab,
  setActiveTab,
}) {
  const [value, setValue] = React.useState(activeTab);
  const [searchResults, setSearchResults] = React.useState([]);
  const [latestResults, setLatestResults] = React.useState([]);

  // Maneja el cambio de pestaña
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    // Actualiza los resultados de búsqueda
  const handleSearchResults = (updatedResults) => {
    setSearchResults(updatedResults);
    setLatestResults(updatedResults);
    setValue(1);

    setActiveTab(1);
  };

  // Actualiza el valor de la pestaña activa cuando cambia la prop "activeTab"
  useEffect(() => {
    setValue(activeTab);
  }, [activeTab]);

  // Actualiza los resultados más recientes cuando cambia la prop "results"
  useEffect(() => {
    setLatestResults(results);
  }, [results]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#6E6E6E",
        }}
      >
        <Tabs value={value} onChange={handleChange} textColor="secondary">
          <Tab label="Búsqueda" />
          <Tab label="Resultados" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SearchTab
          handleClearButton={handleClearButton}
          handleSearchResults={handleSearchResults}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ResultsTab results={latestResults} />
      </TabPanel>
    </Box>
  );
}