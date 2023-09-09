import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Tab from '@mui/material/Tab';
import {IconButton, Pagination, Tabs, Typography} from '@mui/material';
import {UserTopic} from "../../UserTopic/UserTopic";
import {useGetDescriptionByTopic} from "../../../Hook/Topic/useDescriptionByTopic";
import {AddComment} from "../../Comment/AddComment";
import {ShowComment} from "../../Comment/ShowComment";
import {AddQuestion} from "../../Question/AddQuestion";
import {ShowQuestion} from "../../Question/ShowQuestion";
import CloseIcon from '@mui/icons-material/Close';
import {useGetQuestion} from "../../../Hook/Question/useGetQuestion";
import {Answers} from "../../Answers/Answers";
import {ChangeEvent, useEffect, useState} from "react";
import {useGetComment} from "../../../Hook/Comment/useGetComment";
import {useGetUser} from "../../../Hook/User/useGetUser";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
interface IProps {
    topicId: number;
    handleClose: () => void;
    refetchUserTopic: any
}

const questionPageSize = 4;
const commentPageSize = 3;

export const DescriptionTopic=(props:IProps)=> {

    const{topicId,handleClose, refetchUserTopic}=props;
    const [value, setValue] = React.useState(0);
    const [questionId,setQuestionId]=React.useState<number>(0)
    const [questionPageNumber, setQuestionPageNumber] = useState(0);
    const [commentPageNumber, setCommentPageNumber] = useState(0);
    const [userId, setUserId] = useState<number | null>(null);

    const listCommentHook = useGetComment(topicId,commentPageNumber,commentPageSize);
    const listQuestionHook=useGetQuestion(topicId, questionPageNumber, questionPageSize);
    const descriptionTopicHook =useGetDescriptionByTopic(topicId)
    const listUsersHook = useGetUser();

    useEffect(() => {
        if (listUsersHook?.data?.length)
            listUsersHook?.data?.forEach((user) => {
                setUserId(user?.id)
            })
    }, [listUsersHook])

    useEffect(() => {
        listQuestionHook.refetch();
    }, [questionPageNumber])

    useEffect(() => {
        listCommentHook.refetch();
    }, [commentPageNumber])

    const handleChangeQuestionPage = (event: ChangeEvent<any>, newPage: number,) => setQuestionPageNumber(newPage - 1);
    const handleChangeCommentPage = (event: ChangeEvent<any>, newPage: number,) => setCommentPageNumber(newPage - 1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    let description: string = "";
    if (descriptionTopicHook.data?.length) {
        description = descriptionTopicHook.data;
    }
    useEffect(() => {
        if (listQuestionHook?.data?.questionTopic?.length)
            listQuestionHook?.data?.questionTopic?.forEach((question) => {
                setQuestionId(question?.id)
            })
    }, [listQuestionHook])

    return (
        <Drawer open={true} onClose={handleClose} variant="temporary"
                sx={{"& .MuiDrawer-paper":{
                    maxWidth:"600px",
                        minWidth:"600px",
                        padding:"0px 20px"
                    }
                }}
        >
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1}}>
                    <Tabs value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          textColor="inherit"

                    >
                        <Tab label="پاسخ" {...a11yProps(0)} sx={{marginLeft:"35px"}}/>
                        <Tab label="نظرات" {...a11yProps(1)} sx={{marginLeft:"35px"}}/>
                        <Tab label="توضیحات" {...a11yProps(2)} sx={{marginLeft:"35px"}}/>
                        {localStorage.getItem('POD_APP:USER_ROLE') === "ADMIN" ?  <Tab label="سوالات" {...a11yProps(3)} sx={{marginLeft:"35px"}}/> : null}

                        <Box sx={{textAlign:"center"}}>
                            <IconButton onClick={handleClose}> <CloseIcon />  </IconButton>
                        </Box>
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <div style={{maxWidth:"500px"}}>
                      <Answers topicId={topicId} page={questionPageNumber} onPageChange={handleChangeQuestionPage} pageSize={questionPageSize} count={listQuestionHook?.data?.count!}/>
                    </div>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <div style={{textAlign:"center",maxWidth:"500px"}}>
                        <AddComment topicId={topicId} refetch={listCommentHook.refetch}/>
                    </div>
                    <div style={{marginBottom:"50px",maxWidth:"500px"}}>
                        <ShowComment topicId={topicId} page={commentPageNumber} onPageChange={handleChangeCommentPage} pageSize={commentPageSize}/>
                    </div>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <div style={{textAlign:"center",marginBottom:"50px",marginRight:"65px",maxWidth:"500px"}}>
                        <UserTopic topicId={topicId} userId={userId} refetch={refetchUserTopic}/>
                    </div>
                    <Typography sx={{color:"grey",textAlign:"center",marginBottom:"50px",marginTop:"50px",maxWidth:"500px"}}>{description}</Typography>
                </CustomTabPanel>

                {localStorage.getItem('POD_APP:USER_ROLE') === "ADMIN" ?
                    <>
                        <CustomTabPanel value={value} index={3}>
                            <div style={{textAlign:"center",marginBottom:"50px",maxWidth:"500px"}}>
                                <AddQuestion topicId={topicId} refetch={listQuestionHook.refetch}/>
                            </div>
                            <div style={{textAlign:"center",marginBottom:"50px",maxWidth:"500px"}}>
                                <ShowQuestion topicId={topicId} page={questionPageNumber} onPageChange={handleChangeQuestionPage} pageSize={questionPageSize} count={listQuestionHook?.data?.count!}/>
                            </div>
                        </CustomTabPanel>

                    </> : null
                }
            </Box>



        </Drawer>
    );
}