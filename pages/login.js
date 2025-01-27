import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "./auth";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login riuscito!");
      router.push("/");
    } catch (err) {
      setError("Errore: " + err.message);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ background: "linear-gradient(to right,rgb(42, 42, 42),rgb(36, 36, 36))" }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center" sx={{color:"black"}}>
          Benvenuto in BeWash
        </Typography>
        {error && (
          <Typography color="error" textAlign="center" gutterBottom>
            {error}
          </Typography>
        )}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Accedi
        </Button>
        <Typography variant="body2" textAlign="center" sx={{ mt: 2,color:"black" }}>
          Non hai un account? <a href="/Account" style={{ color: "#1976d2" }}>Registrati</a>
        </Typography>
      </Box>
    </Box>
  );
}
