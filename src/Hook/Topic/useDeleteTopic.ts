import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import { ITopic } from '../../Interface/Topic.interface';
import RoadmapsQuery from "../../Helpers/RoadmapsQuery";

export const useDeleteTopic=()=> {
    const key = 'deleteTopic';
    return useMutation(
        async (values: { topicId: number | undefined; callBack?: () => void }) => {
            const { topicId } = values;
            const result = await RoadmapsQuery<ITopic>({
                url: `/api/topics/${topicId}`,
                method: ERequest.DELETE,
            });
            return result;
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {

                toast.success(`موضوع دوره با موفقیت حدف شد`);
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
