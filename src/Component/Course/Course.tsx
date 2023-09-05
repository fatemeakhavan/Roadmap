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
import {IUserMe} from "../../Interface/UserMe.interface";
import {useState} from "react";
import {DeleteCourse} from "./DeleteCourse";
import {EditCourse} from "./EditCourse";
import "./style.css";


interface IProps {
    filteredItems: ICourse[];
    refetch: any;

}

export const Course: React.FunctionComponent<IProps> = (props) => {
    const {filteredItems, refetch} = props;
    const [deleteCourse, setDeleteCourse] = useState<ICourse | null>(null);
    const [editCourse, setEditCourse] = useState<ICourse | null>(null);
    const [role, setRole]=useState<number | null>(null);



    const handleDeleteClose = () => {
        setDeleteCourse(null);
        refetch();

    }
    const handleEditClose = () => {
        setEditCourse(null);
        refetch();
    }




    return (
        <>

            {
                filteredItems?.map((course) => (
                    <Card sx={{maxWidth: 345, marginLeft: "20px", marginBottom: "15px", marginTop: "15px"}}
                          className="style-card-hover">
                        <Link to={`/topics/topicsByCourseId/${course.id}`} className="link_style">
                            <CardMedia
                                component="img"
                                alt="تصویر عکس"
                                height="140"
                                image={course.image_uri ? course.image_uri : (require("../../Assets/images/net.jpg"))}

                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {course.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {course.description}
                                </Typography>
                            </CardContent>
                        </Link>
                        <CardActions>
                            <Link to={`/topics/topicsByCourseId/${course.id}`}>
                                <Button size="small" variant="outlined" color="success"
                                        sx={{marginTop: "10px", marginBottom: "10px"}}>اطلاعات بیشتر</Button>
                            </Link>

                            {
                                localStorage.getItem('POD_APP:USER_ROLE') === "ADMIN" ?
                                <>
                                    <Link to={`/AdminTable/${course.id}`}>
                                        <Button size="small" variant="outlined" color="success"
                                                sx={{marginTop: "10px", marginBottom: "10px", marginRight: "60px"}}>پنل
                                            ادمین</Button>
                                    </Link>
                                    <IconButton aria-label="edit">
                                        <BorderColorIcon style={{color: "#009688"}}
                                                         onClick={() => setEditCourse(course)}/>
                                    </IconButton>
                                    <IconButton aria-label="delete course">
                                        <DeleteForeverIcon style={{color: "#CD1818"}}
                                                           onClick={() => setDeleteCourse(course)}/>
                                    </IconButton>


                                </> : null}
                        </CardActions>
                    </Card>
                ))
            }

            {editCourse ? <EditCourse course1={editCourse} handleClose={handleEditClose}/> : null}
            {deleteCourse ? <DeleteCourse course={deleteCourse} handleClose={handleDeleteClose}/> : null}


        </>


    );
}
