import React from "react"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Container } from "@mui/material"
import clients from "@/components/Clients"
export default function Client(){
    return(
        <Container sx={{marginTop:'50px'}}>
          <Typography variant="h3">Clients</Typography> <br/>
          <Button variant="contained" href="/newclients">Add Clients</Button> 
          <clients/>
        </Container>
        
    )
}