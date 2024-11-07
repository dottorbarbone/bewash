import React from "react";
import { Container, TextField, Typography, Box, Button } from "@mui/material";

export default function FormPage() {
  return (
    <Container style={{ marginTop: "50px", color: "white", borderRadius: "8px" }}>
      <Typography variant="h3" gutterBottom style={{ color: "white" }}>
        Inserisci i dettagli
      </Typography>
      <br />
      <Box component="form" noValidate autoComplete="on" display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Data e ora"
          type="datetime-local"
          InputLabelProps={{ shrink: true, style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Macchina"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          
        />
        <TextField
          label="Proprietario"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Tempo di impiego (ore)"
          type="number"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Prezzo (€)"
          type="number"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Invia
        </Button>
      </Box>
      <Button
          href="/"
          variant="contained"
          fullWidth
          color=""
          style={{ marginTop: "20px" }}
        >
          Annulla
        </Button>
    </Container>
  );
}
