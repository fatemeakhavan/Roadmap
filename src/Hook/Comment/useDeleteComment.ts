import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import { IComment } from '../../Interface/Comment.interface';
import RoadmapsQuery from "../../Helpers/RoadmapsQuery";

export const useDeleteComment=()=> {
    const key = 'deleteComment';
    return useMutation(
        async (values: { id: number | null; callBack?: () => void }) => {
            const { id } = values;
            const result = await RoadmapsQuery<IComment>({
                url: `/api/comments/${id}`,
                method: ERequest.DELETE,
            });
            return result;
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {

                toast.success(`نظر شما با موفقیت حدف شد.`);
                if (values.callBack) {
                    values.callBack();
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(key);
            },
            onError: (error) => {
                console.error(error);

            },
        },
    );
}