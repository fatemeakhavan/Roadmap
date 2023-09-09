import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../index';
import { toast } from 'react-toastify';
import { ITopicGet } from '../../Interface/TopicGet.interface';
import RoadmapsQuery from "../../Helpers/RoadmapsQuery";

export const useDeleteTopic=()=> {
    const key = 'deleteTopic';
    return useMutation(
        async (values: { topicId: number | undefined; callBack?: () => void }) => {
            const { topicId } = values;
            const result = await RoadmapsQuery<ITopicGet>({
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
