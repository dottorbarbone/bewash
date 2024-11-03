import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Container, Typography } from "@mui/material";
import UtilityCard from "@/components/utilitycard";
import Swiper from "swiper";
import Reservations from "@/components/Reservations";
import ContabilityAlert from "./ContabilityAlert";
export default function Contability(){
    return (
        <Container>
          <Typography variant="h5" sx={{ marginTop: "70px" }}>
            CONTABILITY
          </Typography>
          <br/>
          <ContabilityAlert/>
        </Container>
      );
}