/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { Button, Grid, Typography, TextField, Card } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { css } from "@emotion/react";
import InstitutionTable from "./SearchInstitution/InstitutionTable.js"

const useStyles = {
  root: css`
    flex-grow: 1;
    display: flex;
  `,
  card: css`
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
};

const initialData = [
  {
    id: "638e0054212b2fe7c2d445e7",
    nombre: "Universidad Técnica Federico Santa María",
    descripcion: "Universidad Chilena enfocada en las ciencias de la ingeneria",
    sitio_web: "https://www.usm.cl/",
    email: "informaciones.rrhh@usm.cl",
    telefono: "+56 9 3437 3107",
    direccion: "Av. España 1680",
    area_trabajo: "Ciencias de la ingeneria",
    tipo_institucion: "Publica",
    created_at: "2022-12-05T14:29:40.964000",
  },
];

export default function InstitutionTab() {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [institutionsData, setInstitutionsData] = React.useState(initialData);

  const handleSearch = () => {
    const results = institutionsData.filter((institution) =>
      institution.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResults(results);
  };

  return (  
    <Grid container direction={"column"} spacing={4}>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4">Instituciones</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Nueva institución
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Card css={useStyles.card}>
          <Grid container direction={"row"} spacing={2} alignItems="center">
            <Grid item xs={4}>
              <TextField
                id="outlined-search"
                label="Ingrese el nombre de la institución"
                type="search"
                variant="outlined"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
          {searchResults.length > 0 && (
            <InstitutionTable institutions={searchResults} />
          )}
          
        </Card>
      </Grid>
    </Grid>
  );
}
