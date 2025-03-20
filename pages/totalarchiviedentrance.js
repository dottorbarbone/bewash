import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { Container, Typography, Alert } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
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
  measurementId: "G-QC730GJFDX",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function TotalEntrance() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalHoursDipendente, setTotalHoursDipendente] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalSpesaDipendenti, setTotalSpesaDipendenti] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsRef = ref(db, "reservations");
        const snapshot = await get(reservationsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          const activeReservations = Object.values(data).filter(
            (reservation) => reservation.archivied === 1 && reservation.stato === 1
          );

          setTotalReservations(activeReservations.length);
          setTotalPrice(
            activeReservations.reduce((acc, curr) => acc + (parseFloat(curr.prezzo) || 0), 0)
          );
          setTotalHours(
            activeReservations.reduce((acc, curr) => acc + (parseFloat(curr.tempoDiImpiego) || 0), 0)
          );
          setTotalSpesaDipendenti(
            activeReservations.reduce((acc, curr) => acc + (parseFloat(curr.spesadipendente) || 0), 0)
          );
          setNetIncome(
            activeReservations.reduce((acc, curr) => acc + (parseFloat(curr.prezzo) || 0), 0) -
            activeReservations.reduce((acc, curr) => acc + (parseFloat(curr.spesadipendente) || 0), 0)
          );

          // Calcolo delle ore totali dei dipendenti
          setTotalHoursDipendente(
            activeReservations.reduce((acc, curr) => acc + (parseFloat(curr.oreDipendente) || 0), 0)
          );
        } else {
          console.warn("Nessuna prenotazione trovata nel database.");
        }
      } catch (error) {
        console.error("Errore durante il recupero delle prenotazioni:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <Container style={{ marginTop: "50px", textAlign: "center" }}>
      {loading ? (
        <Typography variant="h6" style={{ color: "white" }}>
          Caricamento in corso...
        </Typography>
      ) : (
        <>
          <Typography variant="h5" style={{ color: "white" }}>
            <Alert icon={<EuroIcon fontSize="inherit" />} severity="success">
              {totalPrice.toFixed(2)}€ Pagati
            </Alert>
          </Typography>
          <br />
          <Typography variant="h5" style={{ color: "white" }}>
            <Alert icon={<EuroIcon fontSize="inherit" />} severity="success">
              Totale netto incassato: {netIncome.toFixed(2)} €
            </Alert>
          </Typography>
          <br />
          <Typography variant="h5" style={{ color: "white" }}>
            <Alert icon={<AccessTimeIcon fontSize="inherit" />} severity="info">
              Totale ore impiegate: {totalHours.toFixed(2)} ore
            </Alert>
          </Typography>
          <br />
          <Typography variant="h5" style={{ color: "white" }}>
            <Alert icon={<AccessTimeIcon fontSize="inherit" />} severity="warning">
              Ore dipendente: {totalHoursDipendente.toFixed(2)} ore
            </Alert>
          </Typography>
          <br />
          <Typography variant="h5" style={{ color: "white" }}>
            <Alert icon={<WarningIcon fontSize="inherit" />} severity="error">
              Spesa dipendenti: {totalSpesaDipendenti.toFixed(2)} €
            </Alert>
          </Typography>
        </>
      )}
    </Container>
  );
}

export default withAuth(TotalEntrance);
