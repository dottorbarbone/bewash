import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, remove } from "firebase/database";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAiJkUm3ioqM1aFRKeIfbrAmImq6Jq2-VM",
  authDomain: "bewash-bb768.firebaseapp.com",
  databaseURL:
    "https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bewash-bb768",
  storageBucket: "bewash-bb768.firebasestorage.app",
  messagingSenderId: "170123363473",
  appId: "1:170123363473:web:15adc0ad813b68b213eb30",
  measurementId: "G-QC730GJFDX",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function UpdateReservation() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    dataOra: "",
    macchina: "",
    propietario: "",
    tempoDiImpiego: "",
    prezzo: "",
    spesadipendente: "",
    color: "#0000FF",
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (id) {
      const reservationRef = ref(db, `reservations/${id}`);
      get(reservationRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setFormData({ ...snapshot.val() });
          } else {
            console.error("Nessun dato trovato per l'ID specificato");
          }
        })
        .catch((error) => {
          console.error("Errore durante il recupero dei dati:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await set(ref(db, `reservations/${id}`), formData);
      alert("Dati aggiornati con successo");
      router.push("/");
    } catch (error) {
      console.error("Errore durante l'aggiornamento dei dati:", error);
      alert("Errore durante l'operazione");
    }
  };

  const handleDelete = async () => {
    try {
      await remove(ref(db, `reservations/${id}`));
      alert("Prenotazione eliminata con successo");
      router.push("/");
    } catch (error) {
      console.error("Errore durante l'eliminazione dei dati:", error);
      alert("Errore durante l'operazione di eliminazione");
    }
  };

  const confirmDelete = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Funzione per mettere in stato "pagato"
  const handleMarkAsPaid = async () => {
    try {
      await set(ref(db, `reservations/${id}/stato`), 1); // Imposta stato a 1 per "pagato"
      alert("Prenotazione contrassegnata come pagata");
      router.push("/");
    } catch (error) {
      console.error("Errore durante l'aggiornamento dello stato:", error);
      alert("Errore durante l'operazione");
    }
  };
  const handleMarkAsNotPaid = async () => {
    try {
      await set(ref(db, `reservations/${id}/stato`), 0); // Imposta stato a 1 per "pagato"
      alert("Prenotazione contrassegnata come non pagata");
      router.push("/");
    } catch (error) {
      console.error("Errore durante l'aggiornamento dello stato:", error);
      alert("Errore durante l'operazione");
    }
  };

  return (
    <Container
      style={{ marginTop: "50px", color: "white", borderRadius: "8px" }}
    >
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Modifica Prenotazione
      </Typography>
      <br />
      <Box
        component="form"
        noValidate
        autoComplete="on"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Data e ora"
          type="datetime-local"
          name="dataOra"
          value={formData.dataOra}
          onChange={handleChange}
          InputLabelProps={{ shrink: true, style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
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
          InputProps={{ style: { color: "white" } }}
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
          InputProps={{ style: { color: "white" } }}
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
          InputProps={{ style: { color: "white" } }}
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
          InputProps={{ style: { color: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Spesa dipendente (€)"
          type="number"
          name="spesadipendente"
          value={formData.spesadipendente}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="color-label" style={{ color: "white" }}>
            Colore
          </InputLabel>
          <Select
            labelId="color-label"
            name="color"
            value={formData.color}
            onChange={handleChange}
            style={{ color: "white", backgroundColor: "#333" }}
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
          Salva Modifiche
        </Button>
      </Box>
      <Button
        onClick={confirmDelete}
        color="error"
        variant="outlined"
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Elimina Prenotazione
      </Button>
      {formData.stato===0 && (      
        <Button
        onClick={handleMarkAsPaid}
        variant="contained"
        color="success"
        className="w100"
        style={{ marginTop: "20px", width: "100%" }}
      >
        Metti in stato Pagato
      </Button>
      )}
      {formData.stato === 1 && (
        <Button
          onClick={handleMarkAsNotPaid}
          variant="contained"
          color="error" // Usa "error" invece di "danger" per Material-UI
          className="w100"
          style={{ marginTop: "20px", width: "100%" }}
        >
          Da Pagare
        </Button>
      )}

      {/* Dialog di conferma */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Conferma Eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare questa prenotazione? L'azione è
            irreversibile.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annulla
          </Button>
          <Button onClick={handleDelete} color="error">
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        href="/"
        color="success"
        variant="outlined"
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Home
      </Button>
    </Container>
  );
}
