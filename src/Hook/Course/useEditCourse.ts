import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { ICourse } from '../../Interface/Course.interface';

export const useEditCourse=()=> {
    const key = 'editCourse';
    return useMutation(
        async (values: { description: string; name:string; newCourse: boolean; image_uri:string; courseId:number | undefined; callBack?: () => void }) => {
            const { description,name,newCourse,image_uri,courseId } = values;
            console.log(values)
            return await RoadmapsQuery<ICourse>({
                url: `/api/courses/${courseId}`,
                params:{
                   courseId:courseId,
                },
                method: ERequest.PATCH,
                data: {description,name,newCourse,image_uri},
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`دوره آموزشی با موفقیت بروزرسانی شد.`);
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
    );}
