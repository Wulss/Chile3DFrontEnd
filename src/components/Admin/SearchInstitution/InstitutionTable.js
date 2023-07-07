/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { css } from "@emotion/react";
import InstitutionEditorForm from "./InstitutionEditForm";
import { deleteInstitution } from "../../../services/api";
import { SnackbarContext } from "../../SnackbarProvider";

const useStyles = {
  tableContainer: css`
    width: 100%;
    margin-top: 16px;
    max-height: 60vh;
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
    max-width: 100px;
  `,
  cell: css`
    text-align: left;
    padding: 16px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  `,
};

// Definición de las columnas de la tabla
const columns = [
  { id: "nombre", label: "Nombre", minWidth: 170 },
  { id: "descripcion", label: "Descripción", minWidth: 100 },
  { id: "sitio_web", label: "Sitio Web", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "telefono", label: "Teléfono", minWidth: 170 },
  { id: "direccion", label: "Dirección", minWidth: 170 },
  { id: "area_trabajo", label: "Área de trabajo", minWidth: 170 },
  { id: "tipo_institucion", label: "Tipo de institución", minWidth: 170 },
  { id: "acciones", minWidth: 170 },
];

// Componente que muestra la tabla de instituciones
export default function InstitutionsTable({
  institutions,
  onEditInstitution,
  onDeleteInstitution,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [openDialogs, setOpenDialogs] = useState({});
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [institutionToDelete, setInstitutionToDelete] = useState(null);

  const { showSnackbar } = useContext(SnackbarContext);

  const handleClickEdit = (event, institution) => {
    setSelectedInstitution(institution);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Manejador de evento para editar una institución
  const handleEditInstitution = (editedInstitution) => {
    console.log("editedInstitution", editedInstitution);
    onEditInstitution(editedInstitution);
    setSelectedInstitution(null);
    handleCloseDialog(editedInstitution.id);
  };

  // Manejador de evento para eliminar una institución
  const handleDeleteInstitution = (institutionId) => {
    setInstitutionToDelete(institutionId);
    setConfirmDeleteDialogOpen(true);
  };

  // Manejador de evento para confirmar la eliminación de una institución
  const handleConfirmDelete = () => {
    deleteInstitution(institutionToDelete);
    onDeleteInstitution(institutionToDelete);
    showSnackbar("Institución eliminada correctamente", "success");
    setConfirmDeleteDialogOpen(false);
  };


  const handleCancelDelete = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const handleOpenDialog = (institutionId) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [institutionId]: true,
    }));
  };

  const handleCloseDialog = (institutionId) => {
    setOpenDialogs((prevState) => ({
      ...prevState,
      [institutionId]: false,
    }));
  };

  return (
    <Grid container sx={{ overflowX: "auto", maxWidth: "80vw"}}>
      <Grid item xs={12}>
        <TableContainer component={Paper} css={useStyles.tableContainer}>
          <Table aria-label="sticky table">
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
              {/* Filas de datos */}
              {institutions.map((institution) => (
                <TableRow key={institution.id}>
                  {/* Celdas de datos */}
                  {columns.map((column) => (
                    <TableCell key={column.id} css={useStyles.cell}>
                      {institution[column.id]}
                    </TableCell>
                  ))}
                  {/* Celda de acciones */}
                  <TableCell>
                    <IconButton
                      onClick={(event) => handleClickEdit(event, institution)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    {/* Menú de opciones de edición */}
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      {/* Opción de edición */}
                      <MenuItem
                        onClick={() => {
                          handleOpenDialog(institution.id);
                          handleCloseMenu();
                        }}
                      >
                        Editar
                      </MenuItem>
                      {/* Opción de eliminación */}
                      <MenuItem
                        onClick={() => {
                          handleDeleteInstitution(institution.id);
                          handleCloseDialog(institution.id);
                          handleCloseMenu();
                        }}
                      >
                        Eliminar
                      </MenuItem>
                    </Menu>
                    {/* Formulario de edición de institución */}
                    <InstitutionEditorForm
                      institution={selectedInstitution}
                      onSave={handleEditInstitution}
                      open={openDialogs[institution.id] || false}
                      onClose={() => handleCloseDialog(institution.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que quieres eliminar esta institución?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
