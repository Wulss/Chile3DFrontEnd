import React, { useState } from "react";
import Draw from "ol/interaction/Draw";
import { Button } from "@mui/material";
import VectorSource from "ol/source/Vector";

export default function DrawButton({ habilitarDibujo }) {
  const [dibujoHabilitado, setDibujoHabilitado] = useState(false);

  const toggleDibujo = () => {
    setDibujoHabilitado(!dibujoHabilitado);
    habilitarDibujo(!dibujoHabilitado);
  };

  return (
    <Button  onClick={toggleDibujo}>
      {dibujoHabilitado ? "Deshabilitar Dibujo" : "Habilitar Dibujo"}
    </Button >
  );
}
