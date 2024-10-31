import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Container, Typography } from "@mui/material";
import UtilityCard from "@/components/utilitycard";
import Swiper from "swiper";
export default function Home(){
  return(
    <>
      <Container sx={{display:"flex", marginTop:"40px"}}>
        <UtilityCard button="CLIENTS" img="https://marketingfocalizzato.com/wp-content/uploads/come-trovare-nuovi-clienti-professionisti-e-studi-professionali-marketing-focalizzato-fabrizio-diluca-620x330.jpg" />
        <UtilityCard button="CARS" img="https://m.media-amazon.com/images/I/71+mhWHnBdL._AC_UF1000,1000_QL80_.jpg" />
        <UtilityCard button="PRODUCTS" img="https://m.media-amazon.com/images/I/91zgCEUO4nL.jpg" />
        <UtilityCard button="CALENDAR" img="https://img.freepik.com/vettori-gratuito/icona-del-calendario-su-sfondo-bianco_1308-84634.jpg?semt=ais_hybrid" />
        <UtilityCard button="CONTABILITY" img="https://www.bbs.unibo.it/wp-content/uploads/2018/12/Fintech_1200.jpg" />
        <UtilityCard button="SHOP" img="https://www.beps.it/media/landing_page/interno3.jpg" />
      </Container>

      
    </> 
  )
}