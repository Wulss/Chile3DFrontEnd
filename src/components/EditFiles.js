import React from "react";
import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";

export default function EditFiles() {
  const useStyles = {
    root: css`
      flex-grow: 1;
      display: flex;
      height: calc(100vh - 54px); /* 64-20: 44px is the height of the header */
      padding: 0;
    `,
    tabbar: css`
      border-right: 1px solid #ccc;
      height: 100%;
      width: 250px;
      background: #6e6e6e;
      align-items: center;
    `,
    tab: css`
      background: #fff;
    `,
    content: css`
      width: 100%;
      height: 100%;
    `,
  };

  return (
    <Grid container direction={"column"} spacing={2} css={useStyles.tab}>
      <Grid item>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Edit Files
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
