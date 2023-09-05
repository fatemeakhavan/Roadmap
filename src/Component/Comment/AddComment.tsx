import {Button, IconButton, TextField} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IComment} from "../../Interface/Comment.interface";
import {useAddComment} from "../../Hook/Comment/useAddComment";
import {useGetUser} from "../../Hook/User/useGetUser";
import React, {useEffect, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {useGetComment} from "../../Hook/Comment/useGetComment";

interface IProps {
    topicId: number;
    refetch: any
}

export const AddComment = (props: IProps) => {
    const {topicId, refetch} = props;
    const [userId, setUserId] = useState<number | null>(null);

    const {control, handleSubmit, formState: {errors}, reset, watch} = useForm<IComment>({
        defaultValues: {},
    });
    const addCommentHook = useAddComment();
    const listUsersHook = useGetUser();

    useEffect(() => {
        if (listUsersHook?.data?.length)
            listUsersHook?.data?.forEach((user) => {
                setUserId(user?.id)
            })
    }, [listUsersHook])

    const onSubmit: SubmitHandler<IComment> = data => {
        addCommentHook.mutate({
                context: data?.context,
                user_id: userId,
                topic_id: parseInt(topicId as unknown as string),
                 callBack:()=> {
                     refetch()
                     reset();
                 }

            }
        );
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: "50px"}}>
                <Controller
                    name="context"
                    control={control}
                    defaultValue={''}
                    render={({field}) =>
                        <TextField
                            id="outlined-basic"
                            label="نوشتن نظرات"
                            variant="outlined"
                            multiline
                            sx={{textAlign:"center"}}
                            InputProps={{
                                endAdornment: (
                                    <IconButton type="submit" sx={{color:"#004d40",transform: 'scaleX(-1)'}} disabled={!watch("context")}><SendIcon /></IconButton>
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