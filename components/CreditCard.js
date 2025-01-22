import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { Container, Typography, Alert } from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import SvgIcon from "@mui/joy/SvgIcon";

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

function CreditCard({ totalPrice }) {
  return (
    <Card
      size="lg"
      variant="solid"
      color="warning"
      invertedColors
      sx={{
        marginLeft:"8%",
        gap: 2,
        width: 370,
        boxShadow: "md",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent orientation="horizontal">
        <div>
          <Typography level="title-lg">{totalPrice.toFixed(2)} €</Typography>
          <Typography sx={{ fontSize: "xs", fontFamily: "code" }}>TOTAL PRICE</Typography>
        </div>
        <SvgIcon sx={{ ml: "auto" }}>
          <svg
            width="50"
            height="39"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
              fill="currentColor"
            />
            <path
              d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
              fill="#312ECB"
            />
          </svg>
        </SvgIcon>
      </CardContent>
      <Typography sx={{ fontFamily: "code" }}>
        •••• •••• •••• 1212
      </Typography>
      <CardContent orientation="horizontal" sx={{ justifyContent: "space-between" }}>
        <div>
          <Typography sx={{ fontSize: "xs", fontFamily: "code" }}>CARD NAME</Typography>
          <Typography  sx={{ fontSize: "sm",fontFamily: "code" }}>
            ELIA BARBARIC
          </Typography>
        </div>
        <div>
          <Typography sx={{ fontSize: "xs", textAlign: "right", fontFamily: "code" }}>
            EXPIRE
          </Typography>
          <Typography level="title-sm" sx={{ fontSize: "sm", textAlign: "right",fontFamily: "code" }}>
            07/27
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TotalEntrance() {
  const [totalPrice, setTotalPrice] = useState(0);
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

          const sumPrices = activeReservations.reduce(
            (acc, curr) => acc + (parseFloat(curr.prezzo) || 0),
            0
          );
          setTotalPrice(sumPrices);
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
        <CreditCard totalPrice={totalPrice} />
      )}
    </Container>
  );
}
