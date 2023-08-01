import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IQuestion} from "../../Interface/Question.interface";


export const useGetQuestion=(topicId: number | null) => {
    return useQuery(
        `getQuestion`,
        async () => {
            let questionResult: IRoadmapResult< IQuestion[]>;
            let questionTopic:  IQuestion[] = [];
            [questionResult] = await getQuestionByTopic(topicId);
            if (questionResult) {
                questionTopic = questionResult.result;
            }
            return questionTopic;
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getQuestionByTopic= (topicId: any): Promise<[IRoadmapResult<IQuestion[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const questionResult = await RoadmapsQuery<IQuestion[]>({
                url: `/api/questions/ofTopic/${topicId}`,
                method: ERequest.GET,
            });
            resolve([ questionResult ]);
        } catch (error) {
            reject(error);
        }
    });
};