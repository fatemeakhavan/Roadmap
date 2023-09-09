import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { ICourse} from '../../Interface/Course.interface';

export const useGetCourse=(page:number,size:number) => {
    return useQuery(
        `course`,
        async () => {
            let coursesResult: IRoadmapResult<ICourse[]>;
            let courses: ICourse[] = [];
            let count = 0;
            [coursesResult] = await getCourse(page,size);
            if (coursesResult) {
                courses = coursesResult.result;
                count = coursesResult.total;
            }
            return {courses, count};
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getCourse = (page:number,size:number): Promise<[IRoadmapResult<ICourse[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const coursesResult = await RoadmapsQuery< ICourse[]>({
                url: `/api/courses`,
                method: ERequest.GET,
                params:{
                    page,
                    size
                }

            });
            resolve([coursesResult]);
        } catch (error) {
            reject(error);
        }
    });
};
