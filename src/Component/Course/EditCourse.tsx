import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {useEditCourse} from '../../Hook/Course/useEditCourse';
import {ICourse} from "../../Interface/Course.interface";
import {Box, Button, Dialog,TextField} from "@mui/material";
import React, {useEffect, useState} from "react";

interface IProps{
    course1:ICourse;
    handleClose: () => void;

}

export const EditCourse = (props:IProps) => {

    const{course1,handleClose}=props;
    const[course,setCourse]=useState<ICourse>(course1);

    const schema=yup.object().shape({
        description:yup.string().required("نوشتن توضیحات دوره آموزشی الزامی است"),
        name:yup.string().required("نوشتن نام دوره آموزشی الزامی است"),
        image_uri:yup.string().required("نوشتن آدرس تصویر الزامی است"),
        });

    const[data, setData] = useState<ICourse>({
        description:course1.description,
        id:0,
        name:course1.name,
        image_uri:course1.image_uri,
    });

    const { control, handleSubmit,formState:{errors}, setValue } = useForm<ICourse>({
        resolver:yupResolver(schema)
    })

    const editCourseHook = useEditCourse();

    useEffect(() => {
        if(course) {
            setData(course);
        }
        setValue("description", data?.description)
        setValue("name", data?.name)
        setValue("image_uri",data?. image_uri)

    }, [course])


    const onSubmit: SubmitHandler<any> = data => {

        if(course1.id)
            editCourseHook.mutate({
                courseId:course1.id,
                description: data.description,
                name: data.name,
                image_uri:data.image_uri,
                callBack:handleClose
            });
    };
    return (
        <Dialog open={true}
                onClose={handleClose}
                sx={{padding:"10px"}}
        >
            <Box sx={{display:"flex", justifyContent:"center",padding:"20px 80px"}}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 style={{color:"success"}}>ویرایش دوره آموزشی </h4>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field}) =>   <TextField
                            sx={{display:"block", marginBottom:"20px", marginTop:"40px"}}
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
                            sx={{display:"block", marginBottom:"20px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.description}
                            {...field}
                        />}
                    />
                    {errors.description&& (<p>{errors.description.message}</p>)}
                    <Controller
                        name="image_uri"
                        control={control}
                        render={({ field }) =>  <TextField
                            sx={{display:"block", marginBottom:"20px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.image_uri}
                            {...field}
                        />}
                    />
                    {errors.image_uri && (<p>{errors.image_uri.message}</p>)}

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
