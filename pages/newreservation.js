import React, { useState, useEffect } from "react";
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

  const [isEditing, setIsEditing] = useState(false); // Per sapere se siamo in modalità modifica

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = new URLSearchParams(window.location.search).get("id");
      console.log("ID dalla query string:", id); // Aggiungi un log qui
      if (id) {
        try {
          const response = await fetch(
            `https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`
          );
          const data = await response.json();
          console.log("Dati recuperati da Firebase:", data); // Aggiungi un altro log per verificare i dati
          if (data) {
            setFormData({
              dataOra: data.dataOra || "",
              macchina: data.macchina || "",
              propietario: data.propietario || "",
              tempoDiImpiego: data.tempoDiImpiego || "",
              prezzo: data.prezzo || "",
              color: data.color || "#0000FF",
            });
            setIsEditing(true);
          } else {
            alert("Nessun dato trovato per questo ID.");
          }
        } catch (error) {
          console.error("Errore nel recupero dei dati:", error);
          alert("Errore nel recupero dei dati.");
        }
      } else {
        alert("ID mancante nell'URL.");
      }
    };
    fetchData();
  }, []);
  
  // Funzione per inviare i dati (aggiungi o modifica)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = new URLSearchParams(window.location.search).get("id");

    try {
      if (isEditing) {
        // Se siamo in modalità modifica, aggiorniamo la prenotazione
        const response = await fetch(
          `https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/reservations/${id}.json`,
          {
            method: "PUT", // Usa PUT per la modifica
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          alert("Prenotazione aggiornata con successo!");
        } else {
          throw new Error("Errore durante l'aggiornamento della prenotazione");
        }
      } else {
        // Se non c'è id, significa che è una nuova prenotazione
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
      }
    } catch (error) {
      console.error("Errore durante l'operazione:", error);
      alert("Errore durante l'operazione");
    }
  };

  return (
    <Container style={{ marginTop: "50px", color: "white", borderRadius: "8px" }}>
      <Typography variant="h3" gutterBottom style={{ color: "white" }}>
        {isEditing ? "Modifica Prenotazione" : "Inserisci i dettagli"}
      </Typography>
      <br />
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
          <br />
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
          {isEditing ? "Modifica" : "Inserisci"}
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
