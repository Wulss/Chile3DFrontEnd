/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { css } from "@emotion/react";

const useStyles = {
    logo: css`
      flex-grow: 1;
      font-weight: bold;
    `,
    toolbar: css`
      justify-content: flex-end;
    `};

export default function Navbar(transparent) {
  return (
      <AppBar css={css`
      background-color: ${transparent ? "transparent" : "#151515"}`}>
        <Toolbar css={useStyles.toolbar}>
          <Typography variant="h5" css={useStyles.logo}>
            Chile3D
          </Typography>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">Be Part</Button>
        </Toolbar>
      </AppBar>
  );
}
