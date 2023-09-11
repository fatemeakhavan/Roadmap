import {useGetQuestion} from "../../Hook/Question/useGetQuestion";
import {IQuestion} from "../../Interface/Question.interface";
import {Box, IconButton, Pagination, Typography} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from "react";
import {DeleteQuestion} from "./DeleteQuestion";
import {EditQuestion} from "./EditQuestion";
import AddCommentIcon from '@mui/icons-material/AddComment';
import {CorrectAnswer} from "./CorrectAnswer";
import * as React from "react";



interface IProps {
    topicId: number,
    page: number,
    onPageChange:any,
    pageSize: number;
    count: number;
}

export const ShowQuestion = (props: IProps) => {
    const {topicId, page,onPageChange, pageSize, count} = props;
    const listQuestionHook = useGetQuestion(topicId, page, 4);
    const [deleteQuestion, setDeleteQuestion] = useState<number | null>(null);
    const [editQuestion,setEditQuestion]= useState<IQuestion| null>(null);
    const [addCorrectAnswer,setAddCorrectAnswer]=useState<IQuestion | null>(null);


    let questions: IQuestion[] = [];
    if (listQuestionHook.data?.questionTopic?.length) {
        questions = listQuestionHook?.data?.questionTopic;
    }
    console.log('questions', questions);
    const handleDeleteClose = () => {
        setDeleteQuestion(null);
        listQuestionHook.refetch()
    }
    const handleEditClose = () => {
        setEditQuestion(null);
        listQuestionHook.refetch()
    }
    const handleClose=()=>{
        setAddCorrectAnswer(null) ;
        listQuestionHook.refetch()
    }
    const reverse = (array: any) => array.map((item: any, index: number) => array[array.length - 1 - index])

    return (
        <>
            {
                (reverse(questions) as IQuestion[])
                 .map((question) => (
                    <>
                        <Box display={'flex'} sx={{justifyContent: 'space-between', border: '1px solid #e0e0e0',padding:"5px 15px", marginTop:"25px"}}>
                            <Typography variant="h6" sx={{color:"#424242"}}>
                                {question?.context}

                            </Typography>
                            <div style={{display: 'flex' , justifyContent: 'space-between',padding:"5px 15px"}}>
                                <IconButton>
                                    <DeleteForeverIcon
                                        sx={{fontSize: "18px", color: "red"}}
                                        onClick={() => setDeleteQuestion(question.id)}
                                    />
                                </IconButton>
                                <IconButton>
                                    <EditIcon
                                        sx={{fontSize: "18px",color:"#009688"}}
                                        onClick={()=>setEditQuestion(question)}
                                    />
                                </IconButton>
                                {question.correctAnswer === null ?
                                    <IconButton>
                                        <AddCommentIcon
                                            sx={{fontSize: "18px",color:"#263238"}}
                                            onClick={()=>setAddCorrectAnswer(question)}
                                        />
                                    </IconButton> : null
                                }

                            </div>
                        </Box>
                       {
                           question.correctAnswer !== null ?
                           <Box display={'flex'} sx={{justifyContent: 'space-between', border: '1px solid #b2dfdb',padding:"5px 15px",marginBottom:"50px",backgroundColor:"#e0f2f1"}}>
                           <Typography variant="h6" sx={{color:"#424242"}}>
                           {question.correctAnswer}
                           </Typography>

                           </Box> : null
                       }

                    </>


                )
            )}
            {count/pageSize > 1 &&
            <Pagination
                sx={{marginTop:"30px"}}
                count={Math.ceil(count / pageSize)}
                page={page + 1}
                onChange={onPageChange}
                style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}
            />}
            {deleteQuestion ? <DeleteQuestion id={deleteQuestion} handleClose={handleDeleteClose}/> : null}
            {editQuestion ? <EditQuestion question={editQuestion} handleClose={handleEditClose }/> : null }
            {addCorrectAnswer ? <CorrectAnswer question={addCorrectAnswer} handleClose={handleClose } />: null}


        </>
    )
}