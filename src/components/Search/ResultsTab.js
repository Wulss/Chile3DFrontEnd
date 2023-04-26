import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { FormControlLabel, Checkbox } from "@mui/material";

import SearchMap from "../SearchMap/SearchMap";
import DrawButton from "../SearchMap/DrawButton";
import ClearButton from "../SearchMap/ClearButton";


export default function ResultsTab({ results }) {
  const [selected, setSelected] = useState([]);
  
  const handleChange = (event, item) => {
    if (event.target.checked) {
      console.log("the file is: ", item.nombre);
      setSelected([...selected, item]);
    } else {
      setSelected(selected.filter((selectedItem) => selectedItem !== item));
    }
  };

  if (results == null) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Realice busqueda para ver resultados
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container direction="column">
        <Grid item xs={11}>
          <Typography variant="h6" gutterBottom>
            Seleccione los archivos que desea descargar
          </Typography>
          {results.map((item) => (
            <FormControlLabel
              sx={{ display: "block" }}
              key={item.nombre}
              control={
                <Checkbox
                  checked={selected.some(
                    (selectedItem) => selectedItem.nombre === item.nombre
                  )}
                  onChange={(event) => handleChange(event, item)}
                  name={item.nombre}
                  color="primary"
                />
              }
              label={item.nombre}
            />
          ))}
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" onClick={() => console.log(selected)}>
            Descargar
          </Button>
        </Grid>
      </Grid>
    );
  }
}
