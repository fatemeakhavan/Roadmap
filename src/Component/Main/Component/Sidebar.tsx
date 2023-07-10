import React, {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import {Box, Drawer, Fab, Grid} from "@mui/material";
import {MenuRounded} from "@mui/icons-material";

const Sidebar=()=>{

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return(
            <Drawer open={true} variant="permanent" sx={{"& .MuiDrawer-paper":{width:"320px"}}}>
                <ListItem sx={{borderBottom:"1px solid #CFD8DC" , paddingBottom:"19px"}}>
                    <img src={require("../../../Assets/images/logo.png")} style={{width:"40px"}}/>
                    <ListItemText primary="Roadmaps" sx={{marginLeft:"15px"}}/>

                </ListItem>
                <ListItem button component={Link} to="/courses">
                    <ListItemIcon>
                        <ListIcon color="success"/>
                    </ListItemIcon>
                    <ListItemText primary="فهرست دوره ها" />
                </ListItem>
            </Drawer>
    )

}
export default Sidebar;
