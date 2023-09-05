import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import {useAddTopic} from '../../../Hook/Topic/useAddTopic';
import {ITopicAdd} from "../../../Interface/Topic.interface";
import {Box, Button, Dialog,TextField} from "@mui/material";
import {useParams} from "react-router-dom";


interface IProps{
    handleClose: () => void;
}

export const AddTopic = (props:IProps) => {
    const{handleClose}=props;
    const{courseId}=useParams();

    const schema=yup.object().shape({
        name:yup.string().required("نوشتن نام دوره آموزشی الزامی است"),
        description:yup.string().required("نوشتن توضیحات الزامی می باشد."),
        level:yup.number().required("نوشتن سطح آن الزامی است"),
        order:yup.number().required("نوشتن آن الزامی است"),
        parent_id:yup.number().required("نوشتن آن الزامی میباشد")

    });


    const {control, handleSubmit,formState:{errors} } = useForm<ITopicAdd>({
        defaultValues:{},
        resolver:yupResolver(schema)
    });
    const addTopicHook =useAddTopic();


    const onSubmit: SubmitHandler<ITopicAdd> = data => {
        addTopicHook.mutate({
                name: data.name,
                description: data.description,
                course_id:courseId!,
                level:data.level,
                order:data.order,
                parent_id:data.parent_id,
                callBack:handleClose
            }

        );
    };
    return (
        <Dialog open={true}
                onClose={handleClose}
                sx={{padding:"10px"}}
        >
            <Box sx={{display:"flex", justifyContent:"center",padding:"20px 80px"}}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 style={{color:"#009688"}}>افزودن دوره آموزشی </h4>
                    <Controller

                        name="name"
                        control={control}
                        render={({ field }) =>   <TextField
                            sx={{display:"block", marginBottom:"20px", marginTop:"30px"}}
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
                            sx={{display:"block", marginBottom:"20px"}}
                            id="outlined-basic"
                            label="توضیحات"
                            variant="outlined"
                            multiline
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
                            label="سطح"
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
                            sx={{display:"block", marginBottom:"20px"}}
                            id="outlined-basic"
                            label="شمارنده"
                            variant="outlined"
                            multiline
                            {...field}
                        />}
                    />
                    {errors.order && (<p>{errors.order.message}</p>)}
                    <Controller
                        name="parent_id"
                        control={control}
                        render={({ field }) =>  <TextField
                            sx={{display:"block", marginBottom:"20px"}}
                            id="outlined-basic"
                            label="آیدی والد"
                            variant="outlined"
                            multiline
                            {...field}
                        />}
                    />
                    {errors.parent_id && (<p>{errors.parent_id.message}</p>)}


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
