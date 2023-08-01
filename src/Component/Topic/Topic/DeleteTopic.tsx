import {useDeleteTopic} from "../../../Hook/Topic/useDeleteTopic";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import {ITopicGet} from "../../../Interface/TopicGet.interface";
import React from "react";

interface IProps{
    handleClose: () => void;
    topicId:ITopicGet;
}
export const DeleteTopic=(props:IProps)=>{
    const{topicId, handleClose}=props;

    const deleteTopicHook=useDeleteTopic();

    const deleteTopic= () => {
        deleteTopicHook.mutate({ topicId: topicId.id, callBack: handleClose });
    };

    return(
        <>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title" sx={{textAlign:"center"}}>
                    <DangerousIcon sx={{color:"red"}}/>{"حذف"}<DangerousIcon sx={{color:"red"}}/>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        آیا مطمعن به حذف این آیتم هستید؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >انصراف</Button>
                    <Button onClick={deleteTopic} sx={{color:"red"}}>حذف</Button>
                </DialogActions>
            </Dialog>



        </>
    )
}
