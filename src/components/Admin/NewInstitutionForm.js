/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { css } from "@emotion/react";
import { createInstitution } from "../../services/api";
import { SnackbarContext } from "../SnackbarProvider";

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

export default function NewInstitutionForm({ onClose, open, setInstitutions }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    sitio_web: "",
    email: "",
    telefono: "",
    direccion: "",
    area_trabajo: "",
    tipo_institucion: "",
  });

  const { showSnackbar } = useContext(SnackbarContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      sitio_web: "",
      email: "",
      telefono: "",
      direccion: "",
      area_trabajo: "",
      tipo_institucion: "",
    });
  };

  const handleSave = async () => {
    try {
      const response = await createInstitution(formData);
      const newInstitution = response.data;

      setInstitutions(formData);

      resetForm();
      onClose();
      showSnackbar("Institución creada exitosamente", "success");
    } catch (error) {
      showSnackbar("Error al crear la institución", "error");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Crear Institución</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingrese los siguientes campos para crear una institución
        </DialogContentText>

        {/* Formulario de creación de institución */}
        <form css={useStyles.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
