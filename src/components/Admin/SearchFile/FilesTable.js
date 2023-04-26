/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
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
  { id: "topic_category", label: "Topic Category", minWidth: 170 },
  { id: "institucion", label: "Institución", minWidth: 170 },
  { id: "acciones", minWidth: 170 },
];

export default function FilesTable({ files }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [tableFiles, setTableFiles] = useState(files); // [files, setFiles]
  const [selectedFile, setSelectedFile] = useState(null);


  
  const handleClick = (event, file) => {
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleFileUpdate = (file) => {
    const updatedFiles = files.map((f) => {
      if (f.id === file.id) {
        return file;
      }
      return f;
    });
    setTableFiles(updatedFiles);
    setSelectedFile( null);
    handleClose();
  };
  
  return (
    <Grid
      container
      sx={{overflow: 'auto'}}
    >
      <Grid item xs={12}>
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
            {files.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} css={useStyles.cell}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton onClick={(event) => handleClick(event, row)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClickOpen}>Edit</MenuItem>
                      <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Editar archivo
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Para editar este archivo, por favor ingrese la información
                      que desee cambiar.
                    </DialogContentText>
                    <FileEditorForm file={selectedFile} />
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