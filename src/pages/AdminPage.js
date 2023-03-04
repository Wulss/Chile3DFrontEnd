/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { css } from "@emotion/react";
import AdminTabs from "../components/AdminTabs";
import { useNavigate } from "react-router-dom";

const useStyles = {
  root: css`
    flex-grow: 1;
    position: relative;
  `,
  logo: css`
    font-weight: bold;
    font-size: 1.5rem;
    color: #ffffff;
  `,
  toolbar: css`
    justify-content: flex-end;
  `,
  tabbar: css`
    background: #6e6e6e;
    color: #ffffff;
  `,
};

export default function AdminPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  return (
    <div css={useStyles.root}>
      <AppBar
        position="static"
        style={{ background: "#151515", boxShadow: "none" }}
      >
        <Toolbar css={useStyles.toolbar}>
            <Button  css={useStyles.logo} onClick={handleClick}>
              Chile3D
            </Button>
          <div style={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <AdminTabs />
      {/* <Grid container >
        <Grid item xs>
            <Box sx={{ bgcolor: "#6E6E6E", color: 'primary.contrastText', height: '100vh' }}>
                <Grid container >
                    <AdminTabs/>

                </Grid>
            </Box>
        </Grid>

      </Grid> */}
    </div>
  );
}
