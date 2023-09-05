import {Box, Button, Dialog, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IAnswer} from "../../Interface/Answer.interface";
import {useEffect, useState} from "react";
import {useAddAnswer} from "../../Hook/Answers/useAddAnswer";
import {useGetUser} from "../../Hook/User/useGetUser";

interface IProps{
    questionId:number;
    handleClose: () => void;
}

export const AddAnswer=(props:IProps)=>{
    const{handleClose,questionId}=props;
    const [userId, setUserId] = useState<number | null>(null);
    const addAnswerHook=useAddAnswer();
    const listUsersHook=useGetUser();

    useEffect(() => {
        if (listUsersHook?.data?.length)
            listUsersHook?.data?.forEach((user) => {
                setUserId(user?.id)
            })
    }, [listUsersHook])

    const {control, handleSubmit,formState:{errors} } = useForm<IAnswer>({
        defaultValues:{}
    });


    const onSubmit: SubmitHandler<IAnswer> = data => {
        addAnswerHook.mutate({
            context: data.context,
            question_id:questionId,
            callBack:handleClose,
            user_id:userId
        });
    };
    return(
        <>
            <Dialog open={true}
                    onClose={handleClose}
                    sx={{padding:"10px"}}
            >

                <Box sx={{ padding: "20px 50px"}}>

                    <Typography variant="h5" sx={{textAlign:"center"}}>جواب</Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="context"
                            control={control}
                            render={({ field}) =>   <TextField
                                sx={{display:"block", marginBottom:"15px", marginTop:"20px"}}
                                id="outlined-basic"
                                variant="outlined"
                                multiline
                                {...field}
                            />}
                        />
                        <Button type="submit" variant="outlined" color="success">ثبت کردن</Button>
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