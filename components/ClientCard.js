import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Avatar, Divider, IconButton, Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EuroIcon from "@mui/icons-material/Euro";
import EditIcon from "@mui/icons-material/Edit"; // Importa l'icona di modifica
import Link from "next/link"; // Importa Link da Next.js

// Funzione per generare un colore casuale
function getRandomColor() {
  const colors = [
    "#FF5733", "#33C1FF", "#FF33A6", "#33FF57", "#FF8C33", 
    "#5733FF", "#33FFF6", "#FFC733", "#33FFAB", "#C733FF"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function ClientCard({ client, onEdit }) {
  // Usa il colore specificato dall'utente se presente, altrimenti genera un colore casuale
  const backgroundColor = client.color || getRandomColor();

  return (
    <Card sx={{ display: "flex", flexDirection: "column", marginBottom: "20px", borderRadius: "15px", boxShadow: 4 }}>
      <CardMedia
        component="div"
        sx={{ height: 100, background: backgroundColor }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <Typography variant="h4" style={{ color: "white", fontWeight: "bold" }}>
            {client.vettura || "Prenotazione"}
          </Typography>
        </Box>
      </CardMedia>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <Avatar sx={{ backgroundColor: backgroundColor, marginRight: "10px" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginRight: "10px" }}>
            {client.nome}
          </Typography>
          {/* Bottone di modifica */}
          <Link href={`/updateclient/${client.id}`} passHref>
            <Button color="alert" startIcon={<EditIcon />}/>
          </Link>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <EventIcon color="primary" sx={{ marginRight: "8px" }} />
            <Typography variant="body1">{formattedDate}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <AccessTimeIcon color="secondary" sx={{ marginRight: "8px" }} />
            <Typography variant="body1">Telefono: {client.telefono}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <EuroIcon color="success" sx={{ marginRight: "8px" }} />
            <Typography variant="body1">Incasso Totale: €{client.incasso}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

