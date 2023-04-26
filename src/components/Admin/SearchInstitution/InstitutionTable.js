/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
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
import InstitutionEditorForm from "./InstitutionEditForm";

const useStyles = {
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

export default function InstitutionsTable({ institutions }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Grid container sx={{ overflowX: "auto", maxWidth: "80vw" }}>
      <Grid item xs={12}>
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
            {institutions.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} css={useStyles.cell}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleOpen}>Edit</MenuItem>
                      <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <Dialog
                  key={`dialog-${row.id}`}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Editar institución
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Para editar este institución, por favor ingrese la información
                      que desee cambiar.
                    </DialogContentText>
                    <InstitutionEditorForm institution={row} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleClose}
                      color="primary"
                      variant="contained"
                    >
                      Guardar
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}
