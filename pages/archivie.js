import React from "react";
import { Typography, Button, Container } from "@mui/material";
import ArchiviedReservations from "@/components/Archiviedreservation"; // Import corretto del componente
import TotalArchiviedEntrance from "./totalarchiviedentrance";
import withAuth from "./withauth";
function Client() {
  return (
    <Container sx={{ marginTop: "50px" }}>
      <Typography variant="h3" sx={{ marginBottom: "20px" }}>
        Archivied reservations
      </Typography>
      <Button variant="outlined" color="success" href="/" sx={{ marginBottom: "20px" }}>
        Home
      </Button>
      <TotalArchiviedEntrance/>
      <ArchiviedReservations /> {/* Usa il componente con la lettera maiuscola */}
    </Container>
  );
}

export default withAuth(Client)
