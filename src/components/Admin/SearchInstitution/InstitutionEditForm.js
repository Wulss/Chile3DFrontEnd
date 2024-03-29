/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
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
import { editInstitution } from "../../../services/api";

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

export default function InstitutionEditorForm({
  institution,
  onSave,
  onClose,
  open,
}) {

  // Definición de los campos del formulario
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    sitio_web: "",
    email: "",
    telefono: "",
    direccion: "",
    area_trabajo: "",
    tipo_institucion: "",
  });

  useEffect(() => {
    if (institution) {
      setFormData({
        id: institution.id,
        nombre: institution.nombre,
        descripcion: institution.descripcion,
        sitio_web: institution.sitio_web,
        email: institution.email,
        telefono: institution.telefono,
        direccion: institution.direccion,
        area_trabajo: institution.area_trabajo,
        tipo_institucion: institution.tipo_institucion,
      });
    }
  }, [institution]);

  // Manejador de cambio de entrada en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejador de guardado de los cambios realizados en la institución
  const handleSave = () => {
    editInstitution(institution.id, formData);
    onSave(formData);
    onClose();
  };

  // Manejador de cierre del diálogo de edición de institución
  const handleClose = () => {
    // Comprobar si hay cambios sin guardar antes de cerrar
    if (hasUnsavedChanges()) {
      const confirmDiscardChanges = window.confirm(
        "Hay cambios sin guardar. ¿Estás seguro de que deseas cerrar sin guardar?"
      );
      if (!confirmDiscardChanges) {
        return;
      }
    }

    // Restablecer el formulario con los valores originales de la institución
    setFormData({
      nombre: institution.nombre,
      descripcion: institution.descripcion,
      sitio_web: institution.sitio_web,
      email: institution.email,
      telefono: institution.telefono,
      direccion: institution.direccion,
      area_trabajo: institution.area_trabajo,
      tipo_institucion: institution.tipo_institucion,
    });
    onClose();
  };

  const hasUnsavedChanges = () => {
    return (
      formData.nombre !== institution.nombre ||
      formData.descripcion !== institution.descripcion ||
      formData.sitio_web !== institution.sitio_web ||
      formData.email !== institution.email ||
      formData.telefono !== institution.telefono ||
      formData.direccion !== institution.direccion ||
      formData.area_trabajo !== institution.area_trabajo ||
      formData.tipo_institucion !== institution.tipo_institucion
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Editar Institución</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edite los campos que desea cambiar
        </DialogContentText>
        <form css={useStyles.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Campos de texto para la edición de los datos de la institución */}
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
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
