import {useAddQuestion} from "../../Hook/Question/useAddQuestion";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IconButton, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {useEffect, useState} from "react";
import {IQuestion} from "../../Interface/Question.interface";
import {useGetUser} from "../../Hook/User/useGetUser";
import {useGetQuestion} from "../../Hook/Question/useGetQuestion";

interface IProps {
    topicId: number;
}

export const AddQuestion=(props:IProps)=>{

    const{topicId}=props;
    const [userId, setUserId] = useState<number | null>(null);
    const addQuestionHook=useAddQuestion();
    const listQuestionHook=useGetQuestion(topicId);
    const listUsersHook=useGetUser();

    const {control, handleSubmit, formState: {errors}} = useForm<IQuestion>({
        defaultValues: {},
    });

    useEffect(() => {
        if (listUsersHook?.data?.length)
            listUsersHook?.data?.forEach((user) => {
                setUserId(user?.id)
            })
    }, [listUsersHook])

    const onSubmit: SubmitHandler<IQuestion> = data => {
        addQuestionHook.mutate({
                context: data?.context,
                correctAnswer:data?.correctAnswer,
                user_id: userId,
                topic_id: topicId,

            }
        );
    };
    const handleRefetch = () => {
        listQuestionHook.refetch();
    }
    return(
        <>

            <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: "50px"}}>
                <Controller
                    name="context"
                    control={control}
                    render={({field}) =>
                        <TextField
                            id="outlined-basic"
                            label="نوشتن سوال"
                            variant="outlined"
                            multiline
                            sx={{textAlign:"center",marginBottom:"30px"}}
                            InputProps={{
                                endAdornment: (
                                    <IconButton type="submit" onClick={handleRefetch} sx={{direction:"ltr"}}><SendIcon /></IconButton>
                                )
                            }}
                            {...field}
                        />
                    }
                />
                <Controller
                    name="correctAnswer"
                    control={control}
                    render={({field}) =>
                        <TextField
                            id="outlined-basic"
                            label=" نوشتن پاسخ درست"
                            variant="outlined"
                            multiline
                            sx={{textAlign:"center"}}
                            InputProps={{
                                endAdornment: (
                                    <IconButton type="submit" onClick={handleRefetch} sx={{direction:"ltr"}}><SendIcon /></IconButton>
                                )
                            }}
                            {...field}
                        />
                    }
                />


            </form>



        </>
    )
}