import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

export default function SearchDate() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(format(date, "dd/MM/yyyy"));
  };

  const handleEndDateChange = (date) => {
    setEndDate(format(date, "dd/MM/yyyy"));
  };

  return (
    <Grid container spacing={2} pt={1}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid item >
          <DatePicker
            label="Inicio"
            value={startDate}
            inputFormat="dd/MM/yyyy"
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item >
          <DatePicker
            label="Termino"
            value={endDate}
            inputFormat="dd/MM/yyyy"
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </LocalizationProvider>
      {/* <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(startDate, endDate)}
        >
          Buscar
        </Button>
      </Grid> */}
    </Grid>
  );
}
