import React from "react";
import { Button, Grid, Typography, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export default function InstitutionTab() {
  return (
    <Grid container direction={"column"} spacing={4}>
      <Grid item>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Panel para poder controlar las instituciones
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
            >
              Crear nueva institucion
            </Button>
          </Grid>
        </Grid>
        
      </Grid>
      <Grid item>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Ingrese el nombre de la institucion a buscar
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="outlined-search"
                label="Búsqueda"
                type="search"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
    </Grid>
  );
}
