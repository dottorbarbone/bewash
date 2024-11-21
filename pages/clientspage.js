import React from "react";
import { Typography, Button, Container } from "@mui/material";
import Clients from "@/components/Clients"; // Import corretto del componente

export default function Client() {
  return (
    <Container sx={{ marginTop: "50px" }}>
      <Typography variant="h3" sx={{ marginBottom: "20px" }}>
        Clients
      </Typography>
      <Button variant="contained" href="/newclients" sx={{ marginBottom: "20px" }}>
        Add Client
      </Button>
      <Clients /> {/* Usa il componente con la lettera maiuscola */}
    </Container>
  );
}
