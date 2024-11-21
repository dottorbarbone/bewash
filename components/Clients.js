import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import SimpleAlert from "@/components/Alert";
import ClientCard from "@/components/ClientCard";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() { // Nome corretto della funzione
      try {
        const response = await fetch(
          "https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/clients.json"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Trasforma l'oggetto ricevuto in un array di oggetti con ID inclusi
        const clientsArray = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];

        setClients(clientsArray);
      } catch (error) {
        console.error("Errore nel recupero dei clienti: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClients(); // Chiama la funzione con il nome corretto
  }, []);

  // Funzione che verrà chiamata quando si clicca sull'icona di modifica
  const handleEdit = (id) => {
    console.log("Modifica cliente con ID:", id);
    // Puoi fare una navigazione o qualsiasi altra azione qui
    // Es. history.push(`/modifica-prenotazione/${id}`);
  };

  return (
    <Container>
      <br />
      {loading ? (
        <Typography>Caricamento in corso...</Typography>
      ) : clients.length > 0 ? (
        clients.map((client) => (
          <ClientCard 
            key={client.id} 
            client={client} 
            onEdit={handleEdit} // Passa la funzione onEdit
          />
        ))
      ) : (
        <SimpleAlert message="Nessun cliente trovato." /> // Aggiungi un messaggio personalizzato
      )}
    </Container>
  );
}
