import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../index';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { ICourse } from '../../Interface/Course.interface';

export const useAddCourse=() =>{
    const key = 'addCourse';
    return useMutation(
        async (values: {description: string; name:string;  image_uri:string; callBack?: () => void }) => {
            const {description,name,image_uri } = values;
            return await RoadmapsQuery<ICourse>({
                url: `/api/courses`,
                method: ERequest.POST,
                data: { description,name,image_uri },
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`دوره آموزشی جدید با موفقیت اضافه گردید.`);
                if (values.callBack) {
                    values.callBack();
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(key);
            },
            onError: (error, values, rollback) => {
                console.error(error);
                //if (rollback) rollback();
            },
        },
    );
}
