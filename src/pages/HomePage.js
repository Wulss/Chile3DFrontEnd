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
import { Paper } from "@mui/material";
import { css } from "@emotion/react";
import chile_wp from "../assets/images/chile_wp.jpg";
import Navbar from "../components/Navbar";
import natural_disaster from "../assets/images/natural_disaster.jpeg";
import planificacion_urbana1 from "../assets/images/planificacion_urbana1.png";
import recurso_natural from "../assets/images/recurso_natural.jpeg";

// Estilos CSS definidos utilizando Emotion CSS-in-JS
const useStyles = {
  root: css`
    display: flex;
    flex-direction: column;
    height: 100%;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  button: css`
    background-color: #151515;
    color: #fff;
    font-weight: bold;
    padding: 1rem 2rem;
    margin-top: 57vh;
    margin-left: auto;
    margin-right: auto;
    display: block;
    max-width: 300px;
  `,
  gridContainer: css`
    flex: 1;
    width: 100%;
  `,
  div1: css`
    background-color: #151515;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  `,

  div1Text: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  `,
  div3: css`
    background-color: #1776d1;
    height: 256px;
    color: #fff;
    width: 100%;
  `,
  div3Text: css`
    font-weight: bold;
    padding: 2rem;
    text-align: center;
  `,
  button2: css`
    background-color: #151515;
    color: #fff;
    font-weight: bold;
    padding: 1rem 2rem;
    margin: 0 auto;
    margin-bottom: 2rem;
    display: block;
    max-width: 300px;
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
  image: css`
    width: 90%;
    border-radius: 4px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    max-height: 300px;
  `,
  paper: css`
    max-width: 100%;
    `,
  paper_title: css`
    padding: 1rem;
    padding-bottom: 0;
    font-weight: bold;
  `,
  paper_text: css`
    padding: 1rem;
    font-size: 1.1rem;
  `,
  paperContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 100%;
    height: 100%;
  `,
};

export default function HomePage() {
  const navigate = useNavigate();

  // Funciones para manejar la navegacion con los botones
  const handleClick = () => {
    navigate("/search");
    console.log("Navigate to search page");
  };
  const handleClick2 = () => {
    navigate("/joinus");
    console.log("Navigate to join us page");
  };

  return (
    <div css={useStyles.root}>
      {/* Componente Navbar */}
      <Navbar transparent={true} />

      {/* Fondo */}
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

      {/* Contenido principal */}
      <Box sx={{ height: "calc(100vh - 40px)" }}>
        {" "}
        {/* -64 px of appbar and +24 mui */}
        <Typography variant="h1" align="center" css={useStyles.title}>
          Servicio de datos de alta resolución
        </Typography>

        {/* Botón Obtener datos */}
        <Button
          variant="contained"
          css={useStyles.button}
          onClick={handleClick}
        >
          Obtener datos
        </Button>
      </Box>

      {/* Contenedor de cuadrícula */}
      <div css={useStyles.gridContainer}>
        <Grid container spacing={4} direction={"column"}>
          {/* Primer Div  */}
          <Grid item xs={1} css={useStyles.div1}>
            <Grid container direction={"row"}>
              <Grid item xs={12} sm={6} css={useStyles.div1Text}>
                <Box p={4}>
                  <Typography variant="h4">
                    Los datos altimétricos son fundamentales para comprender y
                    analizar la topografía y elevación del terreno, lo que es
                    crucial para diversas disciplinas.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} css={useStyles.div1Text}>
                <Box p={4}>
                  <Typography variant="body2" sx={{ fontSize: "1.5rem" }}>
                    Chile3D proporciona una solución integral al ofrecer acceso
                    a una amplia gama de datos altimétricos de alta calidad y
                    actualizados para todo el territorio chileno.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Segundo Div  */}
          <Grid item xs={12} sm={12} md={4} sx={{marginBottom:"6rem"}}>
            <Typography
              variant="h3"
              align="center"
              sx={{ marginBottom: "2rem" }}
              fontWeight="bold"
            >
              Distintos tipos de uso
            </Typography>

            {/* Cuadrícula para las aplicaciones */}
            <Grid container spacing={8} justifyContent={"center"}>

              {/* Aplicación 1 */}
              <Grid item xs={12} sm={4} md={4}>
                <Paper css={useStyles.paperContainer} >
                  <img
                    src={natural_disaster}
                    alt="natural_disaster"
                    css={useStyles.image}
                  />
                  <Typography variant="h5" css={useStyles.paper_title}>
                    Desastres Naturales: Comprende y Mitiga los Riesgos
                  </Typography>
                  <Typography variant="body2" css={useStyles.paper_text}>
                    La información geoespacial precisa es esencial para
                    comprender y mitigar los riesgos asociados a desastres
                    naturales. Con Chile3D, puedes acceder a datos detallados
                    sobre terrenos, pendientes y cuencas hidrográficas, lo que
                    te permite evaluar áreas propensas a inundaciones,
                    deslizamientos de tierra u otros eventos peligrosos.
                  </Typography>
                </Paper>
              </Grid>

              {/* Aplicación 2 */}
              <Grid item xs={12} sm={4} md={4}>
                <Paper css={useStyles.paperContainer}>
                  <img
                    src={planificacion_urbana1}
                    alt="planificacion_urbana"
                    css={useStyles.image}
                  />
                  <Typography variant="h5" css={useStyles.paper_title}>
                    Planificación Urbana: Diseña Ciudades Sostenibles
                  </Typography>
                  <Typography variant="body2" css={useStyles.paper_text}>
                    La planificación urbana eficiente requiere información
                    precisa sobre el terreno y la topografía. Con Chile3D,
                    puedes explorar y analizar datos geoespaciales detallados
                    para evaluar áreas adecuadas para el desarrollo urbano,
                    identificar riesgos ambientales y optimizar el diseño de
                    infraestructuras.
                  </Typography>
                </Paper>
              </Grid>

              {/* Aplicación 3 */}
              <Grid item xs={12} sm={4} md={4}>
                <Paper css={useStyles.paperContainer}>
                  <img
                    src={recurso_natural}
                    alt="recurso_natural"
                    css={useStyles.image}
                  />
                  <Typography variant="h5" css={useStyles.paper_title}>
                    Recursos Naturales: Gestión Inteligente y Sostenible
                  </Typography>
                  <Typography variant="body2" css={useStyles.paper_text}>
                    Los recursos naturales son vitales para el desarrollo
                    económico y la preservación del medio ambiente. Con Chile3D,
                    puedes acceder a datos geoespaciales detallados sobre la
                    topografía y la vegetación, lo que te permite identificar
                    áreas de alto valor ecológico, evaluar el impacto de
                    actividades humanas y planificar la gestión sostenible de
                    los recursos naturales.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Tercer Div  */}
          <Grid item xs={12} css={useStyles.div3}>
            <Box p={2}>
              <Typography variant="h4" align="center" css={useStyles.div3Text}>
                ¿Tienes datos altimétricos que quieres aportar?
              </Typography>
              <Button
                variant="contained"
                css={useStyles.button2}
                onClick={handleClick2}
              >
                Subir datos
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>

      {/* Footer */}
      <footer css={useStyles.footer}>
        <Typography variant="h5">Chile3D</Typography>
        {/* <div css={useStyles.icons}>
          <FacebookIcon color="white" />
          <InstagramIcon color="white" />
          <MailIcon color="white" />
        </div> */}
      </footer>
    </div>
  );
}
