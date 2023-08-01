import {useGetTopic} from "../../../Hook/Topic/usegetTopic";
import {useParams} from "react-router-dom";
import {ITopicGet} from "../../../Interface/TopicGet.interface";
import {Fab, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {useMemo, useState} from "react";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {DeleteTopic} from "./DeleteTopic";
import {EditTopic} from "./EditTopic";
import {AddTopic} from "./AddTopic";


export const AdminTable=()=>{
    const {courseId} = useParams();
    const listTopicHook=useGetTopic(courseId);
    const[searchName,setSearchName]=useState<string>("");
    const [deleteTopic,setDeleteTopic]=useState<ITopicGet | null >(null);
    const [editTopic,setEditTopic]=useState<ITopicGet | null >(null);
    const [addTopic,setAddTopic]=useState<ITopicGet[] | null>(null)

    let topics: ITopicGet[] = [];
    if (listTopicHook?.data) {
        // @ts-ignore
        topics = [listTopicHook.data];
    }
    const handleInputChange=(event : any)=>{
        setSearchName(event.target.value);
    }

    const handleDeleteClose = () => {
        setDeleteTopic(null);
        listTopicHook.refetch();
    }
    const handleEditClose = () => {
        setEditTopic(null);
        listTopicHook.refetch();
    }

    const handleAddClose = () => {
        setAddTopic(null);
        listTopicHook.refetch();
    }

    const getAllChildren = (children: any, list: any, topicId: number) => {
        children?.forEach((item: any) => {
            const child = item;
            item.parent_id = topicId;

            list.push(child);

            if (item?.children?.length > 0)
                getAllChildren(item.children, list, item?.id);
        })
    }

    const allTopics = useMemo(() => {
        if (!topics) return;

        const list = [];

        list.push(topics[0]);
        getAllChildren(topics[0]?.children, list, topics[0]?.id);

        console.log('list', list);

        return list;
    }, [topics])

    const filteredItems=useMemo(()=>{
        if (!searchName || searchName === "")
            return allTopics;

        return allTopics?.filter((nameTopic) => (nameTopic.name.toLowerCase().includes(searchName.toLowerCase())));
    }, [allTopics, searchName])

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
                    <AddIcon onClick={()=>setAddTopic(topics)}/>
                </Fab>
            </form>

            {
                topics.length>0 ?
                    <>
                        <TableContainer component={Paper} sx={{marginTop:"45px",backgroundColor:"#f9f9fd",height:"100vh"}}>
                            <Table sx={{marginBottom:"100px",minWidth: "650", border:"1px solid #CFD8DC",boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)" }} aria-label="simple table" className="container" >
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#009688"}}>Name</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#B2DFDB"}}>ID</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#B2DFDB"}}>NewTopic</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#B2DFDB"}}>Group</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#B2DFDB"}}>LEVEL</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#B2DFDB"}}>ORDER</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#B2DFDB"}}>ParentID</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#E1BEE7"}}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredItems?.map((topic)=>(
                                        <>
                                            <TableRow className="style-table-hover" >
                                                <TableCell align="left">{topic.name} </TableCell>
                                                <TableCell align="left">{topic.id}</TableCell>
                                                <TableCell align="left">{topic.newTopic.toString()}</TableCell>
                                                <TableCell align="left">{topic.group}</TableCell>
                                                <TableCell align="left">{topic.level}</TableCell>
                                                <TableCell align="left">{topic.order}</TableCell>
                                                <TableCell align="left">{(topic as any).parent_id ?? 0}</TableCell>
                                                <TableCell align="left" >
                                                    <IconButton >
                                                        <DeleteForeverIcon style={{color:"#CD1818", marginLeft:"20px"}} onClick={() =>setDeleteTopic(topic)}/>
                                                    </IconButton>
                                                    <IconButton>
                                                        <BorderColorIcon style={{color:"#009688"}} onClick={() =>setEditTopic(topic)} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                                {/*{topicOne?.children.map((topicTwo)=>(*/}
                                                {/*    <>*/}
                                                {/*    <TableRow className="style-table-hover" >*/}
                                                {/*        <TableCell align="left">{topicTwo.name} </TableCell>*/}
                                                {/*        <TableCell align="left">{topicTwo.id}</TableCell>*/}
                                                {/*        <TableCell align="left">{topicTwo.newTopic}</TableCell>*/}
                                                {/*        <TableCell align="left">{topicTwo.group}</TableCell>*/}
                                                {/*        <TableCell align="left">{topicTwo.level}</TableCell>*/}
                                                {/*        <TableCell align="left">{topicTwo.order}</TableCell>*/}
                                                {/*        <TableCell align="left">{topicOne.id}</TableCell>*/}
                                                {/*        <TableCell align="left" >*/}
                                                {/*            <IconButton >*/}
                                                {/*                <DeleteForeverIcon style={{color:"#CD1818", marginLeft:"20px"}} onClick={() =>setDeleteTopic(topicTwo)} />*/}
                                                {/*            </IconButton>*/}
                                                {/*            <IconButton>*/}
                                                {/*                <BorderColorIcon style={{color:"#009688"}} onClick={() =>setEditTopic(topicTwo)} />*/}
                                                {/*            </IconButton>*/}
                                                {/*        </TableCell>*/}
                                                {/*    </TableRow>*/}
                                                {/*        {topicTwo?.children.map((topicThree)=>(*/}
                                                {/*            <>*/}
                                                {/*                <TableRow className="style-table-hover" >*/}
                                                {/*                     <TableCell align="left">{topicThree.name} </TableCell>*/}
                                                {/*                     <TableCell align="left">{topicThree.id}</TableCell>*/}
                                                {/*                     <TableCell align="left">{topicThree.newTopic}</TableCell>*/}
                                                {/*                     <TableCell align="left">{topicThree.group}</TableCell>*/}
                                                {/*                     <TableCell align="left">{topicThree.level}</TableCell>*/}
                                                {/*                     <TableCell align="left">{topicThree.order}</TableCell>*/}
                                                {/*                     <TableCell align="left">{topicTwo.id}</TableCell>*/}
                                                {/*                     <TableCell align="left" >*/}
                                                {/*                     <IconButton >*/}
                                                {/*                         <DeleteForeverIcon style={{color:"#CD1818", marginLeft:"20px"}} onClick={() =>setDeleteTopic(topicThree)}/>*/}
                                                {/*                     </IconButton>*/}
                                                {/*                     <IconButton>*/}
                                                {/*                         <BorderColorIcon style={{color:"#009688"}} onClick={() =>setEditTopic(topicThree)}/>*/}
                                                {/*                     </IconButton>*/}
                                                {/*                </TableCell>*/}
                                                {/*                </TableRow>*/}
                                                {/*            </>*/}
                                                {/*        ))}*/}
                                                {/*    </>*/}

                                                {/*))}*/}
                                        </>

                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </>

                    :(

                        <div style={{textAlign:"center",marginTop:"300px",height:"100vh"}}>
                            <img style={{width:"450px" , borderRadius:"25px"}} src={require("../../../Assets/images/error-404-not-found-1024x512.png")}/>
                            <h2 style={{color:"#9C27B0"}}> موضوعی یافت نشد.   </h2>
                        </div>


                    )}
            {deleteTopic ? <DeleteTopic topicId={deleteTopic} handleClose={handleDeleteClose} /> : null}
            {editTopic ? <EditTopic topic_id={editTopic} handleClose={handleEditClose} /> : null}
            {addTopic ? <AddTopic  handleClose={handleAddClose} /> : null}
        </>
    )
}