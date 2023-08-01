import {useGetComment} from "../../Hook/Comment/useGetComment";
import {IComment} from "../../Interface/Comment.interface";
import {IconButton, Typography} from "@mui/material";
import { grey } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";
import {DeleteComment} from "./DeleteComment";
import {EditComment} from "./EditComment";


interface IProps{
    topicId:number;
}

export const ShowComment=(props:IProps)=>{
    const{topicId}=props;
    const[deleteComment,setDeleteComment]=useState<number | null>(null)
    const[editComment,setEditComment]=useState<IComment | null >(null)
    const listCommentHook = useGetComment(topicId);

    const handleDeleteClose = () => {
        setDeleteComment(null);
        listCommentHook .refetch();
    }
    const handleEditClose = () => {
        setEditComment(null);
        listCommentHook .refetch();
    }

    let comments: IComment[] = [];
    if (listCommentHook .data?.length) {
        comments = listCommentHook?.data;
    }
    console.log('comments', comments)
    return(
        <>
            {comments.map((comment)=>(
                <Typography variant="h6" style={{color:grey[500]}}>
                    {comment?.context}
                   <IconButton><DeleteForeverIcon sx={{fontSize:"18px", color:"red"}} onClick={() =>setDeleteComment(comment.id)}/></IconButton>
                    <IconButton><EditIcon sx={{fontSize:"18px"}} onClick={() =>setEditComment(comment)}/></IconButton>


                </Typography>
                )

            )}
            {deleteComment ? <DeleteComment handleClose={handleDeleteClose} id={deleteComment}/> : null }
            {editComment ? <EditComment comment={editComment} handleClose={handleEditClose} topicId={topicId}/>: null }

        </>
    )
}