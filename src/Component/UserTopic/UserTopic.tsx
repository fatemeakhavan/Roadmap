import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {IUserTopic} from "../../Interface/UserTopix.interface";
import {useUserGetTopic} from "../../Hook/UserTopic/usGetUserTopic";
import {useAddUserTopic} from "../../Hook/UserTopic/useAddUserTopic";
import {useUpdateUserTopic} from "../../Hook/UserTopic/useEditUserTopic";
import {useEffect} from "react";

interface IProps{
   topicId : number;
   userId: number | null;
   refetch: any
}

export const UserTopic=(props:IProps)=> {
    const{topicId ,userId, refetch}=props;

    const getUserTopicHook= useUserGetTopic(topicId,userId);
    let userTopic: IUserTopic | undefined;
    if (getUserTopicHook.data) {
        userTopic= getUserTopicHook.data;
    }

    const addUserTopicHook=useAddUserTopic();
    const patchUserTopicHook=useUpdateUserTopic();


    const [status, setStatus] = React.useState<any>("");

    useEffect(() => {
        setStatus(userTopic?.status)
    }, [userTopic?.status])


    const handleChange = (event: { target: { value: React.SetStateAction<any>; }; }) => {
        if(!userTopic?.status){

            addUserTopicHook.mutate({
                topic_id:topicId,
                user_id:userId,
                status:event.target.value,
            });
        }

        else{
            patchUserTopicHook.mutate({
                topic_id:topicId,
                user_id:userId,
                status:event.target.value,
                callBack:refetch
            });
        };
        setStatus(event.target.value);

    };

    return (
        <Box sx={{ maxWidth: 160 }}>
            <FormControl fullWidth sx={{justifyContent:'flex-end',position:"relative",textAlign:"center"}}>
                <InputLabel id="demo-simple-select-label">status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="status"
                    onChange={handleChange}
                >
                    <MenuItem value="DONE">DONE</MenuItem>
                    <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                    <MenuItem value="SKIP">SKIP</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
