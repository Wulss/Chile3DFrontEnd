/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState, useContext} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { css } from "@emotion/react";
import FileEditorForm from "./FileEditorForm";
import { deleteFile } from "../../../services/api";
import { SnackbarContext } from "../../SnackbarProvider";

const useStyles = {
  tableContainer: css`
    width: 100%;
    margin-top: 16px;
    max-height: 330px;
  `,
  table: css`
    width: 100%;
    border-collapse: collapse;
  `,
  headerCell: css`
    font-weight: bold;
    text-align: left;
    padding: 16px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    max-width: 10px;
  `,
  cell: css`
    text-align: left;
    padding: 16px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  `,
};

// Definición de las columnas de la tabla
const columns = [
  { id: "nombre", label: "Nombre"},
  { id: "descripcion", label: "Descripción" },
  { id: "keyword", label: "Keyword" },
  { id: "topic_category", label: "Topic Category" },
  { id: "institucion", label: "Institución" },
  { id: "acciones" },
];

// Componente que muestra la tabla de archivos
export default function FilesTable({ files, onEditFile, onDeleteFile }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialogs, setOpenDialogs] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const { showSnackbar } = useContext(SnackbarContext);

  const handleClickEdit = (event, file) => {
    setSelectedFile(file);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Manejador de eventos para editar un archivo
  const handleEditFile = (editedFile) => {
    onEditFile(editedFile);
    setSelectedFile(null);
    handleCloseDialog(editedFile.id);
  };

  // Manejador de eventos para eliminar un archivo
  const handleDeleteFile = (fileId) => {
    setFileToDelete(fileId);
    setConfirmDeleteDialogOpen(true);
  };

  // Manejador de eventos para confirmar la eliminación de un archivo
  const handleConfirmDelete = () => {
    deleteFile(fileToDelete);
    onDeleteFile(fileToDelete);
    showSnackbar("Archivo eliminado correctamente", "success");
    setConfirmDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const handleOpenDialog = (fileId) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [fileId]: true,
    }));
  };

  const handleCloseDialog = (fileId) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [fileId]: false,
    }));
  };

  return (
    <Grid container >
      <Grid item xs={12}>
        <TableContainer component={Paper} css={useStyles.tableContainer}>
        <Table css={useStyles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  css={useStyles.headerCell}
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Filas de la tabla */}
            {files.map((file) => (
              <React.Fragment key={file.id}>
                <TableRow key={file.id}>
                  {/* Celdas de cada fila */}
                  {columns.map((column) => (
                    <TableCell key={column.id} css={useStyles.cell}>
                      {file[column.id]}
                    </TableCell>
                  ))}
                  {/* Celda de acciones */}
                  <TableCell>
                    <IconButton
                      onClick={(event) => handleClickEdit(event, file)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    {/* Menú desplegable de acciones */}
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem
                        onClick={() => {
                          handleOpenDialog(file.id);
                          handleCloseMenu();
                        }}
                      >
                        Editar
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDeleteFile(file.id);
                          handleCloseDialog(file.id);
                          handleCloseMenu();
                        }}
                      >
                        Eliminar
                      </MenuItem>
                    </Menu>
                    <FileEditorForm
                      file={selectedFile}
                      onSave={handleEditFile}
                      open={openDialogs[file.id] || false}
                      onClose={() => handleCloseDialog(file.id)}
                    />
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que quieres eliminar este archivo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}
