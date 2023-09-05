import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {useAddCourse} from '../../Hook/Course/useAddCourse';
import {ICourse} from "../../Interface/Course.interface";
import {Box, Button, Dialog,TextField} from "@mui/material";
import React, {useState} from "react";

interface IProps{
    handleClose: () => void;
    course1:ICourse[];
}

export const AddCourse = (props:IProps) => {
    const{handleClose,course1}=props;
    const addCourseHook =useAddCourse();
    const [checked, setChecked] =useState([true, false]);

    const schema=yup.object().shape({
        description:yup.string().required("نوشتن توضیحات دوره آموزشی الزامی است"),
        name:yup.string().required("نوشتن نام دوره آموزشی الزامی است"),
        image_uri:yup.string().required("نوشتن آدرس تصویر الزامی است"),
    });


    const {control, handleSubmit,formState:{errors} } = useForm<ICourse>({
        defaultValues:{},
        resolver:yupResolver(schema)
    });



    const onSubmit: SubmitHandler<ICourse> = data => {
        addCourseHook.mutate({
                description: data.description,
                name: data.name,
                image_uri:data.image_uri,
                callBack:handleClose
            }

        );
    };
    return (
        <Dialog open={true}
                onClose={handleClose}
                sx={{padding:"5px"}}

        >
            <Box sx={{display:"flex", justifyContent:"center",padding:"20px 80px"}}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 style={{color:"success"}}>افزودن دوره آموزشی </h4>
                    <Controller

                        name="name"
                        control={control}
                        render={({ field }) =>   <TextField
                            sx={{display:"block", marginBottom:"20px", marginTop:"30px", width:"100%"}}
                            hiddenLabel
                            id="outlined-basic"
                            label="نام"
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
                            sx={{display:"block", marginBottom:"20px",width:"100%"}}
                            id="outlined-basic"
                            label="توضیحات"
                            variant="outlined"
                            multiline
                            {...field}
                        />}
                    />
                    {errors.description && (<p>{errors.description.message}</p>)}
                    <Controller
                        name="image_uri"
                        control={control}
                        render={({ field }) =>  <TextField
                            sx={{display:"block", marginBottom:"20px",width:"100%"}}
                            multiline
                            id="outlined-basic"
                            label="آدرس تصویر"
                            variant="outlined"
                            {...field}
                        />}
                    />
                    {errors.image_uri && (<p>{errors.image_uri.message}</p>)}

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

