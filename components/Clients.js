import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import SimpleAlert from "@/components/Alert";
import ClientCard from "@/components/ClientCard";

export default function clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchclients() {
      try {
        const response = await fetch("https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/clients.json");
        const data = await response.json();
        
        // Trasforma l'oggetto ricevuto in un array di oggetti con ID inclusi
        const clientsArray = data ? Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })) : [];

        setClients(clientsArray);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel recupero dei clienti: ", error);
        setLoading(false);
      }
    }
    fetchCLients();
  }, []);

  // Funzione che verrà chiamata quando si clicca sull'icona di modifica
  const handleEdit = (id) => {
    console.log("Modifica cliente con ID:", id);
    // Puoi fare una navigazione o qualsiasi altra azione qui
    // Es. history.push(`/modifica-prenotazione/${id}`); per navigare a una pagina di modifica
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: "70px" }}>
        Clients
      </Typography>
      <br />

      {loading ? (
        <Typography>Caricamento in corso...</Typography>
      ) : (
        clients.length > 0 ? (
          clients.map((client) => (
            <ClientCard 
              key={client.id} 
              client={client} 
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
