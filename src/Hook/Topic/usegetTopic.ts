import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {ITopicGet} from '../../Interface/TopicGet.interface';

export const useGetTopic=(courseId: any, userId:number | null) => {
    return useQuery(
        `topic`,
        async () => {
            let topicResult: IRoadmapResult<ITopicGet[]>;
            let topic: ITopicGet[] = [];
            [topicResult] = await getTopic(courseId,userId);
            if (topicResult) {
                topic = topicResult.result;
            }
            return topic;
        },
        {
            retry: false,
            onSuccess: () => {},
            enabled: !!userId
        },
    );
}

const getTopic = (courseId: any,userId:number |null): Promise<[IRoadmapResult<ITopicGet[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const topicResult = await RoadmapsQuery< ITopicGet[]>({
                url: `/api/topics/levelOneByCourse/${courseId}`,
                method: ERequest.GET,
                params:{
                    userId,
                }

            });
            resolve([ topicResult ]);
        } catch (error) {
            reject(error);
        }
    });
};
