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
export default function Account() {
  return (
    <Container>
        <Typography variant="h3" sx={{marginTop:"50px"}}>
            Account
        </Typography>
        <br/>
        <Typography variant="h5">
            eliabarbaric@icloud.com 
        </Typography>
        <br/>
        <Typography variant="h5">
            *********
        </Typography>
        <br/>
        <Button variant="contained" sx={{backgroundColor:"white", color:"black"}}>
            SIGN OUT
        </Button>
    </Container>
  );
}
