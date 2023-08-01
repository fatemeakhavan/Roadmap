import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import React from "react";
import {useDeleteComment} from "../../Hook/Comment/useDeleteComment";

interface IProps{
    handleClose: () => void;
    id:number;
}
export const DeleteComment=(props:IProps)=>{

    const{id, handleClose}=props;
    const deleteCommentHook=useDeleteComment();

    const deleteComment= () => {
        deleteCommentHook.mutate({ id: id ,callBack: handleClose });
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
                        آیا مطمعن به حذف این نظر هستید؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >انصراف</Button>
                    <Button onClick={deleteComment} sx={{color:"red"}}>حذف</Button>
                </DialogActions>
            </Dialog>



        </>
    )
}