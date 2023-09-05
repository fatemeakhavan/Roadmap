import {useGetQuestion} from "../../Hook/Question/useGetQuestion";
import {IQuestion} from "../../Interface/Question.interface";
import {Box, IconButton, Pagination, Typography} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddCommentIcon from "@mui/icons-material/AddComment";
import {IAnswer} from "../../Interface/Answer.interface";
import React, {ChangeEvent, useEffect, useState} from "react";
import {AddAnswer} from "./AddAnswer";
import {DeleteAnswer} from "./DeleteAnswer";
import {EditAnswer} from "./EditAnswer";
import {IComment} from "../../Interface/Comment.interface";
import {ITopicGet} from "../../Interface/TopicGet.interface";

interface IProps{
    topicId:number;
    page: number;
    onPageChange: any;
    pageSize: number;
}

const pageSize = 4;

export const Answers =(props:IProps)=>{
    const{topicId, page, onPageChange, pageSize}=props;
    const[addAnswer,setAddAnswer]=useState<number | null>(null);
    const[editAnswer,setEditAnswer]=useState<IAnswer | null>(null);
    const[deleteAnswer,setDeleteAnswer]=useState<number | null >(null)
    const listQuestionHook=useGetQuestion(topicId, page, pageSize);

    let questions: IQuestion[] = [];
    if (listQuestionHook.data?.length) {
        questions = listQuestionHook?.data;
    }

    const handleClose=()=>{
        setAddAnswer(null) ;
        listQuestionHook.refetch()
    }
    const handleDeleteClose = () => {
        setDeleteAnswer(null);
        listQuestionHook.refetch()
    }
    const handleEditClose=()=>{
        setEditAnswer(null);
        listQuestionHook.refetch()
    }
    const reverse = (array: any) => array.map((item: any, index: number) => array[array.length - 1 - index])

    return(
        <>
            {
                (reverse(questions) as IQuestion[])
              .map((question)=>(
              <>
                  <Box display={'flex'} sx={{justifyContent: 'space-between', border: '1px solid #e0e0e0',padding:"5px 15px", marginTop:"40px",backgroundColor:"#e0e0e0"}}>
                      <Typography variant="h6" sx={{color:"#9e9e9e"}}>
                          {question?.context}

                      </Typography>

                      {
                          question?.answers !== null ? (
                               <Box display={'flex'}>
                                    <IconButton>
                                         <AddCommentIcon
                                              sx={{fontSize:"18px"}}
                                              onClick={()=>setAddAnswer(question?.id)}
                                         />
                                    </IconButton>
                                </Box>) : null
                      }

                  </Box>
                  {
                      question.correctAnswer !== null ?
                          <Box display={'flex'} sx={{justifyContent: 'space-between', border: '1px solid #b2dfdb',padding:"5px 15px",backgroundColor:"#e0f2f1"}}>
                              <Typography variant="h6" sx={{color:"#9e9e9e"}}>
                                  {question.correctAnswer}
                              </Typography>

                          </Box> : null
                  }
                  {question?.answers?.map((answerQuestion)=>(
                      <>
                          <Box display={'flex'} sx={{justifyContent: 'space-between', border: '1px solid #e0e0e0',padding:"5px 15px",borderBottom:"none"}}>
                              <Typography sx={{color:"#424242"}}>{answerQuestion.user_lastname}</Typography>
                              <div style={{display: 'flex'}}>
                                  <IconButton>
                                      <DeleteForeverIcon
                                          sx={{fontSize: "18px", color: "red"}}
                                          onClick={() => setDeleteAnswer(answerQuestion?.id)}
                                      />
                                  </IconButton>
                                  <IconButton>
                                      <EditIcon
                                          sx={{fontSize:"18px",color:"#009688"}}
                                          onClick={()=>setEditAnswer(answerQuestion)}
                                      />
                                  </IconButton>
                              </div>

                          </Box>
                          <Box display={'flex'} sx={{justifyContent: 'space-between', border: '1px solid #e0e0e0',padding:"5px 15px",borderTop:"none",marginBottom:"50px"}}>
                              <Typography variant="h6" sx={{color:"#424242"}}>
                                  {answerQuestion?.context}
                              </Typography>
                          </Box>
                      </>

                  ))}
              </>
            ))}

            <Pagination
                count={pageSize}
                page={page + 1}
                onChange={onPageChange}
                style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}
            />

            {addAnswer ? <AddAnswer questionId={addAnswer} handleClose={handleClose}/> : null}
            {deleteAnswer ? <DeleteAnswer answerId={deleteAnswer} handleClose={handleDeleteClose}/>: null}
            {editAnswer ? <EditAnswer answerQuestion={editAnswer} handleClose={handleEditClose} questionId={addAnswer} />: null}


        </>
    )

}