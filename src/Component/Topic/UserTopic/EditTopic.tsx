import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {useEditTopic} from '../../../Hook/Topic/useEditTopic';
import {ITopic} from "../../../Interface/Topic.interface";
import {Box, Button, Dialog, MenuItem, Select, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

interface IProps{
    topic:ITopic;
    handleClose: () => void;

}

export const EditTopic = (props:IProps) => {

    const{topic,handleClose}=props;
    const[topics,setTopics]=useState<ITopic>(topic);
    const{courseId}=useParams();

    const schema=yup.object().shape({
        description:yup.string().required("نوشتن توضیحات دوره آموزشی الزامی است"),
        name:yup.string().required("نوشتن نام دوره آموزشی الزامی است"),
        newTopic:yup.boolean().required("پر کردن این فیلد الزامی است"),
        group:yup.string().required("نوشتن گروه الزامی است"),
    });

    const[data, setData] = useState<ITopic>({
        course_id:0,
        description: topic.description,
        group: topic.group,
        id: 0,
        name: topic.name,
        newTopic:topic.newTopic,
        parent_id:0,
        type: topic.type,
    });

    const { control, handleSubmit,formState:{errors}, setValue } = useForm<ITopic>({
        resolver:yupResolver(schema)
    })

    const editTopicHook = useEditTopic();

    useEffect(() => {
        if(topics) {
            setData(topics);
        }
        setValue("description", data?.description)
        setValue("name", data?.name)
        setValue("group",data?.group)
        setValue("newTopic",data?.newTopic)
        setValue("type",data?.type)

    }, [topics])


    const onSubmit: SubmitHandler<any> = data => {
        console.log('topic', topic);
        console.log('data', data);
        if(topic.id)
            editTopicHook.mutate({
                topicId:topic.id,
                description: data.description,
                name: data.name,
                group:data.group,
                newTopic:data.newTopic,
                type:data.type,
                course_id:courseId!,
                callBack:handleClose
            });
    };
    return (
        <Dialog open={true}
                onClose={handleClose}
                sx={{padding:"10px"}}
        >
            <Box sx={{display:"flex", justifyContent:"center",padding:"40px 150px"}}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 style={{color:"#009688"}}>آپدیت دوره آموزشی </h4>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field}) =>   <TextField
                            sx={{display:"block", marginBottom:"30px", marginTop:"50px"}}
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
                            sx={{display:"block",marginBottom:"30px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.description}
                            {...field}
                        />}
                    />
                    {errors.description&& (<p>{errors.description.message}</p>)}
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => <Select sx={{marginBottom:"30px"}}
                                                       labelId="demo-simple-select-label"
                                                       id="demo-simple-select"
                                                       fullWidth
                                                       defaultValue={data?.type}
                                                       {...field}
                        >

                            <MenuItem value={"MAIN"}>MAIN</MenuItem>
                            <MenuItem value={"DETAIL"}>DETAIL</MenuItem>

                        </Select>}
                    />
                    {errors.type && (<p>{errors.type.message}</p>)}

                    <Controller
                        name="group"
                        control={control}
                        render={({ field }) => <TextField
                            sx={{display:"block", marginBottom:"30px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.group}
                            {...field}
                        />}
                    />
                    {errors.group && (<p>{errors.group.message}</p>)}

                    <Controller
                        name="newTopic"
                        control={control}
                        render={({ field }) =>  <TextField
                            sx={{display:"block", marginBottom:"30px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.newTopic}
                            {...field}
                        />}
                    />
                    {errors.newTopic && (<p>{errors.newTopic.message}</p>)}



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
