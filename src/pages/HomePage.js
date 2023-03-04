/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import * as React from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailIcon from "@mui/icons-material/Mail";
import { css } from "@emotion/react";
import chile_wp from "../assets/images/chile_wp.jpg";
import image1 from "../assets/images/image1.png";
import applications from "../assets/images/applications.png";

const useStyles = {
  root: css`
    flex-grow: 1;
    position: relative;
  `,
  logo: css`
    font-weight: bold;
    font-size: 1.5rem;
  `,
  toolbar: css`
    justify-content: flex-end;
  `,
  title: css`
    position: absolute;
    color: white;
    font-weight: bold;
    font-size: 3rem;
    text-align: center;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  button: css`
    background-color: #151515;
    color: #fff;
    font-weight: bold;
    padding: 1rem 2rem;
    margin-top: 52vh;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 20%;
  `,
  div1: css`
    background-color: #151515;
    height: "500px";
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    width: "100vw";
    padding-bottom: 4rem;
  `,
  div2: css`
    background-color: #fff;
    height: "900px";
    color: #151515;
    width: "100vw";
    padding-top: 3rem;
    padding-bottom: 2rem;
  `,
  textColumn: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 2rem;
  `,
  div3: css`
    background-color: #1776d1;
    height: "256px";
    color: #fff;
    width: "100vw";
  `,
  div3Text: css`
    font-weight: bold;
    padding: 2rem;
    left: 50%;
  `,
  button2: css`
    background-color: #151515;
    color: #fff;
    font-weight: bold;
    padding: 1rem 2rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    display: block;
    width: 20%;
  `,
  footer: css`
    background-color: #151515;
    color: #fff;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 20rem;
    justify-content: center;
  `,
  icons: css`
    "& > *": {
      margin: theme.spacing(1);
    }
  `,
};

export default function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/search");
    console.log("The button was clicked");
  };

  return (
    <div css={useStyles.root}>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar css={useStyles.toolbar}>
          <Button color="inherit"  css={useStyles.logo}>
            Chile3D
          </Button>
          <div style={{ flexGrow: 1 }} />

          <Button color="inherit">About Us</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">Be Part</Button>
        </Toolbar>
      </AppBar>
      
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2)100%), url(${chile_wp})`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
          maxWidth: "100%",
          position: "absolute",
          justifyContent: "center",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></div>
      <Box>
        <Typography variant="h1" align="center" css={useStyles.title}>
          Servicio de datos de alta resolución
        </Typography>
        <Button variant="contained" css={useStyles.button} onClick={handleClick}>
          Obtener datos
        </Button>
      </Box>
      <Grid
        container
        direction="column"
        spacing={3}
        marginTop={"calc(35vh)"}
      >
        <Grid item xs={4} css={useStyles.div1}>
          {/* First Div */}
          <Box display="flex" justifyContent="center">
            <img src={image1} alt="image1" style={{ height: "auto" }} />
          </Box>
          <Box p={2}>
            <Typography variant="h4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              gravida erat ipsum, ac ornare lacus sollicitudin eu. Phasellus
              ipsum diam, sodales non magna eget, mollis blandit quam.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} css={useStyles.div2}>
          {/* Second Div  */}
          <Box display="flex" justifyContent="center">
            <img
              src={applications}
              alt="image2"
              style={{ maxHeight: "390px", maxWidth: "100%" }}
            />
          </Box>
          <Grid container>
            <Grid item xs={6} css={useStyles.textColumn}>
              <Typography variant="h4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur gravida erat ipsum, ac ornare lacus sollicitudin eu.
                Phasellus ipsum diam, sodales non magna eget, mollis blandit
                quam.
              </Typography>
            </Grid>
            <Grid item xs={6} css={useStyles.textColumn}>
              <Typography variant="h4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur gravida erat ipsum, ac ornare lacus sollicitudin eu.
                Phasellus ipsum diam, sodales non magna eget, mollis blandit
                quam.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} css={useStyles.div3}>
          <Box p={2}>
            <Typography variant="h4" align="center" css={useStyles.div3Text}>
              ¿Tienes datos altimétricos que quieres aportar?
            </Typography>
            <Button variant="contained" css={useStyles.button2}>
              Subir datos
            </Button>
          </Box>
        </Grid>
      </Grid>

      <footer css={useStyles.footer}>
        <Typography variant="h5">Chile3D</Typography>
        <div css={useStyles.icons}>
          <FacebookIcon color="white" />
          <InstagramIcon color="white" />
          <MailIcon color="white" />
        </div>
      </footer>
    </div>
  );
}
