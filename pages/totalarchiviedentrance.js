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
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalSpesaDipendenti, setTotalSpesaDipendenti] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsRef = ref(db, "reservations");
        const snapshot = await get(reservationsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          // Filtra solo le prenotazioni con archivied === 1 e stato === 1
          const activeReservations = Object.values(data).filter(
            (reservation) => reservation.archivied === 1 && reservation.stato === 1
          );

          // Calcolo delle somme richieste
          const reservationCount = activeReservations.length;

          // Calcolo del totale dei prezzi (solo prenotazioni con stato === 1)
          const sumPrices = activeReservations.reduce(
            (acc, curr) => acc + (parseFloat(curr.prezzo) || 0),
            0
          );
          setTotalPrice(sumPrices);

          // Calcolo del totale delle ore lavorate
          const sumHours = activeReservations.reduce(
            (acc, curr) => acc + (parseFloat(curr.tempoDiImpiego) || 0),
            0
          );
          setTotalHours(sumHours);

          // Calcolo del totale spesa dipendenti
          const sumSpesaDipendenti = activeReservations.reduce(
            (acc, curr) => acc + (parseFloat(curr.spesadipendente) || 0),
            0
          );
          setTotalSpesaDipendenti(sumSpesaDipendenti);

          // Imposta il numero totale delle prenotazioni attive
          setTotalReservations(reservationCount);
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
              {totalPrice.toFixed(2)} € incassati
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
            <Alert icon={<WarningIcon fontSize="inherit" />} severity="error">
              Spesa dipendenti: {totalSpesaDipendenti.toFixed(2)} €
            </Alert>
          </Typography>
        </>
      )}
    </Container>
  );
}

// Esporta il componente con il wrapper `withAuth`
export default withAuth(TotalEntrance);
