import withAuth from "./withauth";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
function Listino(){
    return(
        <Container sx={{marginTop:"50px"}}>
        <Typography variant="h3">Listino Prezzi <Button href="/" color="success" variant="outlined" sx={{marginLeft:"25px"}}>home</Button></Typography>
        <br/>
        <hr/>
        <br/>
        <Typography variant="h5">Macchina Piccola meno 5$ quota</Typography>
        <Typography>1 ora -20$</Typography>
        <Typography>1.5 ore -25$</Typography>
        <Typography>2 ore -30$</Typography>
        <br/>
        <hr/>
        <br/>
        <Typography variant="h5">Macchina Grande meno 5$ quota</Typography>
        <Typography>1 ora -25$</Typography>
        <Typography>1.5 ore -30$</Typography>
        <Typography>2 ore -35$</Typography>
        <br/>
        <hr/>
        <br/>
        <Typography variant="h5">Furgoni</Typography>
        <Typography>INTERNO -10$</Typography>
        <Typography>ESTERNO -20$</Typography>
        <Typography>COMPLETO  -25$</Typography>
        <br/>
        <hr/>
        <br/>
        <Typography variant="h5">Porshe meno 5 $ di quota</Typography>
        <Typography>1.5 ore -30$</Typography>
        <Typography>2 ore -35$</Typography>
        <Typography>2+ ore  -40$</Typography>
        </Container>
    )
}

export default withAuth(Listino);