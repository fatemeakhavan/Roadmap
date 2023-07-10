import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ICourse} from "../../Interface/Course.interface";
import {Link} from "react-router-dom";
import "../styles.css";
import {IconButton} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useState} from "react";
import {useGetCourse} from "../../Hook/Course/useCourse";
import {DeleteCourse} from "./DeleteCourse";
import {EditCourse} from "./EditCourse";


interface IProps{
    filteredItems:ICourse[];
}
export const Course: React.FunctionComponent<IProps> = (props) => {

    const [deleteCourse, setDeleteCourse] = useState<ICourse | null>(null);
    const [editCourse, setEditCourse] = useState<ICourse | null>(null);
    const {filteredItems} =props;

    const listCourseHook=useGetCourse();


    let courses: ICourse[] = [];
    if (listCourseHook.data?.length) {
        courses = listCourseHook.data;
    }

    const handleDeleteClose = () => {
        setDeleteCourse(null);
        listCourseHook.refetch();

    }
    const handleEditClose=()=>{
        setEditCourse(null);
        listCourseHook.refetch();
    }

    return (
        <>

            {
                filteredItems?.map((course) => (

                        <Card sx={{maxWidth: 345, marginLeft: "20px", marginBottom: "15px", marginTop: "15px"}}
                              className="style-card-hover" >
                            <CardMedia
                                component="img"
                                alt="تصویر عکس"
                                height="140"
                                image={course.image_uri ? course.image_uri : (require("../../Assets/images/net.jpg"))}

                            />
                            <CardContent  >
                                <Typography gutterBottom variant="h5" component="div">
                                    {course.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {course.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/topics/topicsByCourseId/${course.id}`}>
                                    <Button size="small" variant="outlined"
                                            sx={{marginTop: "10px", marginBottom: "10px"}}>اطلاعات بیشتر</Button>
                                </Link>
                                <IconButton aria-label="edit" sx={{marginLeft:"140px"}}>
                                    <BorderColorIcon style={{color:"#009688"}} onClick={() =>setEditCourse(course)} />
                                </IconButton>
                                <IconButton aria-label="delete course">
                                    <DeleteForeverIcon style={{color:"#CD1818"}} onClick={() => setDeleteCourse(course)}/>
                                </IconButton>

                            </CardActions>
                        </Card>



                ))
            }

            {editCourse ? <EditCourse course1={editCourse} handleClose={handleEditClose}/>: null}
            {deleteCourse ? <DeleteCourse course={deleteCourse} handleClose={handleDeleteClose} /> : null}


        </>



    );
}
