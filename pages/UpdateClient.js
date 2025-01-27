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
import withAuth from "./withauth";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAiJkUm3ioqM1aFRKeIfbrAmImq6Jq2-VM",
  authDomain: "bewash-bb768.firebaseapp.com",
  databaseURL: "https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bewash-bb768",
  storageBucket: "bewash-bb768.firebasestorage.app",
  messagingSenderId: "170123363473",
  appId: "1:170123363473:web:15adc0ad813b68b213eb30",
  measurementId: "G-QC730GJFDX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function Updateclients() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    incasso: "",
    vettura: "",
    immagine:"",
    colore: "#0000FF",
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (id) {
      const clientsRef = ref(db, `clients/${id}`);
      get(clientsRef).then((snapshot) => {
        if (snapshot.exists()) {
          setFormData({ ...snapshot.val() });
        } else {
          console.error("Nessun clients trovato per l'ID specificato");
        }
      }).catch((error) => {
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
      await set(ref(db, `clients/${id}`), formData);
      alert("clients aggiornato con successo");
      router.push('/clientspage');
    } catch (error) {
      console.error("Errore durante l'aggiornamento del clients:", error);
      alert("Errore durante l'operazione");
    }
  };

  const handleDelete = async () => {
    try {
      await remove(ref(db, `clients/${id}`));
      alert("clients eliminato con successo");
      router.push('/clientspage');
    } catch (error) {
      console.error("Errore durante l'eliminazione del clients:", error);
      alert("Errore durante l'operazione di eliminazione");
    }
  };

  const confirmDelete = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container style={{ marginTop: "50px", color: "white", borderRadius: "8px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>Modifica clientse</Typography>
      <br/>
      <Box component="form" noValidate autoComplete="on" display="flex" flexDirection="column" gap={3} onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          InputLabelProps={{ shrink: true, style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
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
          InputProps={{ style: { color: "white" } }}
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
          InputProps={{ style: { color: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Telefono"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
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
          InputProps={{ style: { color: "white" } }}
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
            style={{ color: "white", backgroundColor: "#333" }}
          >
            {/* Opzioni per la selezione del colore */}
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
        Elimina cliente
      </Button>

      {/* Dialog di conferma */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Conferma Eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare questo clientse? L'azione è irreversibile.
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
        href="/clientspage"
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

export default withAuth(Updateclients);