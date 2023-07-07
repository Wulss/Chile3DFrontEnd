/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
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
import { editFile } from "../../../services/api";
import { SnackbarContext } from "../../SnackbarProvider";

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

// Componente que muestra un formulario para editar un archivo
export default function FileEditorForm({ file, onSave, onClose, open }) {
  // Definición de los campos del formulario
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    keyword: "",
    topic_category: "",
    institucion: "",
  });

  const { showSnackbar } = React.useContext(SnackbarContext);

  useEffect(() => {
    if (file) {
      setFormData({
        id: file.id,
        nombre: file.nombre,
        descripcion: file.descripcion,
        keyword: file.keyword,
        topic_category: file.topic_category,
        institucion: file.institucion,
      });
    }
  }, [file]);

  // Manejador de cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejador de guardado de cambios en el formulario
  const handleSave = () => {
    editFile(file.id, formData);
    onSave(formData);
    showSnackbar("Archivo editado exitosamente");

    onClose();
  };

  // Manejador de cierre del diálogo de edición de institución
  const handleClose = () => {
    if (hasUnsavedChanges()) {
      if (window.confirm("¿Desea salir sin guardar los cambios?")) {
        onClose();
      }
      return;
    }

    setFormData({
      nombre: file.nombre,
      descripcion: file.descripcion,
      keyword: file.keyword,
      topic_category: file.topic_category,
      institucion: file.institucion,
    });
    onClose();
  };

  const hasUnsavedChanges = () => {
    return (
      formData.nombre !== file.nombre ||
      formData.descripcion !== file.descripcion ||
      formData.keyword !== file.keyword ||
      formData.topic_category !== file.topic_category ||
      formData.institucion !== file.institucion
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar archivo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edite los campos que desea cambiar
        </DialogContentText>
        {/* Formulario de edición de institución */}
        <form css={useStyles.formContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Palabra clave"
                name="keyword"
                value={formData.keyword}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Categoría de tema"
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
