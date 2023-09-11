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
import {useContext, useState} from "react";
import {DeleteCourse} from "./DeleteCourse";
import {EditCourse} from "./EditCourse";
import "./style.css";
import UserContext from "../../Context/UserContext";


interface IProps {
    filteredItems: ICourse[];
    refetch: any;


}

export const Course: React.FunctionComponent<IProps> = (props) => {
    const {filteredItems, refetch} = props;
    const {userInfo} = useContext(UserContext);
    const [deleteCourse, setDeleteCourse] = useState<ICourse | null>(null);
    const [editCourse, setEditCourse] = useState<ICourse | null>(null);


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
                    <Card sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        maxWidth: "22%",
                        minWidth: "300px",
                        marginLeft: "1%",
                        marginBottom: "5%"
                    }}
                          className="style-card-hover">
                        <Link to={`/topics/topicsByCourseId/${course.id}`} className="link_style">
                            <CardMedia
                                component="img"
                                alt="تصویر عکس"
                                height="140"
                                image= {course.image_uri}

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
                        <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <Link to={`/topics/topicsByCourseId/${course.id}`}>
                                    <Button size="small" variant="outlined" color="success"
                                            sx={{marginTop: "10px", marginBottom: "10px", whiteSpace: 'nowrap', marginRight: "5px"}}>اطلاعات
                                        بیشتر</Button>
                                </Link>
                                {userInfo?.roles?.length! > 1 ?
                                <Link to={`/AdminTable/${course.id}`}>
                                    <Button size="small" variant="outlined" color="success"
                                            sx={{marginTop: "10px", marginBottom: "10px"}}>پنل ادمین</Button>
                                </Link> : null
                                }
                            </div>


                            {userInfo?.roles?.length! > 1?
                                <div>
                                    <IconButton aria-label="edit" sx={{marginRight: "5px"}}>
                                        <BorderColorIcon style={{color: "#009688"}}
                                                         onClick={() => setEditCourse(course)}/>
                                    </IconButton>
                                    <IconButton aria-label="delete course">
                                        <DeleteForeverIcon style={{color: "#CD1818"}}
                                                           onClick={() => setDeleteCourse(course)}/>
                                    </IconButton>

                                </div>

                                : null}

                        </CardActions>
                    </Card>
                ))
            }

            {editCourse ? <EditCourse course1={editCourse} handleClose={handleEditClose}/> : null}
            {deleteCourse ? <DeleteCourse course={deleteCourse} handleClose={handleDeleteClose}/> : null}


        </>


    );
}
