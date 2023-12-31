import {useGetTopic} from "../../../Hook/Topic/usegetTopic";
import {useParams} from "react-router-dom";
import {ITopicGet} from "../../../Interface/TopicGet.interface";
import {
    Fab,
    IconButton, Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {ChangeEvent, useContext, useEffect, useMemo, useState} from "react";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {DeleteTopic} from "./DeleteTopic";
import {EditTopic} from "./EditTopic";
import {AddTopic} from "./AddTopic";
import Spinner from "../../../Spinner/Spinner";
import UserContext from "../../../Context/UserContext";


export const AdminTable = () => {
    const {courseId} = useParams();
    const [searchName, setSearchName] = useState<string>("");
    const [deleteTopic, setDeleteTopic] = useState<ITopicGet | null>(null);
    const [editTopic, setEditTopic] = useState<ITopicGet | null>(null);
    const [addTopic, setAddTopic] = useState<ITopicGet[] | null>(null)
    const [topics, setTopics] = useState<any>([]);
    const [page, setPage] = useState(1);
    const {userInfo} = useContext(UserContext);
    const pageSize = 9;

    const handleChangePage = (event: ChangeEvent<any>, newPage: number,) => setPage(newPage);

    const listTopicHook = useGetTopic(courseId,userInfo?.id!);


    useEffect(() => {
        if (listTopicHook?.data)
            setTopics([listTopicHook?.data])
    }, [listTopicHook?.data])

    const handleInputChange = (event: any) => {
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

        return list;
    }, [topics])

    const filteredItems = useMemo(() => {
        if (!searchName || searchName === "")
            return allTopics;

        return allTopics?.filter((nameTopic) => (nameTopic.name.toLowerCase().includes(searchName.toLowerCase())));
    }, [allTopics, searchName])

    const paginatedItems = useMemo(() => {
        if (!filteredItems) return;
        const temp = [...filteredItems];

        return temp.slice((page - 1) * pageSize, page * pageSize)
    }, [filteredItems, page])

    const renderList = () => {
        switch (listTopicHook.status) {
            case "success":
                return (
                    <>
                        <TableContainer component={Paper}
                                        sx={{marginTop: "3%", backgroundColor: "#f9f9fd", height: "100vh"}}>
                            <Table sx={{
                                marginBottom: "20px",
                                width: "90%",
                                border: "1px solid #CFD8DC",
                                boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
                            }} aria-label="simple table" className="container">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"
                                                   sx={{fontSize: "25px", backgroundColor: "#009688"}}>نام</TableCell>
                                        <TableCell align="left"
                                                   sx={{fontSize: "25px", backgroundColor: "#80cbc4"}}>آیدی</TableCell>
                                        <TableCell align="left"
                                                   sx={{fontSize: "25px", backgroundColor: "#e0f2f1"}}>سطح</TableCell>
                                        <TableCell align="left"
                                                   sx={{
                                                       fontSize: "25px",
                                                       backgroundColor: "#ffebee"
                                                   }}>شمارنده</TableCell>
                                        <TableCell align="left" sx={{fontSize: "25px", backgroundColor: "#ffcdd2"}}>آیدی
                                            والد</TableCell>
                                        <TableCell align="left"
                                                   sx={{
                                                       fontSize: "25px",
                                                       backgroundColor: "#ef9a9a"
                                                   }}>عملیات</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedItems?.map((topic) => (
                                        <>
                                            <TableRow className="style-table-hover">
                                                <TableCell align="left">{topic?.name} </TableCell>
                                                <TableCell align="left">{topic?.id}</TableCell>
                                                <TableCell align="left">{topic?.level}</TableCell>
                                                <TableCell align="left">{topic?.order}</TableCell>
                                                <TableCell align="left">{(topic as any)?.parent_id ?? 0}</TableCell>
                                                <TableCell align="left">
                                                    <IconButton sx={{marginLeft: "20px"}}>
                                                        <DeleteForeverIcon style={{color: "#CD1818"}}
                                                                           onClick={() => setDeleteTopic(topic)}/>
                                                    </IconButton>
                                                    <IconButton>
                                                        <BorderColorIcon style={{color: "#009688"}}
                                                                         onClick={() => setEditTopic(topic)}/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>

                                        </>

                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                count={Math.ceil(filteredItems?.length! / pageSize)}
                                page={page}
                                onChange={handleChangePage}
                                style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}
                            />
                        </TableContainer>
                    </>
                );
                break;
            case "loading":
                return <Spinner/>;
                break;
            case "idle":
                return <Spinner/>;
                break;
            case "error":
                return <p>not found</p>
        }
    }

    return (
        <>
            <form style={{
                marginTop: "2%",
                marginRight: "7%",
                marginLeft: "5%",
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <input
                    style={{border: "1px solid #009688", backgroundColor: "#f9f9fd", padding: "8px"}}
                    name="search"
                    type="text"
                    placeholder="جستجو کنید"
                    onChange={handleInputChange}
                />
                <Fab size="medium" color="success">
                    <AddIcon onClick={() => setAddTopic(topics)}/>
                </Fab>
            </form>
            {renderList()}
            {deleteTopic ? <DeleteTopic topicId={deleteTopic} handleClose={handleDeleteClose}/> : null}
            {editTopic ? <EditTopic topic_id={editTopic} handleClose={handleEditClose}/> : null}
            {addTopic ? <AddTopic handleClose={handleAddClose}/> : null}
        </>
    )
}