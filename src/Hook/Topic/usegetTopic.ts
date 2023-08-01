import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {ITopicGet} from '../../Interface/TopicGet.interface';

export const useGetTopic=(courseId: any) => {
    return useQuery(
        `topic`,
        async () => {
            let topicResult: IRoadmapResult<ITopicGet[]>;
            let topic: ITopicGet[] = [];
            [topicResult] = await getTopic(courseId);
            if (topicResult) {
                topic = topicResult.result;
            }
            return topic;
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getTopic = (courseId: any): Promise<[IRoadmapResult<ITopicGet[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const topicResult = await RoadmapsQuery< ITopicGet[]>({
                url: `/api/topics/levelOneByCourse/${courseId}`,
                method: ERequest.GET,

            });
            resolve([ topicResult ]);
        } catch (error) {
            reject(error);
        }
    });
};
