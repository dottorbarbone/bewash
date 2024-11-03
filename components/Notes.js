import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Container, Typography } from "@mui/material";
import UtilityCard from "@/components/utilitycard";
import Swiper from "swiper";
import NotesAlert from "./NotesAlert";
export default function Notes(){
    return (
        <Container>
          <Typography variant="h5" sx={{ marginTop: "70px" }}>
            NOTES
          </Typography>
          <br/>
          <NotesAlert/>
        </Container>
      );
}