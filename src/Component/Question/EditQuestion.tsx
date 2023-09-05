import {useEditQuestion} from "../../Hook/Question/useEditQuestion";
import {Box, Button, Dialog, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IQuestion} from "../../Interface/Question.interface";
import {useState} from "react";

interface IProps{
    question:IQuestion;
    handleClose: () => void;
}

export const EditQuestion=(props:IProps)=>{
    const{handleClose,question}=props;
    const editQuestionHook=useEditQuestion();

    const {control, handleSubmit,formState:{errors}, setValue } = useForm<IQuestion>({
        defaultValues:{}
    });
    const[data, setData] = useState<any>({
        context:question.context,
        correctAnswer:question.correctAnswer,
    });

    const onSubmit: SubmitHandler<IQuestion> = data => {
        editQuestionHook.mutate({
            context: data.context,
            correctAnswer:data.correctAnswer,
            id:question.id,
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
                        {question.correctAnswer ?
                            <Controller
                                name="correctAnswer"
                                control={control}
                                render={({ field}) =>   <TextField
                                    sx={{display:"block", marginBottom:"30px"}}
                                    id="outlined-basic"
                                    variant="outlined"
                                    multiline
                                    defaultValue={data?.correctAnswer}
                                    {...field}
                                />}
                            /> : null

                        }
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