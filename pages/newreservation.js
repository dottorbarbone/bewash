import React, { useState } from "react";
import { Container, TextField, Typography, Box, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function FormPage() {
  const [formData, setFormData] = useState({
    dataOra: "",
    macchina: "",
    propietario: "",
    tempoDiImpiego: "",
    prezzo: "",
    color: "#0000FF", // Colore predefinito (blu)
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
        "https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/reservations.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Prenotazione aggiunta con successo!");
        setFormData({
          dataOra: "",
          macchina: "",
          propietario: "",
          tempoDiImpiego: "",
          prezzo: "",
          color: "#0000FF", // Resetta i campi dopo l'invio
        });
      } else {
        throw new Error("Errore durante l'aggiunta della prenotazione");
      }
    } catch (error) {
      console.error("Errore durante l'operazione:", error);
      alert("Errore durante l'operazione");
    }
  };

  return (
    <Container style={{ marginTop: "50px", color: "white", borderRadius: "8px" }}>
      <Box component="form" noValidate autoComplete="on" display="flex" flexDirection="column" gap={3} onSubmit={handleSubmit}>
        <TextField
          label="Data e ora"
          type="datetime-local"
          name="dataOra"
          value={formData.dataOra}
          onChange={handleChange}
          InputLabelProps={{ shrink: true, style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Macchina"
          name="macchina"
          value={formData.macchina}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Proprietario"
          name="propietario"
          value={formData.propietario}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Tempo di impiego (ore)"
          type="number"
          name="tempoDiImpiego"
          value={formData.tempoDiImpiego}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Prezzo (€)"
          type="number"
          name="prezzo"
          value={formData.prezzo}
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
            name="color"
            value={formData.color}
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
