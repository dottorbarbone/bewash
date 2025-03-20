import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importa il router di Next.js
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import withAuth from "./withauth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function NewReservation() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dataOra: "",
    archivied: 0,
    stato: 0,
    // Campo per la "vettura" associata al propietario selezionato
    macchina: "",
    // Campo per l'ID del cliente selezionato
    clientId: "",
    // Campo per il nome completo del propietario (da usare in UI)
    propietario: "",
    tempoDiImpiego: "",
    prezzo: "",
    color: "#0000FF", // Colore predefinito (blu)
    userId: "" // Campo nascosto valorizzato con l'UID dell'utente autenticato
  });
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]); // Stato per i clienti

  // Ottieni l'utente autenticato da Firebase
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Utente autenticato:", currentUser.uid);
        setUser(currentUser);
        setFormData(prevData => ({ ...prevData, userId: currentUser.uid }));
      } else {
        console.log("Nessun utente autenticato.");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Recupera la lista dei clienti dal database
  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch("https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/clients.json");
        const data = await response.json();
        console.log("Dati clients:", data);
        const clientsArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setClients(clientsArray);
      } catch (error) {
        console.error("Errore nel recupero dei clienti:", error);
      }
    }
    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Se il campo modificato è il propietario (clientId)
    if (name === "clientId") {
      setFormData(prev => ({ ...prev, clientId: value }));
      const selectedClient = clients.find(client => client.id === value);
      if (selectedClient) {
        const propietarioName = (selectedClient.nome && selectedClient.cognome)
          ? `${selectedClient.nome} ${selectedClient.cognome}`
          : selectedClient.id;
        setFormData(prev => ({
          ...prev,
          // Se il cliente ha la proprietà "vettura", la usiamo per il campo "macchina"
          macchina: selectedClient.vettura ? selectedClient.vettura : "",
          propietario: propietarioName
        }));
      } else {
        setFormData(prev => ({ ...prev, macchina: "", propietario: "" }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          archivied: 0,
          stato: 0,
          macchina: "",
          clientId: "",
          propietario: "",
          tempoDiImpiego: "",
          prezzo: "",
          color: "#0000FF",
          userId: user ? user.uid : ""
        });
        router.push("/");
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
      <Typography variant="h4">New Reservation</Typography>
      <br /><br />
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
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        {/* Campo per la vettura (popolato automaticamente) */}
        <TextField
          label="Vettura"
          name="macchina"
          value={formData.macchina}
          onChange={handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white", borderColor: "white" } }}
          variant="outlined"
          fullWidth
          required
        />
        {/* Menu a tendina per selezionare il propietario */}
        <FormControl fullWidth required>
          <InputLabel id="client-label" style={{ color: "white" }}>propietario</InputLabel>
          <Select
            labelId="client-label"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            style={{ color: "white", backgroundColor: "#333", borderColor: "white" }}
            label="propietario"
          >
            {clients.map(client => {
              const displayText = (client.nome && client.cognome)
                ? `${client.nome} ${client.cognome}`
                : client.id;
              return (
                <MenuItem key={client.id} value={client.id}>
                  {displayText}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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

export default withAuth(NewReservation);
