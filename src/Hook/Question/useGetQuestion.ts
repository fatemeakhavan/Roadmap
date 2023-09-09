import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IQuestion} from "../../Interface/Question.interface";


export const useGetQuestion=(topicId: number | null, page: number, size: number) => {
    return useQuery(
        `getQuestion`,
        async () => {
            console.log('topicid', topicId);
            let questionResult: IRoadmapResult< IQuestion[]>;
            let questionTopic:  IQuestion[] = [];
            let count = 0;
            [questionResult] = await getQuestionByTopic(topicId, page, size);
            if (questionResult) {
                questionTopic = questionResult.result;
                count = questionResult.total;
            }
            return {questionTopic, count};
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getQuestionByTopic= (topicId: any, page: number, size: number): Promise<[IRoadmapResult<IQuestion[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const questionResult = await RoadmapsQuery<IQuestion[]>({
                url: `/api/questions/ofTopic/${topicId}`,
                method: ERequest.GET,
                params: {
                    page: page,
                    size: size
                }
            });
            console.log('questionResult', questionResult);
            resolve([ questionResult ]);
        } catch (error) {
            reject(error);
        }
    });
};