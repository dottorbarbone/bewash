import { Container, Button, Box } from "@mui/material";

export default function ButtonGroup() {
  return (
    <Container sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2, // Creates space between buttons
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button variant="outlined" href="/newreservation" sx={{ minWidth: 120, flexGrow: 1 }}>
          Add Reservation
        </Button>
        <Button variant="outlined" href="/archivie" sx={{ minWidth: 120, flexGrow: 1 }}>
          Archivie
        </Button>
        <Button variant="outlined" href="/clientspage" sx={{ minWidth: 120, flexGrow: 1 }}>
          Clients
        </Button>
        <Button variant="outlined" href="/listino" sx={{ minWidth: 120, flexGrow: 1 }}>
          Listino
        </Button>
        <Button variant="outlined" sx={{ minWidth: 120, flexGrow: 1 }}>
          Settings
        </Button>
        <Button color="success" href="/Account" sx={{ minWidth: 120, flexGrow: 1 }}>
          Profile
        </Button>
      </Box>
    </Container>
  );
}
