import {useDeleteCourse} from "../../Hook/Course/useDeleteCourse";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import React from "react";
import {ICourse} from "../../Interface/Course.interface";

interface IProps{
    handleClose: () => void;
    course:ICourse;
}
export const DeleteCourse=(props:IProps)=>{

    const{course, handleClose}=props;
    const deleteCourseHook=useDeleteCourse();

    const deleteTopic= () => {
        deleteCourseHook.mutate({ courseId: course.id, callBack: handleClose });
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
                        آیا مطمعن به حذف این آموزشی هستید؟
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