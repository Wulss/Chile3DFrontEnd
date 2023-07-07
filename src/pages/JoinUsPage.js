import React from "react";
import { css } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";

export default function JoinUsPage() {
  return (
    <>
      {/* Componente Navbar */}
      <div>
        <Navbar />
      </div>
      
      {/* Contenedor principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "calc(100vh - 64px)",
          justifyContent: "center",
        }}
      >
        {/* Contenedor con ancho máximo */}
        <Container maxWidth="xs">
          
          {/* Título */}
          <Typography variant="h4">Únete</Typography>
          
          {/* Descripción */}
          <Typography variant="body1" gutterBottom>
            Ayúdanos a mejorar nuestro sitio al compartir tus datos
            altimétricos con nosotros.
          </Typography>
          
          {/* Formulario */}
          <Box component="form">
            
            {/* Campo de texto: Nombre */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoComplete="name"
              autoFocus
            />
            
            {/* Campo de texto: Email */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            
            {/* Campo de texto: Institución */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="institution"
              label="Institución a la que pertenece"
              name="institution"
              autoComplete="institution"
              autoFocus
            />
            
            {/* Campo de texto: Mensaje */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="message"
              label="Mensaje"
              name="message"
              autoComplete="message"
              autoFocus
              multiline
              rows={4}
            />
          </Box>
          
          {/* Botón Enviar */}
          <Button variant="contained" fullWidth>
            Enviar
          </Button>
        </Container>
      </Box>
    </>
  );
}
