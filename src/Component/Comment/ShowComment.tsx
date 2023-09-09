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

export const ShowComment = (props: IProps) => {
        const {topicId,page,onPageChange, pageSize} = props;
        const [deleteComment, setDeleteComment] = useState<number | null>(null);
        const [editComment, setEditComment] = useState<IComment | null>(null);
        const listCommentHook = useGetComment(topicId,page,pageSize);

        let comments: IComment[] = [];
        if (listCommentHook.data?.commentTopic?.length)
            comments = listCommentHook?.data?.commentTopic;

        const handleDeleteClose = () => {
            setDeleteComment(null);
            listCommentHook.refetch();
        };
        const handleEditClose = () => {
            setEditComment(null);
            listCommentHook.refetch();

        }

        const reverse = (array: any) => array.map((item: any, index: number) => array[array.length - 1 - index])

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
                                                <Typography sx={{fontSize:"13px", fontWeight: 'bold', textAlign: 'start'}}>{comment.user_firstname}</Typography>
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
                {listCommentHook?.data?.count! / pageSize > 1 &&
                <Pagination
                    count={Math.ceil(listCommentHook?.data?.count! / pageSize)}
                    page={page + 1}
                    onChange={onPageChange}
                    style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}
                />}


                {deleteComment ? <DeleteComment handleClose={handleDeleteClose} id={deleteComment}/> : null}
                {editComment ? <EditComment comment={editComment} handleClose={handleEditClose} topicId={topicId}/> : null}


            </>
        )
    }