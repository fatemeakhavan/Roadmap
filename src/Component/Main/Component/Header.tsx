import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function Header() {
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar sx={{backgroundColor:"white",boxShadow:"0",borderBottom:"1px solid #CFD8DC",padding:"1.6px",width:"calc(100vw - 320px)"}} position="fixed">
                <Toolbar>
                    <Typography variant="h4" component="div"  sx={{ flexGrow: 1 ,color:"#000000"}}>
                        Developer Roadmaps
                    </Typography>
                    <Button color="success" variant="contained">ورود/ثبت نام</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
