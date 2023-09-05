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
    refetch: any;
}

export const AddQuestion=(props:IProps)=>{

    const{topicId, refetch}=props;
    const [userId, setUserId] = useState<number | null>(null);
    const addQuestionHook=useAddQuestion();
    const listUsersHook=useGetUser();

    const {control, handleSubmit, formState: {errors}, reset , watch} = useForm<IQuestion>({
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
                topic_id: parseInt(topicId as unknown as string),
                callBack:()=> {
                    reset();
                    refetch()
                }

            }
        );
    };
    return(
        <>

            <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: "20px"}}>
                <Controller
                    name="context"
                    control={control}
                    defaultValue={''}
                    render={({field}) =>
                        <TextField
                            id="outlined-basic"
                            label="نوشتن سوال"
                            variant="outlined"
                            multiline

                            sx={{textAlign:"center"}}
                            InputProps={{
                                endAdornment: (
                                    <IconButton type="submit" sx={{color:"#004d40", transform: 'scaleX(-1)'}} disabled={!watch("context")}><SendIcon/></IconButton>
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