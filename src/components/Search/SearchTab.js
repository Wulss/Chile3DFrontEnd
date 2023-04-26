import React from "react";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SearchField from "./SearchField";
import SearchDate from "./SearchDate";

export default function SearchTab({ handleButtonClick }) {
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {/* Seleccione el tipo de búsqueda que desea realizar, luego seleccione
          los distintos filtros que desee aplicar. */}
              Realice la búsqueda dibujando un polígono en el mapa.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h7" gutterBottom>
              Búsqueda por archivos
            </Typography>

            <SearchField />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h7" gutterBottom>
              Búsqueda por fecha
            </Typography>
            <SearchDate />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleButtonClick}>
          {" "}
          Limpiar Geometría
        </Button>
      </Grid>
    </Grid>
  );
}
