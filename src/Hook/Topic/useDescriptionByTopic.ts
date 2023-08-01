import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';

export const useGetDescriptionByTopic=(topicId: number | null) => {
    return useQuery(
        `descriptionByTopic`,
        async () => {
            let topicResult: IRoadmapResult<string>;
            let descriptionTopic: string = "";
            [topicResult] = await getDescriptionByTopic(topicId);
            if (topicResult) {
                descriptionTopic = topicResult.result;
            }
            return descriptionTopic;
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getDescriptionByTopic = (topicId: any): Promise<[IRoadmapResult<string>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const topicResult = await RoadmapsQuery<string>({
                url: `/api/topics/descriptionByTopic/${topicId}`,
                method: ERequest.GET,

            });
            resolve([ topicResult ]);
        } catch (error) {
            reject(error);
        }
    });
};
