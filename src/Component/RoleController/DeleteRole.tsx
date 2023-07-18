import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import React from "react";
import {IRole} from "../../Interface/Role.interface";
import {useDeleteRole} from "../../Hook/RoleController/useDelete";

interface IProps{
    handleClose: () => void;
    role:IRole;
}
export const DeleteRole=(props:IProps)=>{

    const{role, handleClose}=props;
    const deleteRoleHook=useDeleteRole();

    const deleteTopic= () => {
        deleteRoleHook.mutate({ roleId: role.id, callBack: handleClose });
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
                        آیا مطمعن به حذف این نقش هستید؟
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