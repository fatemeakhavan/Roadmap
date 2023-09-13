import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface IProps{
    onStatusChange: any;
    statusOne:any;
}

export const UserTopic=(props:IProps)=> {
    const{onStatusChange,statusOne}=props;

    return (
        <Box sx={{ maxWidth: 160 }}>
            <FormControl fullWidth sx={{justifyContent:'flex-end',position:"relative",textAlign:"center"}}>
                <InputLabel id="demo-simple-select-label">status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={statusOne}
                    label="status"
                    onChange={onStatusChange}
                >
                    <MenuItem value="DONE">DONE</MenuItem>
                    <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                    <MenuItem value="SKIP">SKIP</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
