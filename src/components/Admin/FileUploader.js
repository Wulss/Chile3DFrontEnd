/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState, useCallback, useContext } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Paper, Divider, Typography, Snackbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import { css } from "@emotion/react";
import { DROP } from "ol/structs/PriorityQueue";
import { uploadFiles } from "../../services/api";
import LoadingSpinner from "../LoadingSpinner";
import { SnackbarContext } from "../SnackbarProvider";

const useStyles = {
  uploadContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  paper: css`
    border-radius: 16px;
    margin-bottom: 16px;
    align-items: center;
    justify-content: center;
  `,
  divider: css`
    margin: 0;
  `,
  dropzoneContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    background: #f5f5f5;
    height: 25vh;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  `,
  dropzone: css`
    display: flex;
    height: 10vh;
    width: 60vw;
    border: 2px dashed #e2e6ea;
    border-radius: 24px;
    justify-content: center;
    padding: 20px;
    text-align: center;
    align-items: center;
    cursor: pointer;
    color: #6e6e6e;
  `,
};

export default function FileUploader() {
  const { showSnackbar } = useContext(SnackbarContext);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar el evento de soltar archivos en el área de Dropzone
  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        setIsLoading(true);

        const filteredFiles = acceptedFiles.filter(file => {
          const fileExtension = file.name.split(".").pop().toLowerCase();
          return fileExtension === "laz" || fileExtension === "las" || fileExtension === "tif";
        });

        if (filteredFiles.length === 0) {
          setIsLoading(false);
          showSnackbar("Solo se permiten archivos .laz, .las y .tif", "error");
          return;
        }

        await uploadFiles(filteredFiles);
        setFiles([...files, ...acceptedFiles]);
        setIsLoading(false);
        showSnackbar("Archivos subidos correctamente");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        showSnackbar("Error al subir los archivos", "error");
      }
    },
    [files, showSnackbar]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Grid item xs={12}>
      <Paper css={useStyles.paper}>
        <Typography variant="h6" sx={{ marginLeft: "20px" }}>
          Agregar nuevos archivos
        </Typography>
        <Divider css={useStyles.divider} />
        <div css={useStyles.dropzoneContainer}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div {...getRootProps()} css={useStyles.dropzone}>
              <input {...getInputProps()} />
              <p>
                Arraste y suelte los archivos aquí o haga clic para seleccionar
                archivos
              </p>
            </div>
          )}
        </div>
      </Paper>
    </Grid>
  );
}
