import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { Container, Typography, Alert } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";

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

export default function TotalEntrance() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsRef = ref(db, "reservations");
        const snapshot = await get(reservationsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const reservationCount = Object.keys(data).length;
          
          // Calcolo del totale dei prezzi
          const prices = Object.values(data).map(
            (reservation) => parseFloat(reservation.prezzo) || 0
          );
          const sumPrices = prices.reduce((acc, curr) => acc + curr, 0);
          setTotalPrice(sumPrices);

          // Calcolo del totale delle ore lavorate
          const hours = Object.values(data).map(
            (reservation) => parseFloat(reservation.tempoDiImpiego) || 0
          );
          const sumHours = hours.reduce((acc, curr) => acc + curr, 0);
          setTotalHours(sumHours);

          // Imposta il numero totale delle prenotazioni
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

  // Calcolo della spesa totale come numero di prenotazioni * 3
  const totalExpense = totalReservations * 3;
  const restant = totalPrice - totalExpense;


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
              {totalPrice.toFixed(2)} € da incassare
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
              Spesa stimata: {totalExpense.toFixed(2)} €. (Rimanenti {restant.toFixed(2)})
            </Alert>
          </Typography>
        </>
      )}
    </Container>
  );
}
