import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { ITopic } from '../../Interface/Topic.interface';

export const useEditTopic=()=> {
    const key = 'editTopic';
    return useMutation(
        async (values: {description: string; name: string; group: string; newTopic: boolean;  level:number;  course_id:string; order:number; parent_id: number; topicId:number | undefined; callBack?: () => void }) => {

            const {description,name,group,newTopic,level,course_id,order,parent_id,topicId} = values;
            console.log(values)
            return await RoadmapsQuery<ITopic>({
                url: `/api/topics/${topicId}`,
                method: ERequest.PATCH,
                data: {description,name,group,newTopic,level,course_id,order,parent_id},
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(` موضوع دوره آموزشی با موفقیت بروزرسانی شد.`);
                if (values.callBack) {
                    values.callBack();
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(key);
            },
            onError: (error, values, rollback) => {
                console.error(error);
                if (values.callBack) {
                    values.callBack();
                }
            },
        },
    );}