import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Button, Container, Typography } from "@mui/material";
import UtilityCard from "@/components/utilitycard";
import Swiper from "swiper";
import Reservations from "@/components/Reservations";
import Contability from "@/components/Contability";
import Notes from "@/components/Notes";
import ButtonGroup from "@/components/ButtonsGroup";
// componenti logout
import { useUser } from "./usercontext";
import { logout } from "./auth";
export default function Account() {
    const user = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout effettuato con successo!");
    } catch (error) {
      alert("Errore durante il logout");
    }
  };
  return (
    <Container>
        <Typography variant="h3" sx={{marginTop:"50px"}}>
            Account
        </Typography>
        <br/>
        {user ? (
        <div>  
        <Typography variant="h5">
            {user.email}
        </Typography>
        <br/>
        <Button onClick={handleLogout} variant="outlined" sx={{width:"100%"}} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Logout
        </Button>
        <br/><br/>
        <Button href="/" variant="outlined" sx={{width:"100%"}} color="success" >
            Home
        </Button>
        </div>
        ) : (
          <div>
            <Button href="/login" className="text-blue-300 hover:text-blue-500" sx={{width:"100%"}} variant="contained">
              Login
            </Button>
          </div>
        )}
    </Container>
  );
}












  