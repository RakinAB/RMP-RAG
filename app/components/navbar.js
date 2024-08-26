import { AppBar, Button, Toolbar, Link } from "@mui/material";

export default function Navbar(){
    return(
        <AppBar
            position="static"
            sx={{
                backgroundColor:'black'
            }}
        >
            <Toolbar
                sx={{
                    display:'flex',
                    justifyContent:'space-between',
                }}
            >
                <Link color='inherit' href='/' sx={{textDecoration:'none', fontWeight:'bold', fontSize:36}}>Rate My Professor</Link>
                <Button href="/chatbot" color='inherit' sx={{fontSize:20, fontWeight:'bold'}}>AI ChatBot</Button>
            </Toolbar>
        </AppBar>
    )
}