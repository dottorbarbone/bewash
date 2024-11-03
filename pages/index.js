
import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Container, Typography, Button } from "@mui/material";
import UtilityCard from "@/components/utilitycard";
import Swiper from "swiper";
import Reservations from "@/components/Reservations";
import Contability from "@/components/Contability";
import Notes from "@/components/Notes";
import ButtonGroup from "@/components/ButtonsGroup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "./auth";
export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth"); // Redirige alla pagina di autenticazione se l'utente non è loggato
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Funzione per eseguire il logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth"); // Redirige alla pagina di login dopo il logout
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  if (loading) return <p>Caricamento...</p>;

  return (
    <>
      <ButtonGroup />
      <Reservations />
      <Contability />
      <Notes />
      <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </Button>
    </>
  );
}
