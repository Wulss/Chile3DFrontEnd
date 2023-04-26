/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { css } from "@emotion/react";

const useStyles = {
  formContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  `,
  textfield: css`
    margin: 10px 0;
  `,
  buttonContainer: css`
    margin-top: 16px;
  `,
  inputContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
};

export default function FileEditorForm({ file, onEditFile }) {
  const [formData, setFormData] = useState({
    nombre: file.nombre,
    descripcion: file.descripcion,
    topic_category: file.topic_category,
    institucion: file.institucion,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };




  return (
    <form css={useStyles.formContainer} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Topic Category"
            name="topic_category"
            value={formData.topic_category}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Institution"
            name="institucion"
            value={formData.institucion}
            fullWidth
            onChange={handleInputChange}
            required
          />
        </Grid>
      </Grid>
    </form>
  );
}
