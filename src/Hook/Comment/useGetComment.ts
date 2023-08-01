import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IComment} from "../../Interface/Comment.interface";

export const useGetComment=(topicId: number | null) => {
    return useQuery(
        `commentByTopic`,
        async () => {
            let commentResult: IRoadmapResult<IComment[]>;
            let commentTopic: IComment[] = [];
            [commentResult] = await getCommentByTopic(topicId);
            if (commentResult) {
                commentTopic = commentResult.result;
            }
            return commentTopic;
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getCommentByTopic = (topicId: any): Promise<[IRoadmapResult<IComment[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const commentResult = await RoadmapsQuery<IComment[]>({
                url: `/api/comments/toTopic/${topicId}`,
                method: ERequest.GET,
            });
            resolve([ commentResult ]);
        } catch (error) {
            reject(error);
        }
    });
};