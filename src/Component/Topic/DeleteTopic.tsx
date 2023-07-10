import {ITopic} from "../../Interface/Topic.interface";
import {useDeleteTopic} from "../../Hook/Topic/useDeleteTopic";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import React from "react";

interface IProps{
    handleClose: () => void;
    topic2:ITopic;
}
export const DeleteTopic=(props:IProps)=>{
    const{topic2, handleClose}=props;

    const deleteTopicHook=useDeleteTopic();

    const deleteTopic= () => {
        deleteTopicHook.mutate({ topicId: topic2.id, callBack: handleClose });
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
