import React, { useState } from "react";
import { Container, TextField, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import withAuth from "./withauth";

export default function NewCLient() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    vettura: "",
    telefono: "",
    incasso: "",
    immagine: "",
    colore: "#0000FF", // Colore predefinito (blu)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Funzione per inviare i dati (aggiungi o modifica)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenzione del comportamento predefinito
    try {
      const response = await fetch(
        "https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/clients.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Client aggiunta con successo!");
        setFormData({
            nome: "",
            cognome: "",
            vettura: "",
            telefono: "",
            incasso: "",
            immagine: "",
            colore: "#0000FF", // Colore predefinito (blu)
        });
      } else {
        throw new Error("Errore durante l'aggiunta del client");
      }
    } catch (error) {
      console.error("Errore durante l'operazione:", error);
      alert("Errore durante l'operazione");
    }
  };

  return (
    <Container style={{ marginTop: "50px", color: "white", borderRadius: "8px" }}>
      <Typography variant="h4">New Client</Typography><br/><br/>
      <Box component="form" noValidate autoComplete="on" display="flex" flexDirection="column" gap={3} onSubmit={handleSubmit}>
      <TextField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Cognome"
          name="cognome"
          value={formData.cognome}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Vettura"
          name="vettura"
          value={formData.vettura}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Telefono"
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Incasso"
          type="number"
          name="incasso"
          value={formData.incasso}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Immagine Profilo"
          type="Text"
          name="immagine"
          value={formData.immagine}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="color-label" style={{ color: "white" }}>Colore</InputLabel>
          <Select
            labelId="color-label"
            name="colore"
            value={formData.colore}
            onChange={handleChange}
            style={{ color: "white", backgroundColor: "#333", borderColor: "white" }}
          >
            <MenuItem value="#0000FF">Blu</MenuItem>
            <MenuItem value="#FF5733">Arancione</MenuItem>
            <MenuItem value="#33C1FF">Azzurro</MenuItem>
            <MenuItem value="#FF33A6">Rosa</MenuItem>
            <MenuItem value="#33FF57">Verde</MenuItem>
            <MenuItem value="#FF8C33">Arancio chiaro</MenuItem>
            <MenuItem value="#5733FF">Viola</MenuItem>
            <MenuItem value="#33FFF6">Turchese</MenuItem>
            <MenuItem value="#FFC733">Giallo</MenuItem>
            <MenuItem value="#33FFAB">Verde acqua</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Inserisci
        </Button>
      </Box>
      <Button
        href="/"
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Annulla
      </Button>
    </Container>
  );
}
