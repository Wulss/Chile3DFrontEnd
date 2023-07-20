/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { Grid, Typography, Box, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { FormControlLabel, Checkbox, Pagination } from "@mui/material";
import { downloadFiles } from "../../services/api";
import LoadingSpinner from "../LoadingSpinner";
import { css } from "@emotion/react";

const useStyles = {
  overlay: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  },
  itemLabelStyles: {
    maxWidth: "35vw",
  },
};

export default function ResultsTab({ results }) {
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const pageCount = Math.ceil(results.length / pageSize);

  // Función que maneja el cambio de estado de los checkboxes
  const handleChange = (event, item) => {
    if (event.target.checked) {
      setSelected([...selected, item]);
    } else {
      setSelected(selected.filter((selectedItem) => selectedItem !== item));
    }
  };

  // Función que maneja la descarga de los archivos seleccionados
  const handleDownloadRoutes = () => {
    setIsLoading(selected.length);
    const files = selected.map((item) => item.url);
    downloadFiles(files)
      .then(() => {
        setIsLoading(0);
      })
      .catch((error) => {
        console.log("Error downloading files: ", error);
        setIsLoading(0);
      });
  };

  // Función que maneja el cambio de estado del checkbox "Seleccionar todo"
  const handleSelectAll = () => {
    if (selected.length === paginatedResults.length) {
      setSelected([]);
    } else {
      setSelected([...paginatedResults]);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedResults = results.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (!results || results.length === 0) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Realice una búsqueda para ver los resultados
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Seleccione los archivos que desea descargar
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={selected.length === paginatedResults.length}
              onChange={handleSelectAll}
              color="primary"
            />
          }
          label={<Typography variant="subtitle2">Seleccionar todo</Typography>}
          sx={{
            display: "flex",
            width: "100%",
            paddingLeft: "10px",
          }}
        />

        <Divider sx={{ my: 2, marginTop: 0, marginBottom: 0, padding: 0 }} />

        {paginatedResults.map((item) => (
          <FormControlLabel
            key={item.nombre}
            control={
              <Checkbox
                checked={selected.some(
                  (selectedItem) => selectedItem.nombre === item.nombre
                )}
                onChange={(event) => handleChange(event, item)}
                name={item.nombre}
                color="primary"
              />
            }
            label={
              <div css={useStyles.itemLabelStyles}>
                <Typography variant="subtitle2">
                  <strong>Nombre:</strong> {item.nombre}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Institución:</strong> {item.institucion}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Fecha de publicación:</strong>{" "}
                  {formatDate(item.fecha_creacion)}
                </Typography>
              </div>
            }
            sx={{
              display: "flex",
              width: "100%",
              padding: "10px",
            }}
            labelPlacement="end"
          />
        ))}
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end"}}>
        <Button variant="contained" onClick={handleDownloadRoutes}>
          Descargar
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Grid>
      {isLoading > 0 && (
        <Box css={useStyles.overlay}>
          <LoadingSpinner />
        </Box>
      )}
    </Grid>
  );
}
