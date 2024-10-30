import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { Typography } from "@mui/material";
export default function Home(){
  return(
    <>
    <center><Typography variant="h2" style={{margin:"30px"}}>BEWASH</Typography></center>
    <center><Typography variant="h5" style={{margin:"30px", color:"gray"}}>your car is our dream...</Typography></center>
    <center><img src="https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1685458010/autoexpress/2023/05/Porsche%20911%20GTS%20UK%20001_otx6j7.jpg" style={{width:"80%", borderRadius:"5px"}} /></center>
    </>
  )
}