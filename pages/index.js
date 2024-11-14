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
import TotalEntrance from "./totalentrance";
export default function Home() {
  return (
    <>
      <ButtonGroup />
      <Reservations />
      <TotalEntrance />
      <Contability />
      <Notes />
    </>
  );
}