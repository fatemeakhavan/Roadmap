import {useAddQuestion} from "../../Hook/Question/useAddQuestion";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IconButton, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {useContext} from "react";
import {IQuestion} from "../../Interface/Question.interface";
import UserContext from "../../Context/UserContext";


interface IProps {
    topicId: number;
    refetch: any;
}

export const AddQuestion=(props:IProps)=>{

    const{topicId, refetch}=props;

    const addQuestionHook=useAddQuestion();
    const {userInfo} = useContext(UserContext);

    const {control, handleSubmit, formState: {errors}, reset , watch} = useForm<IQuestion>({
        defaultValues: {},
    });



    const onSubmit: SubmitHandler<IQuestion> = data => {
        addQuestionHook.mutate({
                context: data?.context,
                correctAnswer:data?.correctAnswer,
                user_id: userInfo?.id!,
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