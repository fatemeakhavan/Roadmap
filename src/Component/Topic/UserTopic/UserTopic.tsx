import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {IUserTopic} from "../../../Interface/UserTopix.interface";
import {ITopic} from "../../../Interface/Topic.interface";
import {useUserGetTopic} from "../../../Hook/Topic/UserTopic/usGetUserTopic";
import {useAddUserTopic} from "../../../Hook/Topic/UserTopic/useAddUserTopic";
import {useUpdateUserTopic} from "../../../Hook/Topic/UserTopic/usePatchUserTopic";
import {useEffect} from "react";

interface IProps{
   topicId : ITopic;
}

export const UserTopic=(props:IProps)=> {
    const{topicId}=props;

    const getUserTopicHook= useUserGetTopic(topicId.id);
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
        console.log(userTopic?.status)

        if(!userTopic?.status){

            addUserTopicHook.mutate({
                topic_id:topicId.id,
                user_id:1,
                status:event.target.value,
            });
        }

        else{
            patchUserTopicHook.mutate({
                topic_id:topicId.id,
                user_id:1,
                status:event.target.value,
            });
        };
        setStatus(event.target.value);

    };

    return (
        <Box sx={{ maxWidth: 160 }}>

            <FormControl fullWidth>
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
                    <MenuItem value="DEFAULT">DEFAULT</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
