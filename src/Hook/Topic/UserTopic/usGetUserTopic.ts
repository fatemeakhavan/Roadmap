import { useQuery } from 'react-query';
import { ERequest } from '../../../Enum/App.enums';
import { IRoadmapResult } from "../../../Interface/RoadmapResult.interface";
import RoadmapsQuery from '../../../Helpers/RoadmapsQuery'
import { IUserTopic} from '../../../Interface/UserTopix.interface';

export const useUserGetTopic=(topic_id: number | undefined) => {
    return useQuery(
        `userTopic`,
        async () => {
            let userTopicResult : IRoadmapResult<IUserTopic>;
            let userTopic: IUserTopic | undefined;
            userTopicResult = await getUserTopic(topic_id);
            if (userTopicResult ) {
                    userTopic = userTopicResult .result;
            }

            return userTopic;
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const  getUserTopic = (topic_id: number | undefined): Promise<IRoadmapResult<IUserTopic>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const userTopicResult = await RoadmapsQuery< IUserTopic>({
                url: `/api/userTopic`,
                params:{
                    topicId:topic_id,
                    userId:1,

                },
                method: ERequest.GET,

            });
            resolve(userTopicResult);
        } catch (error) {
            reject(error);
        }
    });
};
