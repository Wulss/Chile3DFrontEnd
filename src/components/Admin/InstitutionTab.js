/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { Button, Grid, Typography, TextField, Card } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { css } from "@emotion/react";
import { getInstitutionsByText } from "../../services/api.js";
import NewInstitutionForm from "./NewInstitutionForm.js";
import InstitutionsTable from "./SearchInstitution/InstitutionTable.js";

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

export default function InstitutionTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [institutionsData, setInstitutionsData] = useState([]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const [showNoInstitutionsMessage, setShowNoInstitutionsMessage] =
    useState(false);

  // Busca las instituciones que coincidan con el texto ingresado
  const handleSearch = () => {
    setShowNoInstitutionsMessage(false);
    getInstitutionsByText(searchValue)
      .then((response) => {
        setSearchResults(response);
        setInstitutionsData(response);

        if (response.length === 0) {
          setShowNoInstitutionsMessage(true);
        }
      })
      .catch((error) => {
        console.log("Error en handleSearch");
        console.error(error);
      });
  };

  // Función para manejar la creación de una nueva institución
  const handlCreateInstitution = (newInstitution) => {  
    setInstitutionsData((prevInstitutionsData) => [
      ...prevInstitutionsData,
      newInstitution,
    ]);
  };

  // Función para manejar la edición de una institución
  const handleEditInstitution = (editedInstitution) => {
    console.log("editedInstitution", editedInstitution);
    console.log("institutionsData", institutionsData);
    
    setInstitutionsData((prevInstitutionsData) =>
      prevInstitutionsData.map((institution) => {
        if (institution.id === editedInstitution.id) {
          return editedInstitution;
        }

        return institution;
      })
    );
  };

  // Función para manejar el borrado de una institución
  const handleDeleteInstitution = (institutionId) => {
    setInstitutionsData((prevInstitutionsData) =>
      prevInstitutionsData.filter(
        (institution) => institution.id !== institutionId
      )
    );
  };

  return (
    <Grid container direction={"column"} spacing={4}>
      <Grid item sx={{ width: "81vw" }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4">Instituciones</Typography>
          </Grid>

          {/* Botón para abrir el formulario de nueva institución */}
          <Grid item xs={6} textAlign="right">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsDialogOpen(true)}
            >
              Nueva institución
            </Button>
            <NewInstitutionForm
              open={isDialogOpen}
              onClose={handleDialogClose}
              setInstitutions={handlCreateInstitution}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ width: "81vw" }}>
        <Card sx={{ padding: "20px" }}>

          {/* Campo de búsqueda */}
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

          {/* Tabla de instituciones si se encontraron instituciones */}
          {showNoInstitutionsMessage ? (
            <Typography variant="body2" component="div">
              No se encontraron Instituciones para la búsqueda.
            </Typography>
          ) : (
            searchResults.length > 0 && (
              <InstitutionsTable
                institutions={institutionsData}
                onEditInstitution={handleEditInstitution}
                onDeleteInstitution={handleDeleteInstitution}
              />
            )
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
