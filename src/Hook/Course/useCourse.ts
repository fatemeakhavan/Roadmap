import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { ICourse} from '../../Interface/Course.interface';

export const useGetCourse=() => {
    return useQuery(
        `course`,
        async () => {
            let coursesResult: IRoadmapResult<ICourse[]>;
            let courses: ICourse[] = [];
            [coursesResult] = await getCourse();
            if (coursesResult) {
                courses = coursesResult.result;
            }
            return courses;
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getCourse = (): Promise<[IRoadmapResult<ICourse[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const coursesResult = await RoadmapsQuery< ICourse[]>({
                url: `/api/courses`,
                method: ERequest.GET,

            });
            resolve([coursesResult]);
        } catch (error) {
            reject(error);
        }
    });
};
