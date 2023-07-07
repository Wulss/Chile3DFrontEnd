import React from "react";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SearchField from "./SearchField";

// Componente que muestra la pestaña de búsqueda
export default function SearchTab({ handleClearButton, handleSearchResults }) {
  const handleResults = (updatedResults) => {
    handleSearchResults(updatedResults);
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container rowSpacing={2} spacing={10}>
          <Grid item xs={12}>
            <Typography variant="h6">
              Realice la búsqueda dibujando un polígono en el mapa o ingrese su
              búsqueda en el campo de texto.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <SearchField handleResults={handleResults} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleClearButton}>
          {" "}
          Limpiar Geometría
        </Button>
      </Grid>
    </Grid>
  );
}
