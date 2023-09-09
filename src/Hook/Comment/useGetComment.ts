import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IComment} from "../../Interface/Comment.interface";

export const useGetComment=(topicId: number , page: number, size: number) => {
    return useQuery(
        `commentByTopic`,
        async () => {
            let commentResult: IRoadmapResult<IComment[]>;
            let commentTopic: IComment[] = [];
            let count :number = 0;
            [commentResult] = await getCommentByTopic(topicId,page,size);
            if (commentResult) {
                commentTopic = commentResult.result;
                count = commentResult.total;
            }
            return {commentTopic,count};
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getCommentByTopic = (topicId: number,page:number, size:number,): Promise<[IRoadmapResult<IComment[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('topicid', topicId);
            const commentResult = await RoadmapsQuery<IComment[]>({
                url: `/api/comments/toTopic/${topicId}?topicId=${topicId}`,
                method: ERequest.GET,
                params:{
                    page,
                    size
                }
            });
            resolve([ commentResult ]);
        } catch (error) {
            reject(error);
        }
    });
};