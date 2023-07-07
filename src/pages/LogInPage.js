import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/api";

export default function LogInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      {/* Contenedor principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        
        {/* Título */}
        <Typography component="h1" variant="h5">
          Iniciar sesión en Chile3D
        </Typography>
        
        {/* Formulario */}
        <Box sx={{ mt: 1 }}>
          
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          
          {/* Campo de texto: Contraseña */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          
          {/* Checkbox: Recordarme */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordarme"
          />
          
          {/* Botón Iniciar sesión */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              handleLogin(email, password, navigate);
              console.log("Login button clicked");
            }}
          >
            Iniciar sesión
          </Button>
          
          {/* Enlaces adicionales */}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                ¿No tienes una cuenta? Contáctanos
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
