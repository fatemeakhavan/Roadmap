import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {IRole} from "../../Interface/Role.interface";
import {Box, Button, Dialog, MenuItem, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useEditRole} from "../../Hook/RoleController/useEditRole";

interface IProps{
    role:IRole;
    handleClose: () => void;
}
export const EditRole = (props:IProps) => {

    const{role,handleClose}=props;
    const[topics,setTopics]=useState<IRole>(role);

    const schema=yup.object().shape({
        name:yup.string().required("نوشتن نام دوره آموزشی الزامی است"),
        description:yup.string().required("نوشتن توضیحات دوره آموزشی الزامی است"),
    });

    const[data, setData] = useState<IRole>({
        name: role.name,
        description: role.description,
        id: 0,
    });
    ;

    const { control, handleSubmit,formState:{errors}, setValue } = useForm<IRole>({
        resolver:yupResolver(schema)
    })

    const editRoleHook = useEditRole();

    useEffect(() => {
        if(role) {
            setData(role);
        }
        setValue("description", data?.description)
        setValue("name", data?.name)
    }, [topics])


    const onSubmit: SubmitHandler<any> = data => {
        if(role.id)
            editRoleHook.mutate({
                roleId:role.id,
                description: data.description,
                name: data.name,
                callBack:handleClose
            });
    };
    return (
        <Dialog open={true}
                onClose={handleClose}
                sx={{padding:"10px"}}
        >
            <Box sx={{display:"flex", justifyContent:"center",padding:"20px 80px",textAlign:"center"}}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 style={{color:"#009688",textAlign:"center"}}>ویرایش نقش </h4>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field}) =>   <TextField
                            sx={{display:"block", marginBottom:"20px", marginTop:"30px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.name}
                            {...field}
                        />}
                    />
                    {errors.name && (<p>{errors.name.message}</p>)}

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) =>      <TextField
                            sx={{display:"block",marginBottom:"20px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.description}
                            {...field}
                        />}
                    />
                    {errors.description&& (<p>{errors.description.message}</p>)}

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
    )};
