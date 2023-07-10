import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import {ICourse } from '../../Interface/Course.interface';
import RoadmapsQuery from "../../Helpers/RoadmapsQuery";

export const useDeleteCourse=()=> {
    const key = 'deleteCourse';
    return useMutation(
        async (values: { courseId: number | undefined; callBack?: () => void }) => {
            const { courseId} = values;
            const result = await RoadmapsQuery<ICourse>({
                url: `/api/courses/${courseId}`,
                method: ERequest.DELETE,
            });
            return result;
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {

                toast.success(`دوره آموزشی با موفقیت حذف شد.`);
                if (values.callBack) {
                    values.callBack();
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(key);
            },
            onError: (error, values, rollback) => {
                console.error(error);

            },
        },
    );
}
