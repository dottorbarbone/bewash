import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Container, Typography } from "@mui/material";
import UtilityCard from "@/components/utilitycard";
import Swiper from "swiper";
import Reservations from "@/components/Reservations";
import ContabilityAlert from "./ContabilityAlert";
import Button from "@mui/material/Button";
export default function ButtonGroup(){
    return(
        <Container sx={{display:"flex", marginTop:"50px"}}>
            
                <Button variant="outlined" href="/newreservation">Add Reservation</Button> &emsp;
                <Button variant="outlined">Add Money Movement</Button> &emsp;
                <Button variant="outlined" href="/archivie">Archivie</Button> &emsp;
                <Button variant="outlined" href="/clientspage">Clients</Button> &emsp;
                <Button variant="outlined">Shop</Button> &emsp;
                <Button variant="outlined">Cars</Button> &emsp;
                <Button variant="outlined">Products</Button> &emsp; 
                <Button variant="outlined">Settings</Button> &emsp;               
                <Button color="success" href="/Account" >Profile</Button>

        </Container>
    );
}