import {useEditComment} from "../../Hook/Comment/useEditComment";
import {Box, Button, Dialog, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IComment} from "../../Interface/Comment.interface";
import {useEffect, useState} from "react";


interface IProps{
     comment:IComment;
     topicId:number;
     handleClose: ()=> void;
 }

export const EditComment=(props:IProps)=>{
     const{comment,handleClose,topicId}=props;
     const editCommentHook=useEditComment();

    const {control, handleSubmit,formState:{errors}, setValue } = useForm<IComment>({
        defaultValues:{}
    });

    const[data, setData] = useState<any>({
        context:comment.context,
    });

    useEffect(() => {
        setValue("context", data?.context)

    }, [comment])

    const onSubmit: SubmitHandler<IComment> = data => {
        editCommentHook.mutate({
                context: data.context,
                id:comment.id,
                callBack:handleClose
            });
    };
    return(
        <>
            <Dialog open={true}
                    onClose={handleClose}
                    sx={{padding:"10px"}}
            >

                <Box sx={{ padding: "20px 50px"}}>

                    <Typography variant="h5" sx={{textAlign:"center"}}>ویرایش نظرات</Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="context"
                            control={control}
                            render={({ field}) =>   <TextField
                                sx={{display:"block", marginBottom:"30px", marginTop:"50px"}}
                                id="outlined-basic"
                                variant="outlined"
                                multiline
                                defaultValue={data?.context}
                                {...field}
                            />}
                        />
                        <Button type="submit" variant="outlined" color="success">ویرایش کردن</Button>
                        <Button
                            onClick={handleClose}
                            color="warning"
                            variant="outlined"
                            sx={{marginLeft:"15px"}}
                        >
                            منصرف شدن
                        </Button>
                    </form>

                </Box>

            </Dialog>

        </>
    )
}