import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Container, Typography } from "@mui/material";
import UtilityCard from "@/components/utilitycard";
import Swiper from "swiper";
import SimpleAlert from "@/components/Alert";

export default function Reservations() {
  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: "70px" }}>
        NEXT RESERVATIONS
      </Typography>
      <br />
      <SimpleAlert />
    </Container>
  );
}
