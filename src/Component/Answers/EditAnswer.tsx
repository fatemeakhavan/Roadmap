import{useEditAnswer} from "../../Hook/Answers/useEditAnswer";
import {Box, Button, Dialog, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {IAnswer} from "../../Interface/Answer.interface";
import UserContext from "../../Context/UserContext";

interface IProps{
    answerQuestion:IAnswer ;
    handleClose: () => void;
    questionId:number | null;
}

export const EditAnswer=(props:IProps)=>{

    const{handleClose,answerQuestion,questionId}=props;
    const editAnswerHook=useEditAnswer();
    const {userInfo} = useContext(UserContext);



    const {control, handleSubmit,formState:{errors}, setValue } = useForm<IAnswer>({
        defaultValues:{}
    });
    const[data, setData] = useState<any>({
        context:answerQuestion.context,

    });

    const onSubmit: SubmitHandler<IAnswer> = data => {
        editAnswerHook.mutate({
            context: data.context,
            id:answerQuestion.id,
            user_id:userInfo?.id!,
            question_id:questionId!,
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

                    <Typography variant="h5" sx={{textAlign:"center"}}>ویرایش</Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="context"
                            control={control}
                            render={({ field}) =>   <TextField
                                sx={{display:"block", marginBottom:"15px", marginTop:"20px"}}
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