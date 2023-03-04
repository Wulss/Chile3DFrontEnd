import React from "react";
import { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import {FormControlLabel, Checkbox} from "@mui/material";

import SearchMap from "./SearchMap/SearchMap";
import DrawButton from "./SearchMap/DrawButton";
import ClearButton from "./SearchMap/ClearButton";

export default function ResultsTab({results}) {
  const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    if (event.target.checked) {
      console.log(event.target.name);
      setSelected([...selected, event.target.name]);
    }
    else {
      setSelected(selected.filter((item) => item !== event.target.name));
    }
  };


  if (results == null) {
    return (
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h6" gutterBottom>
            Realice busqueda para ver resultados
          </Typography>
        </Grid>
      </Grid>
    );
  }

  else {
    return (
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h6" gutterBottom>
            Seleccione los archivos que desea descargar
          </Typography>
            {results.map((option) => (
              <FormControlLabel key={option} control={<Checkbox onChange={handleChange} name={option}/>} label={option} />
            ))}
          <Button variant="contained" onClick={()=> console.log(selected)} > Descargar</Button>
        </Grid>
      </Grid>
    );
  }
}
