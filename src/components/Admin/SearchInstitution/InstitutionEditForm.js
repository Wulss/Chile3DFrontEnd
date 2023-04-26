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

export default function InstitutionEditorForm({ institution }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: institution.nombre,
    descripcion: institution.descripcion,
    sitio_web: institution.sitio_web,
    email: institution.email,
    telefono: institution.telefono,
    direccion: institution.direccion,
    area_trabajo: institution.area_trabajo,
    tipo_institucion: institution.tipo_institucion,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //onSubmit(formData);
  };

  return (
    <form css={useStyles.formContainer} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <TextField
            css={useStyles.textfield}
            label="Nombre"
            variant="outlined"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            css={useStyles.textfield}
            label="Descripción"
            variant="outlined"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            css={useStyles.textfield}
            label="Sitio Web"
            variant="outlined"
            name="sitio_web"
            value={formData.sitio_web}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            css={useStyles.textfield}
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            css={useStyles.textfield}
            label="Teléfono"
            variant="outlined"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            css={useStyles.textfield}
            label="Dirección"
            variant="outlined"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            css={useStyles.textfield}
            label="Área de trabajo"
            variant="outlined"
            name="area_trabajo"
            value={formData.area_trabajo}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            css={useStyles.textfield}
            label="Tipo de institución"
            variant="outlined"
            name="tipo_institucion"
            value={formData.tipo_institucion}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>
    </form>
  );
}
