import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IAnswer} from "../../Interface/Answer.interface";


export const useGetAnswers=(questionId: number | null, page: number, size: number) => {
    return useQuery(
        `getAnswers`,
        async () => {
            let answersResult: IRoadmapResult< IAnswer[]>;
            let AnswersTopic:  IAnswer[] = [];
            [answersResult] = await getAnswers(questionId, page, size);
            if (answersResult) {
                AnswersTopic= answersResult.result;
            }
            return  AnswersTopic;
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getAnswers= (questionId: any, page: number, size: number): Promise<[IRoadmapResult<IAnswer[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const answersResult = await RoadmapsQuery<IAnswer[]>({
                url: `/api/answers/toQuestion/${questionId}`,
                method: ERequest.GET,
                params: {
                    page: page,
                    size: size
                }
            });
            resolve([answersResult]);
        } catch (error) {
            reject(error);
        }
    });
}