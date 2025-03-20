import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import SimpleAlert from "@/components/Alert";
import ReservationCard from "@/components/ReservationCard";

export default function ArchiviedReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await fetch("https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/reservations.json");
        const data = await response.json();
        
        const reservationsArray = data
          ? Object.keys(data)
              .map((key) => ({
                id: key,
                ...data[key],
              }))
              .filter((reservation) => reservation.archivied === 1)
              .sort((a, b) => new Date(b.dataOra) - new Date(a.dataOra)) // Ordina dalla data più recente alla più vecchia
          : [];
  
        setReservations(reservationsArray);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel recupero delle prenotazioni: ", error);
        setLoading(false);
      }
    }
    fetchReservations();
  }, []);
  
  

  // Funzione che verrà chiamata quando si clicca sull'icona di modifica
  const handleEdit = (id) => {
    console.log("Modifica prenotazione con ID:", id);
    // Puoi fare una navigazione o qualsiasi altra azione qui
    // Es. history.push(`/modifica-prenotazione/${id}`); per navigare a una pagina di modifica
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: "70px" }}>
        ARCHIVED RESERVATIONS
      </Typography>
      <br />

      {loading ? (
        <Typography>Caricamento in corso...</Typography>
      ) : (
        reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ReservationCard 
              key={reservation.id} 
              reservation={reservation} 
              onEdit={handleEdit} // Passa la funzione onEdit
            />
          ))
        ) : (
          <SimpleAlert />
        )
      )}
    </Container>
  );
}
