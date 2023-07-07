/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import LogOutButton from "../components/Admin/LogOut";

const useStyles = {
  logo: css`
    font-weight: bold;
    font-size: 1.5rem;
  `,
  toolbar: css`
    justify-content: flex-end;
  `,
};

export default function Navbar({ transparent, adminPanel }) {
  const navigate = useNavigate();

  // Maneja el evento de clic para redirigir a la página de inicio
  const handleClick = () => {
    navigate("/home");
  };

  // Maneja el evento de clic para redirigir a la página "joinus"
  const handleClick2 = () => {
    navigate("/joinus");
    console.log("Navigate to join us page");
  };

  return (
    <AppBar
      position="static"
      style={{
        background: transparent ? "transparent" : "#151515",
        boxShadow: "none",
      }}
    >
      <Toolbar css={useStyles.toolbar}>
        <Button color="inherit" onClick={handleClick} css={useStyles.logo}>
          Chile3D
        </Button>
        <div style={{ flexGrow: 1 }} />
        {adminPanel ? (
          <div>
            <LogOutButton />
          </div>
        ) : (
          <>
            {/* <Button color="inherit">Sobre nosotros</Button>
            <Button color="inherit">Contacto</Button> */}
            <Button color="inherit" onClick={handleClick2}>Se parte</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}