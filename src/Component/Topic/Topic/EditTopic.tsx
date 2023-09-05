import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {useEditTopic} from '../../../Hook/Topic/useEditTopic';
import {ITopicGet} from "../../../Interface/TopicGet.interface";
import {Box, Button, Dialog, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ITopic} from "../../../Interface/Topic.interface";
import {useGetDescriptionByTopic} from "../../../Hook/Topic/useDescriptionByTopic";


interface IProps{
    topic_id:ITopicGet;
    handleClose: () => void;
}

export const EditTopic = (props:IProps) => {

    const{topic_id,handleClose}=props;
    const[topics,setTopics]=useState<ITopicGet>(topic_id);
    const{courseId}=useParams();
    const descriptionTopicHook =useGetDescriptionByTopic(topic_id.id)

    let description: string = "";
    if (descriptionTopicHook.data?.length) {
        description = descriptionTopicHook.data;
    }


    const schema=yup.object().shape({
        name:yup.string().required("نوشتن نام دوره آموزشی الزامی است"),
        description:yup.string().required("نوشتن توضیحات الزامی می باشد."),
        level:yup.number().required("نوشتن سطح آن الزامی است"),
        order:yup.number().required("نوشتن آن الزامی است"),

    });

    const[data, setData] = useState<ITopic>({
        id: 0,
        name:topic_id.name,
        description: description,
        level: topic_id.level,
        order: topic_id.order,

    });


    const { control, handleSubmit,formState:{errors}, setValue } = useForm<ITopic>({
        resolver:yupResolver(schema)
    })

    const editTopicHook = useEditTopic();

    useEffect(() => {
        setValue("name", data?.name)
        setValue("description",data?.description)
        setValue("level",data?.level)
        setValue("order",data?.order)

    }, [topics])


    const onSubmit: SubmitHandler<any> = data => {
        if(topic_id.id)
            editTopicHook.mutate({
                topicId:topic_id.id,
                course_id:courseId!,
                name: data.name,
                description: data.description,
                level:data.level,
                order:data.order,
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
                    <h4 style={{color:"#009688"}}>آپدیت دوره آموزشی </h4>
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
                        render={({ field}) =>   <TextField
                            sx={{display:"block", marginBottom:"20px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.description}
                            {...field}
                        />}
                    />
                    {errors.description && (<p>{errors.description.message}</p>)}
                    <Controller
                        name="level"
                        control={control}
                        render={({ field }) =>  <TextField
                            sx={{display:"block", marginBottom:"20px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.level}
                            {...field}
                        />}
                    />
                    {errors.level && (<p>{errors.level.message}</p>)}

                    <Controller
                        name="order"
                        control={control}
                        render={({ field }) =>  <TextField
                            sx={{display:"block", marginBottom:"20px"}}
                            id="outlined-basic"
                            variant="outlined"
                            multiline
                            defaultValue={data?.order}
                            {...field}
                        />}
                    />
                    {errors.order && (<p>{errors.order.message}</p>)}

                    <Button type="submit" variant="outlined" color="success"  sx={{marginRight:"5px"}}>ویرایش کردن</Button>
                    <Button
                        onClick={handleClose}
                        color="warning"
                        variant="outlined"
                        sx={{marginLeft:"5px"}}
                    >
                        منصرف شدن
                    </Button>

                </form>
            </Box>
        </Dialog>
    )};
