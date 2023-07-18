import {useGetTopic} from "../../Hook/Topic/usegetTopic";
import {useParams} from "react-router-dom";
import {ITopic} from "../../Interface/Topic.interface";
import {Fab, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Paper from '@mui/material/Paper';
import React, {useMemo, useState} from "react";
import {DescriptionTopic} from "../Topic/UserTopic/DescriptionTopic";
import {DeleteTopic} from "./DeleteTopic";
import {EditTopic} from "../Topic/EditTopic";
import "../styles.css";
import AddIcon from "@mui/icons-material/Add";
import {useGetCourse} from "../../Hook/Course/useCourse";
import {AddTopic} from "../Topic/AddTopic";


export const Topic=()=>{

    const [descriptionTopics, setDescriptionTopics] = useState<ITopic | null>(null);
    const [deleteTopic, setDeleteTopic] = useState<ITopic | null>(null);
    const [editTopic, setEditTopic] = useState<ITopic | null>(null);
    const [addTopic, setAddTopic] = useState<ITopic| null>(null);
    const [topic,setTopic]=useState<ITopic | null >(null);
    const{courseId}=useParams();
    const getTopicHook = useGetTopic(courseId);
    const[searchName,setSearchName]=useState<string>("");


    let topics: ITopic[] = [];
    if (getTopicHook.data?.length) {
        topics= getTopicHook.data;
    }

    {topics.map((topic)=>(
        setTopic(topic)
    ))}

    const handleDeleteClose = () => {
        setDeleteTopic(null);
        getTopicHook.refetch();

    }
    const handleEditClose = () => {
        setEditTopic(null);
        getTopicHook.refetch();

    }

    const handleAddClose = () => {
        setAddTopic(null);
        getTopicHook.refetch();
    }

    const handleInputChange=(event : any)=>{
        setSearchName(event.target.value);
    }

    const filteredItems=useMemo(()=>{
        if (!searchName || searchName === "")
            return topics;

        return topics?.filter((nameTopics) => (nameTopics.name.toLowerCase().includes(searchName.toLowerCase())));
    }, [topics, searchName])

    return(
        <>
            <form style={{marginTop: "40px", marginRight: "50px"}}>
                <input
                    style={{border: "1px solid #009688", backgroundColor: "#f9f9fd", padding: "8px"}}
                    name="search"
                    type="text"
                    placeholder="جستجو کنید"
                    onChange={handleInputChange}
                />
                <Fab size="medium" color="success" sx={{marginLeft:"1240px"}}>
                        <AddIcon onClick={() => setAddTopic(topic)}/>
                </Fab>

            </form>
            {
                topics.length>0 ?
                    <>
                        <TableContainer component={Paper} sx={{marginTop:"45px",backgroundColor:"#f9f9fd",height:"100vh"}}>
                            <Table sx={{minWidth: "650", border:"1px solid #CFD8DC",boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)" }} aria-label="simple table" className="container" >
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#009688"}}>Name</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#B2DFDB"}}>Group</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#E1BEE7"}}>NewTopic</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#F9D1D1"}}>Action</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredItems?.map((topic)=>(
                                        <TableRow className="style-table-hover" >
                                            <TableCell align="left" onClick={() => setDescriptionTopics(topic)} >{topic.name} </TableCell>
                                            <TableCell align="left" onClick={() => setDescriptionTopics(topic)} >{topic.group}</TableCell>
                                            <TableCell align="left" onClick={() => setDescriptionTopics(topic)} >{topic.newTopic}</TableCell>
                                            <TableCell align="left" >
                                                <IconButton >
                                                    <DeleteForeverIcon style={{color:"#CD1818", marginLeft:"20px"}} onClick={() => setDeleteTopic(topic)}/>
                                                </IconButton>
                                                <IconButton>
                                                    <BorderColorIcon style={{color:"#009688"}} onClick={() => setEditTopic(topic)} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </>




            :(

            <div style={{textAlign:"center",marginTop:"300px",height:"100vh"}}>
                <img style={{width:"450px" , borderRadius:"25px"}} src={require("../../Assets/images/error-404-not-found-1024x512.png")}/>
                <h2 style={{color:"#9C27B0"}}>موضوعی یافت نشد</h2>
            </div>


            )}

            {descriptionTopics ? <DescriptionTopic topic1={descriptionTopics} handleClose={() => setDescriptionTopics(null)} /> : null}
            {deleteTopic ? <DeleteTopic topic2={deleteTopic} handleClose={handleDeleteClose} /> : null}
            {editTopic ? <EditTopic topic={editTopic} handleClose={handleEditClose} /> : null}
            {addTopic ? <AddTopic topic={topic} handleClose={handleAddClose} /> : null}

        </>


    )

}
