/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";
import { TextField, Typography, Button, Card } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import FilesTable from "./FilesTable";

const initialFormData = [
  {
    id: "6398c23568f07ac4e04f770d",
    admin_id: 1,
    nombre: "Dem Isla de pascua 4m.tif",
    descripcion: "descripcion",
    extension: "tif",
    espg: "32712",
    fecha_creacion: "2022-12-13T18:19:33.756000",
    fecha_modificacion: "2022-12-13T18:19:33.756000",
    minx: -109.4498057067768,
    miny: -27.197644231758836,
    maxx: -109.22831859292681,
    maxy: -27.052843561622275,
    url: "storage/tiff/Dem Isla de pascua 4m.tif",
    keyword: "keyword",
    topic_category: "topic_category",
    institucion: "institucion",
    cantidad_descargas: 0,
  },
  {
    id: "6398c23d68f07ac4e04f7713",
    admin_id: 1,
    nombre: "copiapo_1_transparent_mosaic_group1.tif",
    descripcion: "descripcion",
    extension: "tif",
    espg: "32719",
    fecha_creacion: "2022-12-13T18:19:33.882000",
    fecha_modificacion: "2022-12-13T18:19:33.882000",
    minx: -70.32386766695028,
    miny: -27.356343554004784,
    maxx: -70.31280790449631,
    maxy: -27.348754537265055,
    url: "storage/tiff/copiapo_1_transparent_mosaic_group1.tif",
    keyword: "keyword",
    topic_category: "topic_category",
    institucion: "institucion",
    cantidad_descargas: 0,
  },
];

export default function EditFiles() {
  const useStyles = {
    root: css`
      flex-grow: 1;
      display: flex;
      padding: 0;
    `,
    tabbar: css`
      border-right: 1px solid #ccc;
      height: 100%;
      width: 250px;
      background: #6e6e6e;
      align-items: center;
    `,
    tab: css`
      background: #fff;
    `,
    card: css`
      padding: 20px;
    `,
    content: css`
      width: 100%;
      height: 100%;
    `,
  };

  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filesData, setFilesData] = useState(initialFormData);

  const handleEditFile = (updatedFile) => {
    const updatedFilesData = filesData.map((file) =>
      file.id === updatedFile.id ? updatedFile : file
    );
    setFilesData(updatedFilesData);
  };
  

  

  const handleSearch = () => {
    const resultFiles = filesData.filter((file) =>
      file.nombre.includes(searchValue)
    );
    setSearchResult(resultFiles);
  };

  return (
    <Grid container spacing={2} css={useStyles.tab}>
      <Grid item xs={12}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Editar archivos
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card css={useStyles.card}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
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
            <Grid item xs={8}>
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
          </Grid>
          {searchResult.length > 0 && (
            <FilesTable
              files={searchResult}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  );
}
