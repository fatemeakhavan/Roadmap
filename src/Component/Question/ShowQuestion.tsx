import {useGetQuestion} from "../../Hook/Question/useGetQuestion";
import {IQuestion} from "../../Interface/Question.interface";
import {IconButton, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from "react";
import {DeleteQuestion} from "./DeleteQuestion";

interface IProps{
    topicId:number,
}
export const ShowQuestion=(props:IProps)=>{
    const{topicId}=props;
    const listQuestionHook=useGetQuestion(topicId);
    const[deleteQuestion,setDeleteQuestion]=useState<number | null >(null);

    let questions: IQuestion[] = [];
    if (listQuestionHook .data?.length) {
        questions= listQuestionHook?.data;
    }
    const handleDeleteClose = () => {
        setDeleteQuestion(null);
        listQuestionHook.refetch();
    }
    return(
        <>
            {questions.map((question)=>(
                <>
                    <Typography variant="h6" >
                       {question?.context}
                       <IconButton><DeleteForeverIcon sx={{fontSize:"18px", color:"red"}} onClick={() =>setDeleteQuestion(question.id)}/></IconButton>
                       <IconButton><EditIcon sx={{fontSize:"18px"}} /></IconButton>
                    </Typography>

                    <Typography variant="h6" style={{color:grey[500]}}>
                        {question?.correctAnswer}
                        <IconButton><DeleteForeverIcon sx={{fontSize:"18px", color:"red"}} onClick={() =>setDeleteQuestion(question.id)}/></IconButton>
                        <IconButton><EditIcon sx={{fontSize:"18px"}} /></IconButton>
                    </Typography>

                </>



                )

            )}
            {deleteQuestion ? <DeleteQuestion id={deleteQuestion} handleClose={handleDeleteClose} /> : null}


        </>
    )
}