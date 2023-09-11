import {useGetQuestion} from "../../Hook/Question/useGetQuestion";
import {IQuestion} from "../../Interface/Question.interface";
import {Avatar, Box, IconButton, Pagination, Stack, Typography} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddCommentIcon from "@mui/icons-material/AddComment";
import {IAnswer} from "../../Interface/Answer.interface";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {AddAnswer} from "./AddAnswer";
import {DeleteAnswer} from "./DeleteAnswer";
import {EditAnswer} from "./EditAnswer";
import UserContext from "../../Context/UserContext";


interface IProps{
    topicId:number;
    page: number;
    onPageChange: any;
    pageSize: number;
    count: number;
}


export const Answers =(props:IProps)=>{
    const{topicId, page, onPageChange, pageSize, count}=props;
    const[addAnswer,setAddAnswer]=useState<number | null>(null);
    const[editAnswer,setEditAnswer]=useState<IAnswer | null>(null);
    const[deleteAnswer,setDeleteAnswer]=useState<number | null >(null)
    const listQuestionHook=useGetQuestion(topicId, page, pageSize);
    const {userInfo} = useContext(UserContext);

    let questions: IQuestion[] = [];
    if (listQuestionHook.data?.questionTopic?.length) {
        questions = listQuestionHook?.data?.questionTopic;
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
                              <Stack direction="row" spacing={1} sx={{
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                              }}>
                                  <Avatar src="/broken-image.jpg" sx={{width: 25, height: 25}}/>
                                  <Typography sx={{color:"#424242"}}>{answerQuestion.user_firstname}</Typography>
                              </Stack>
                              {userInfo?.id === answerQuestion.user_id ?
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
                                  </div> : null
                              }


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

            {count/pageSize > 1 &&
            <Pagination
                sx={{marginTop:"30px"}}
                count={Math.ceil(count / pageSize)}
                page={page + 1}
                onChange={onPageChange}
                style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}
            />}

            {addAnswer ? <AddAnswer questionId={addAnswer} handleClose={handleClose}/> : null}
            {deleteAnswer ? <DeleteAnswer answerId={deleteAnswer} handleClose={handleDeleteClose}/>: null}
            {editAnswer ? <EditAnswer answerQuestion={editAnswer} handleClose={handleEditClose} questionId={addAnswer} />: null}


        </>
    )

}