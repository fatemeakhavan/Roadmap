import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { ITopic} from '../../Interface/Topic.interface';

export const useGetTopic=(courseId: any) => {
    return useQuery(
        `topic`,
        async () => {
            let topicResult: IRoadmapResult<ITopic[]>;
            let topic: ITopic[] = [];
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

const getTopic = (courseId: any): Promise<[IRoadmapResult<ITopic[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const topicResult = await RoadmapsQuery< ITopic[]>({
                url: `/api/topics/topicsByCourseId/${courseId}`,
                method: ERequest.GET,

            });
            resolve([ topicResult ]);
        } catch (error) {
            reject(error);
        }
    });
};
