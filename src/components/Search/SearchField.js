/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";

import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider, Date } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { css } from "@emotion/react";

import { getFilesByText } from "../../services/api";

export default function SearchField({ handleResults }) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [institution, setInstitution] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //const [dateFilter, setDateFilter] = useState("");

  // Función para manejar la búsqueda
  const handleSearch = () => {
    const formattedStartDate = startDate ? format(startDate, "yyyy-MM-dd") : "";
    const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : "";

    const params = {
      searchValue,
      fileExtension,
      institution,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      //dateFilter,
    };

    console.log(params);

    getFilesByText(params).then((response) => {
      handleResults(response);
    });

    console.log("params are ");
    console.log(params);

    console.log("searchValue is ");
    console.log(searchValue);
  };

  // Función para manejar el cambio de filtro
  const handleFilterChange = (event) => {
    const filter = event.target.value;

    setSelectedFilter(filter);

    if (filter === "fecha") {
      setStartDate(null);
      setEndDate(null);
      //setDateFilter("");
    }
  };

  // const handleDateFilterChange = (event) => {
  //   setDateFilter(event.target.value);
  // };

  return (
    <div>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12}>
          <Typography variant="h7">Búsqueda por archivos</Typography>
        </Grid>

        {/* Campo de texto para ingresar la busqueda por texto */}
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-search"
            label="Ingrese el nombre del archivo"
            type="search"
            variant="outlined"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Grid>

        {/* Selector de filtro */}
        <Grid item xs={12} sm={6} style={{ maxWidth: "16rem" }}>
          <TextField
            fullWidth
            label="Filtro"
            select
            value={selectedFilter}
            onChange={handleFilterChange}
            variant="outlined"
            SelectProps={{
              MenuProps: {
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
              },
            }}
          >
            <MenuItem value="sin filtro">Sin filtro</MenuItem>
            <MenuItem value="extension">Por extensión de archivo</MenuItem>
            <MenuItem value="institucion">Por institución</MenuItem>
            <MenuItem value="fecha">Por fecha</MenuItem>
          </TextField>
        </Grid>

        {/* Mostrar campo de texto para la extensión de archivo si el filtro seleccionado es "extension" */}
        {selectedFilter === "extension" && (
          <Grid item xs={12} sm={6}>
            <TextField
              id="file-extension"
              label="Extensión de archivo"
              variant="outlined"
              value={fileExtension}
              onChange={(e) => setFileExtension(e.target.value)}
              fullWidth
              sx={{ maxWidth: "15rem" }}
            />
          </Grid>
        )}

        {/* Mostrar campo de texto para la institución si el filtro seleccionado es "institucion" */}
        {selectedFilter === "institucion" && (
          <Grid item xs={12} sm={6}>
            <TextField
              id="institution"
              label="Institución"
              variant="outlined"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              fullWidth
              sx={{ maxWidth: "15rem" }}
            />
          </Grid>
        )}

        {/* Mostrar selección de fecha si el filtro seleccionado es "fecha" */}
        {selectedFilter === "fecha" && (<Grid item xs={12} sm={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha de inicio"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                  fullWidth
                  inputFormat="yyyy/MM/dd"
                  css={datePickerStyles}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Fecha de fin"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                  fullWidth
                  inputFormat="yyyy/MM/dd"
                  css={datePickerStyles}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>)}
        
        {/* Utilizar lo siguiente si se quieren manejar distintos tipos de filtros de fecha */}

        {/* {selectedFilter === "fecha" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ maxWidth: "15rem" }}>
              <InputLabel id="date-filter-label">Filtro de fecha</InputLabel>
              <Select
                labelId="date-filter-label"
                id="date-filter-select"
                value={dateFilter}
                onChange={handleDateFilterChange}
              >
                <MenuItem value="">Seleccionar filtro</MenuItem>
                <MenuItem value="ultima-modificacion">
                  Última modificación
                </MenuItem>
                <MenuItem value="fecha-publicacion">
                  Fecha de publicación
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        {selectedFilter === "fecha" && dateFilter && (
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha de inicio"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    inputFormat="yyyy/MM/dd"
                    css={datePickerStyles}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha de fin"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    renderInput={(params) => <TextField {...params} />}
                    fullWidth
                    inputFormat="yyyy/MM/dd"
                    css={datePickerStyles}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
        )} */}

        {/* Mostrar filtros aplicados */}
        <Grid item xs={12}>
          <Typography variant="h8" component="div">
            Filtros aplicados
          </Typography>
        </Grid>

        {fileExtension && (
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <Chip
                label={`Extensión: ${fileExtension}`}
                onDelete={() => setFileExtension("")}
              />
            </Box>
          </Grid>
        )}
        {institution && (
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <Chip
                label={`Institución: ${institution}`}
                onDelete={() => setInstitution("")}
              />
            </Box>
          </Grid>
        )}
        {/* {dateFilter && (
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <Chip
                label={`Filtro de fecha: ${dateFilter}`}
                onDelete={() => setDateFilter("")}
              />
            </Box>
          </Grid>
        )} */}
        {startDate && (
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <Chip
                label={`Fecha de inicio: ${format(startDate, "yyyy-MM-dd")}`}
                onDelete={() => setStartDate("")}
              />
            </Box>
          </Grid>
        )}
        {endDate && (
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <Chip
                label={`Fecha de fin: ${format(endDate, "yyyy-MM-dd")}`}
                onDelete={() => setEndDate("")}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

const datePickerStyles = css`
  margin-top: 16px;
`;
