import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import {UserTopic} from "../../UserTopic/UserTopic";
import {useGetDescriptionByTopic} from "../../../Hook/Topic/useDescriptionByTopic";
import {AddComment} from "../../Comment/AddComment";
import {ShowComment} from "../../Comment/ShowComment";
import {AddQuestion} from "../../Question/AddQuestion";
import {ShowQuestion} from "../../Question/ShowQuestion";


interface IProps{
    topicId:number;
    handleClose: () => void;
}


export const DescriptionTopic=(props:IProps)=> {
    const{topicId,handleClose}=props;
    const descriptionTopicHook =useGetDescriptionByTopic(topicId)

    let description: string = "";
    if (descriptionTopicHook.data?.length) {
        description = descriptionTopicHook.data;
    }

    return (
        <Drawer open={true} onClose={handleClose} variant="temporary"
                sx={{"& .MuiDrawer-paper":{
                    width:"400px",
                        padding:"0px 20px"
                    }
                }}
        >
            <div style={{marginTop:"20px",marginRight:"140px"}}>
                <UserTopic topicId={topicId}/>
            </div>

            <Typography sx={{color:"grey",textAlign:"center",marginBottom:"50px",marginTop:"50px"}}>{description}</Typography>

            <div style={{textAlign:"center"}}>
                <AddComment topicId={topicId} />
            </div>
            <div style={{textAlign:"center",marginBottom:"50px"}}>
                <ShowComment topicId={topicId}/>
            </div>
            <div style={{textAlign:"center",marginBottom:"50px"}}>
                <AddQuestion topicId={topicId}/>
            </div>
            <div style={{textAlign:"center",marginBottom:"50px"}}>
                <ShowQuestion topicId={topicId}/>
            </div>
            <Box sx={{textAlign:"center"}}>
                <Button size="small" variant="outlined" sx={{width:"15px"}} onClick={handleClose}>بستن</Button>
            </Box>



        </Drawer>
    );
}