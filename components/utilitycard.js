import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";

export default function UtilityCard(utility) {
    return (
        <Container
            sx={{
                height: "270px",
                width: "250px",
                borderRadius: "10px",
                margin: "10px",
                backgroundImage: `url(${utility.img})`, // sintassi corretta
                backgroundSize: "cover", // opzionale per coprire l'intero contenitore
                backgroundPosition: "center" // opzionale per centrare l'immagine
            }}
        >
            <Button variant="contained" sx={{ width: "100%", marginTop: "160%" }}>
                {utility.button}
            </Button>
        </Container>
    );
}
