import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {IRole} from "../../Interface/Role.interface";
import {Box, Button, Dialog,TextField} from "@mui/material";
import {useAddRole} from "../../Hook/RoleController/useAddRole";



interface IProps{
    handleClose: () => void;
}

export const AddRole = (props:IProps) => {
    const{handleClose}=props;

    const schema=yup.object().shape({
        name:yup.string().required("نوشتن نام دوره آموزشی الزامی است"),
        description:yup.string().required("نوشتن توضیحات دوره آموزشی الزامی است"),

    });


    const {control, handleSubmit,formState:{errors} } = useForm<IRole>({
        defaultValues:{},
        resolver:yupResolver(schema)
    });
    const addRoleHook =useAddRole();


    const onSubmit: SubmitHandler<IRole> = data => {
        addRoleHook.mutate({
                name: data.name,
                description: data.description,
                callBack:handleClose
            }
        );
    };
    return (
        <Dialog open={true}
           onClose={handleClose}
           sx={{padding:"10px"}}
        >
          <Box sx={{display:"flex", justifyContent:"center",padding:"40px 150px"}}>

              <form onSubmit={handleSubmit(onSubmit)}>
              <h4 style={{color:"#009688",textAlign:"center"}}>افزودن نقش </h4>
              <Controller

                        name="name"
                        control={control}
                        render={({ field }) =>   <TextField
                        sx={{display:"block", marginBottom:"30px", marginTop:"50px"}}
                        id="outlined-basic"
                        label="name"
                        variant="outlined"
                        multiline
                        {...field}
                        />}
              />
             {errors.name && (<p>{errors.name.message}</p>)}
             <Controller

                   name="description"
                   control={control}
                   render={({ field }) =>      <TextField
                   sx={{display:"block", marginBottom:"30px"}}
                   id="outlined-basic"
                   label="description"
                   variant="outlined"
                    multiline
                   {...field}
                    />}
             />
           {errors.description && (<p>{errors.description.message}</p>)}
                  <Button type="submit" variant="outlined" color="success">ثبت کردن</Button>
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
