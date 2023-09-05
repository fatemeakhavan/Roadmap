import React, {useContext, useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import {Box, Drawer, Fab, Grid, Typography} from "@mui/material";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import "./styles.css";
import UIContext from "../../../Context/UIContext";

const Sidebar=()=>{
    const {tabIndex} = useContext(UIContext);

    return(
        <Grid lg={2}>
            <Drawer open={true} variant="permanent" sx={{"& .MuiDrawer-paper":{width:"320px"}}}>
                <ListItem sx={{borderBottom:"1px solid #CFD8DC" , paddingBottom:"19px"}}>
                    <img src={require("../../../Assets/images/logo1.png")} style={{width:"40px"}}/>
                    <Typography variant="h6" sx={{marginLeft:"15px"}}>مسیریابی</Typography>
                </ListItem>
                <ListItem button component={Link} to="/courses"className={`sidebar_hover ${tabIndex === 0 && 'selected'}`}>
                    <ListItemIcon>
                        <ListIcon color="success"/>
                    </ListItemIcon>
                    <ListItemText primary="فهرست دوره ها" />
                </ListItem>
                {localStorage.getItem('POD_APP:USER_ROLE') === "ADMIN" ?
                    <>
                        <ListItem button component={Link} to="/roles"className={`sidebar_hover ${tabIndex === 1 && 'selected'}`}>
                            <ListItemIcon>
                                <SupervisedUserCircleIcon  color="success"/>
                            </ListItemIcon>
                            <ListItemText primary="فهرست نقش ها"/>
                        </ListItem>
                        <ListItem button component={Link} to="/users"className={`sidebar_hover ${tabIndex === 2 && 'selected'}`} >
                            <ListItemIcon>
                                <PermContactCalendarIcon color="success"/>
                            </ListItemIcon>
                            <ListItemText primary="فهرست کاربران" />
                        </ListItem>
                    </> : null }

            </Drawer>
        </Grid>

    )

}
export default Sidebar;
