import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {useAddTopic} from '../../Hook/Topic/useAddTopic';
import {ITopic} from "../../Interface/Topic.interface";
import {Box, Button, Dialog,TextField} from "@mui/material";
import {useParams} from "react-router-dom";


interface IProps{
    handleClose: () => void;
    topic:ITopic | null;
}

export const AddTopic = (props:IProps) => {
    const{handleClose,topic}=props;
    const{courseId}=useParams();

    const schema=yup.object().shape({
        name:yup.string().required("نوشتن نام دوره آموزشی الزامی است"),
        description:yup.string().required("نوشتن توضیحات دوره آموزشی الزامی است"),
        group:yup.string().required("نوشتن گروه الزامی است"),
        newTopic:yup.boolean().required("پر کردن این فیلد الزامی است"),
        level:yup.number().required("نوشتن سطح آن الزامی است"),
        order:yup.number().required("نوشتن آن الزامی است"),

    });


    const {control, handleSubmit,formState:{errors} } = useForm<ITopic>({
        defaultValues:{},
        resolver:yupResolver(schema)
    });
    const addTopicHook =useAddTopic();


    const onSubmit: SubmitHandler<ITopic> = data => {
        addTopicHook.mutate({
                name: data.name,
                description: data.description,
                group:data.group,
                newTopic:data.newTopic,
                course_id:courseId!,
                level:data.level,
                order:data.order,
                parent_id:topic?.id,
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
                    <h4 style={{color:"#009688"}}>افزودن دوره آموزشی </h4>
                    <Controller

                        name="name"
                        control={control}
                        render={({ field }) =>   <TextField
                            sx={{display:"block", marginBottom:"30px", marginTop:"50px"}}
                            hiddenLabel
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
                    <Controller
                        name="newTopic"
                        control={control}
                        render={({ field }) => <TextField
                            sx={{display:"block",marginBottom:"30px"}}
                            id="outlined-basic"
                            label="newTopic"
                            variant="outlined"
                            multiline
                            {...field}
                        />}
                    />
                    {errors.newTopic && (<p>{errors.newTopic.message}</p>)}
                    <Controller
                        name="group"
                        control={control}
                        render={({ field }) =>  <TextField
                            sx={{display:"block", marginBottom:"50px"}}
                            id="outlined-basic"
                            label="group"
                            variant="outlined"
                            multiline
                            {...field}
                        />}
                    />
                    {errors.group && (<p>{errors.group.message}</p>)}
                    <Controller
                        name="level"
                        control={control}
                        render={({ field }) =>  <TextField
                            sx={{display:"block", marginBottom:"50px"}}
                            id="outlined-basic"
                            label="group"
                            variant="outlined"
                            multiline
                            {...field}
                        />}
                    />
                    {errors.level && (<p>{errors.level.message}</p>)}
                    <Controller
                        name="order"
                        control={control}
                        render={({ field }) =>  <TextField
                            sx={{display:"block", marginBottom:"50px"}}
                            id="outlined-basic"
                            label="group"
                            variant="outlined"
                            multiline
                            {...field}
                        />}
                    />
                    {errors.order && (<p>{errors.order.message}</p>)}

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
