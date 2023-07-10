import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { ITopic } from '../../Interface/Topic.interface';

export const useEditTopic=()=> {
    const key = 'editTopic';
    return useMutation(
        async (values: { description: string; group: string;  name: string; newTopic: boolean; course_id:string; type: "MAIN" | "DETAIL"; topicId:number | undefined; callBack?: () => void }) => {

            const { description,group,name,newTopic,type, topicId,course_id } = values;
            console.log(values)
            return await RoadmapsQuery<ITopic>({
                url: `/api/topics/${topicId}`,
                method: ERequest.PATCH,
                data: {description,group,name,newTopic,type ,course_id},
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