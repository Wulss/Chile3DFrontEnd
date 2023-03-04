/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { css } from "@emotion/react";
import TwoTabs from "../components/TwoTabs";
import { Grid } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchMap from "../components/SearchMap/SearchMap";

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
};

export const GeometryContext = createContext();

export default function SearchPage() {
  const [clearGeometry, setClearGeometry] = useState(false);
  const [results, setResults] = useState(null);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };

  const handleButtonClick = () => {
    setClearGeometry(true);
  };

  const handleResults = (updatedResults) => {
    setResults(updatedResults);
  };

  return (
    <div css={useStyles.root}>
      <AppBar
        position="static"
        style={{ background: "#151515", boxShadow: "none" }}
      >
        <Toolbar css={useStyles.toolbar}>
          <Button color="inherit"  onClick={handleClick} css={useStyles.logo}>
            Chile3D
          </Button>
          <div style={{ flexGrow: 1 }} />
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">Be Part</Button>
        </Toolbar>
      </AppBar>
      {/* <Button variant="contained" onClick={()=> console.log(results)}>
        test
      </Button> */}

      <Grid container>
        <Grid item xs={5}>
          <TwoTabs handleButtonClick={handleButtonClick} results={results} />
        </Grid>

        <Grid item xs={7}>
          <SearchMap
            clearGeometry={clearGeometry}
            setClearGeometry={setClearGeometry}
            onDrawEnd={handleResults}
          />
        </Grid>
      </Grid>
    </div>
  );
}
