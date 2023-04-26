/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState, useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Paper, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { css } from "@emotion/react";
import { DROP } from "ol/structs/PriorityQueue";

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
    padding-top: 16px;
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
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
      <Grid item xs={12} >
      <Paper css={useStyles.paper}>
        <Typography variant="h6" sx={{ marginLeft: "20px" }}>
          Agregar nuevos archivos
        </Typography>
        <Divider css={useStyles.divider} />
        <div css={useStyles.dropzoneContainer}>
          <div {...getRootProps()} css={useStyles.dropzone}>
            <input {...getInputProps()} />
            <p>Arraste y suelte los archivos aquí o haga clic para seleccionar archivos</p>
          </div>
        </div>
      </Paper>
      {files.map((file, index) => (
        <p key={index}>{file.name}</p>
      ))}
    </Grid>
    
  );
}
