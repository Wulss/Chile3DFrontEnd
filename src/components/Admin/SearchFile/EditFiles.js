/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import { TextField, Typography, Button, Card } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import FilesTable from "./FilesTable";
import { getFilesByText } from "../../../services/api";

export default function EditFiles() {
  const useStyles = {
    root: css`
      flex-grow: 1;
      display: flex;
      padding: 0;
    `,
    tabbar: css`
      border-right: 1px solid #ccc;
      height: 100%;
      width: 250px;
      background: #6e6e6e;
      align-items: center;
    `,
    tab: css`
      background: #fff;
    `,
    card: css`
      padding: 20px;
    `,
    content: css`
      width: 100%;
      height: 100%;
    `,
  };

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [showNoFilesMessage, setShowNoFilesMessage] = useState(false);

  const params = {
    searchValue,
    fileExtension: "",
    institution: "",
    startDate: "",
    endDate: "",
    dateFilter: "",
  };

  const handleSearch = () => {
    // Maneja la búsqueda de archivos utilizando la función `getFilesByText` del servicio `api`
    setShowNoFilesMessage(false);
    getFilesByText(params)
      .then((response) => {
        setSearchResult(response);
        setFilesData(response);

        if (response.length === 0) {
          setShowNoFilesMessage(true);
        }
      })
      .catch((error) => {
        console.log("the error is ");
        console.log(error);
      });
  };

  const handleEditFile = (editedFile) => {
    // Maneja la edición de un archivo actualizando los datos del archivo
    setFilesData((prevFilesData) =>
      prevFilesData.map((file) => {
        if (file.id === editedFile.id) {
          return editedFile;
        }

        return file;
      })
    );
  };

  const handleDeleteFile = (fileId) => {
    // Maneja la eliminación de un archivo
    setFilesData((prevFilesData) =>
      prevFilesData.filter((file) => file.id !== fileId)
    );
  };

  return (
    <Grid container  css={useStyles.tab}>
      <Grid item xs={12}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Editar archivos
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card css={useStyles.card}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              {/* Campo de texto de búsqueda */}
              <TextField
                id="outlined-search"
                label="Ingrese el nombre del archivo"
                type="search"
                variant="outlined"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
          {showNoFilesMessage ? (
            <Typography variant="body2" component="div">
              No se encontraron archivos para la búsqueda.
            </Typography>
          ) : (
            searchResult.length > 0 && (
              <FilesTable
                files={filesData}
                onEditFile={handleEditFile}
                onDeleteFile={handleDeleteFile}
              />
            )
          )}
        </Card>
      </Grid>
    </Grid>
  );
}