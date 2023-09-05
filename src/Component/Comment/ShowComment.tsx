import {useGetComment} from "../../Hook/Comment/useGetComment";
import {IComment} from "../../Interface/Comment.interface";
import {Avatar, Box, Divider, IconButton, Pagination, Stack, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import React, {useState} from "react";
import {DeleteComment} from "./DeleteComment";
import {EditComment} from "./EditComment";


interface IProps {
    topicId: number;
    page:number;
    onPageChange:any;
    pageSize: number;
}

export const
    ShowComment = (props: IProps) => {
        const {topicId,page,onPageChange, pageSize} = props;
        const [deleteComment, setDeleteComment] = useState<number | null>(null);
        const [editComment, setEditComment] = useState<IComment | null>(null);
        const listCommentHook = useGetComment(topicId,page,pageSize);

        const handleDeleteClose = () => {
            setDeleteComment(null);
            listCommentHook.refetch();
        }
        const handleEditClose = () => {
            setEditComment(null);
            listCommentHook.refetch();
        }

        const reverse = (array: any) => array.map((item: any, index: number) => array[array.length - 1 - index])

        let comments: IComment[] = [];
        if (listCommentHook.data?.length)
            comments = listCommentHook?.data;

        return (
            <>
                {
                    (reverse(comments) as IComment[])
                        .map((comment) => (
                            <>
                                    <Box  sx={{marginBottom: "25px",border:"1px solid #bdbdbd",paddingTop:"0px",paddingBottom:"10px",borderRadius:"10px", padding: '7px'}}>
                                        <div style={{display:"flex", justifyContent: 'space-between', paddingBottom: '7px'}}>
                                            <Stack direction="row" spacing={1} sx={{
                                                justifyContent: 'flex-start',
                                                alignItems: 'center',
                                            }}>
                                                <Avatar src="/broken-image.jpg" sx={{width: 25, height: 25}}/>
                                                <Typography sx={{fontSize:"13px", fontWeight: 'bold', textAlign: 'start'}}>فاطمه اخوان</Typography>
                                            </Stack>
                                            <div>
                                            <IconButton><DeleteForeverIcon sx={{fontSize: "18px", color: "red"}} onClick={() => setDeleteComment(comment.id)}/></IconButton>
                                            <IconButton><EditIcon sx={{fontSize: "18px"}} onClick={() => setEditComment(comment)}/></IconButton>
                                            </div>

                                        </div>
                                        <Typography>{comment.context}</Typography>
                                    </Box>

                            </>

                        ))}
                <Pagination
                    count={10}
                    page={page + 1}
                    onChange={onPageChange}
                    style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}
                />

                {deleteComment ? <DeleteComment handleClose={handleDeleteClose} id={deleteComment}/> : null}
                {editComment ? <EditComment comment={editComment} handleClose={handleEditClose} topicId={topicId}/> : null}


            </>
            // <>
            //     <Stack direction="row" spacing={1} sx={{
            //         marginBottom: "5px",
            //         marginTop: "25px",
            //         justifyContent: 'flex-end',
            //         position: "relative",
            //         left: 10
            //     }}>
            //         <Typography variant="h6">F.avn</Typography>
            //         <Avatar src="/broken-image.jpg" sx={{width: 30, height: 30}}/>
            //     </Stack>
            //     <Box sx={{border: "1px solid #9E9E9E", padding: "15px 8px", borderRadius: "12px"}}>
            //         <Typography variant="h6" style={{color: "#424242"}}>
            //             {comment?.context}
            //         </Typography>
            //     </Box>
            //     <Box sx={{marginRight: "200px", marginBottom: "25px"}}>
            //         <IconButton><DeleteForeverIcon sx={{fontSize: "18px", color: "red"}}
            //                                        onClick={() => setDeleteComment(comment.id)}/></IconButton>
            //         <IconButton><EditIcon sx={{fontSize: "18px"}}
            //                               onClick={() => setEditComment(comment)}/></IconButton>
            //     </Box>
            //     <Divider light/>
            // </>
        )
    }