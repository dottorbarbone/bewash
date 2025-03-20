import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import SimpleAlert from "@/components/Alert";
import ReservationCard from "@/components/ReservationCard";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Controlla l'autenticazione dell'utente
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Utente autenticato:", currentUser.uid);
        setUser(currentUser);
      } else {
        console.log("Nessun utente autenticato.");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Recupera le prenotazioni quando l'utente è disponibile
  useEffect(() => {
    async function fetchReservations() {
      if (!user || !user.uid) {
        console.log("User mancante o UID non definito");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          "https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/reservations.json"
        );
        const data = await response.json();
        console.log("Dati ricevuti da Firebase:", data);

        if (!data) {
          console.log("Nessuna prenotazione trovata.");
          setReservations([]);
          setLoading(false);
          return;
        }

        // Converte l'oggetto in un array
        const reservationsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        console.log("Array delle prenotazioni (non filtrato):", reservationsArray);

        // Log di debug per ogni prenotazione prima del filtro
        reservationsArray.forEach((reservation) => {
          console.log(
            `Prenotazione ${reservation.id}: userId = ${reservation.userId}, user.uid = ${user.uid}`
          );
        });

        // Filtra le prenotazioni in base all'UID dell'utente e allo stato di archiviazione
        const filteredReservations = reservationsArray.filter((reservation) => {
          const isNotArchived =
            reservation.archivied !== undefined
              ? reservation.archivied === 0
              : reservation.archived !== undefined
              ? reservation.archived === false
              : true;

          console.log(
            `Controllo prenotazione ${reservation.id}: isNotArchived = ${isNotArchived}, userId = ${reservation.userId}`
          );

          return isNotArchived && reservation.userId === user.uid;
        });

        console.log("Prenotazioni filtrate:", filteredReservations);
        setReservations(filteredReservations);
      } catch (error) {
        console.error("Errore nel recupero delle prenotazioni:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchReservations();
    }
  }, [user]);

  const handleEdit = (id) => {
    console.log("Modifica prenotazione con ID:", id);
  };

  return React.createElement(
    Container,
    null,
    React.createElement(
      Typography,
      { variant: "h5", sx: { marginTop: "70px" } },
      "NEXT RESERVATIONS"
    ),
    React.createElement("br"),
    loading
      ? React.createElement(Typography, null, "Caricamento in corso...")
      : reservations.length > 0
      ? reservations.map((reservation) =>
          React.createElement(ReservationCard, {
            key: reservation.id,
            reservation: reservation,
            onEdit: handleEdit,
          })
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(SimpleAlert),
        )
  );
}
