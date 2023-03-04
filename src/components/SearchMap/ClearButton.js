import React, { useContext, useState } from "react";
import Draw from "ol/interaction/Draw";
import { Button } from "@mui/material";
import VectorSource from "ol/source/Vector";
import { GeometryContext } from "../../pages/SearchPage";

export default function ClearButton({ clearGeometryFunction }) {
  const [dibujoHabilitado, setDibujoHabilitado] = useState(false);
  const {value, setValue} = useContext(GeometryContext);

  const toggleClear = () => {
    //clearGeometry(true);
    console.log("clear");
    console.log(value);
  };

  return (
    <div>
      <Button variant="contained" onClick={()=>console.log("a")}>
        {"Limpiar Geometría"}
      </Button>
    </div>
  );
}
