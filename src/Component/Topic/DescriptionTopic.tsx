import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import {ITopic} from '../../Interface/Topic.interface';
import { Typography } from '@mui/material';
import {UserTopic} from "./UserTopic/UserTopic";

interface IProps{
    handleClose: () => void;
    topic1:ITopic;
}

export const DescriptionTopic=(props:IProps)=> {
    const{handleClose,topic1}=props;
    return (
        <Drawer open={true} onClose={handleClose} variant="temporary"
                sx={{"& .MuiDrawer-paper":{
                    width:"400px",
                        padding:"0px 20px"
                    }
                }}
        >
            <div style={{marginTop:"20px",marginRight:"140px"}}>
                <UserTopic topicId={topic1}/>
            </div>

            <Typography variant="h3" sx={{textAlign:"center",marginTop:"30px",marginBottom:"50px"}}>{topic1.name}</Typography>
            <Typography sx={{color:"grey",textAlign:"center",marginBottom:"50px"}}>{topic1.description}</Typography>
            <Box sx={{textAlign:"center"}}>
                <Button size="small" variant="outlined" sx={{width:"15px"}} onClick={handleClose}>بستن</Button>
            </Box>



        </Drawer>
    );
}