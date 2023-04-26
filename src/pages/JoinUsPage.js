import React from "react";
import { css } from "@emotion/react";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

/* const styles = {
  root: css`
    margin-top: 4rem;
    margin-bottom: 4rem;
    background-color: #f0f0f0;
    padding: 2rem;
  `,
  title: css`
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
  `,
  input: css`
    margin-bottom: 2rem;
  `,
  form: css`
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 2rem;
  `,
  fileButton: css`
    background-color: #222;
    color: #fff;
    &:hover {
      background-color: #444;
    }
  `,
  submitButton: css`
    background-color: #0077be;
    color: #fff;
    &:hover {
      background-color: #005fa3;
    }
  `,
}; */

function JoinUsPage() {
  return (
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        justifyContent: "center"
        }}
      >
      <Container maxWidth="xs">
        <Typography variant="h4" >
          Únete
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ayudanos a hacer nuestro sitio mejor al compartir tus datos altimétricos con nosotros.
        </Typography>
        <Box component="form"  >
            <TextField margin="normal" required fullWidth id="name" label="Nombre" name="name" autoComplete="name" autoFocus />
            <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth id="institution" label="Institución a la que pertenece" name="institution" autoComplete="institution" autoFocus />
            <TextField margin="normal" required fullWidth id="message" label="Mensaje" name="message" autoComplete="message" autoFocus multiline rows={4}/>   
        </Box>
        <Button variant="contained"  fullWidth>
                    Enviar
                </Button>
      </Container>
    </Box>
  );
}

export default JoinUsPage;
