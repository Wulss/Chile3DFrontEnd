/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { css } from "@emotion/react";
import TwoTabs from "../components/TwoTabs";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchMap from "../components/SearchMap/SearchMap";
import Navbar from "../components/Navbar";

const useStyles = {
  root: css`
    flex-grow: 1;
    position: relative;
  `,
  logo: css`
    font-weight: bold;
    font-size: 1.5rem;
  `,
  toolbar: css`
    justify-content: flex-end;
  `,
};

export default function SearchPage() {
  const [clearGeometry, setClearGeometry] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log("Active Tab:", activeTab);
  }, [activeTab]);

  // Esta función maneja la acción de limpiar la geometría en el mapa.
  const handleClearGeometry = () => {
    setClearGeometry(true);
  };

  // Esta función maneja los resultados obtenidos de la búsqueda.
  const handleResults = (updatedResults) => {
    setResults(updatedResults);
  };

  // Esta función maneja el evento de finalización del dibujo en el mapa para cambiar a la pestaña de resultados.
  const handleFinishDrawing = (event, newValue) => {
    console.log("finished drawing");
    setActiveTab((prevTab) => prevTab === 0 ? 1 : prevTab);
    console.log("active tab:", activeTab);
  };

  return (
    <div css={useStyles.root}>
      {/* Componente Navbar */}
      <Navbar />
      <Grid container>
        {/* Componente que maneja las pestañas */}
        <Grid item xs={5}>
          <TwoTabs
            handleClearButton={handleClearGeometry}
            results={results}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onFinishDrawing={handleFinishDrawing}
          />
        </Grid>

        {/* Componente de mapa de búsqueda */}
        <Grid item xs={7}>
          <SearchMap
            clearGeometry={clearGeometry}
            setClearGeometry={setClearGeometry}
            onDrawEnd={handleResults}
            onFinishDrawing={handleFinishDrawing}
          />
        </Grid>
      </Grid>
    </div>
  );
}
