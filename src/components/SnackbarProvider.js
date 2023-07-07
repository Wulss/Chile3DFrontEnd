import React, { createContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

// Mostrar el Snackbar con el mensaje y la severidad proporcionados
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
        </Snackbar>
    </SnackbarContext.Provider>
  );
};
