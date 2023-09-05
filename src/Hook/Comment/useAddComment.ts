import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { IComment} from '../../Interface/Comment.interface';

export const useAddComment=() =>{
    const key = 'addComment';
    return useMutation(
        async (values: {context: string; user_id: number | null; topic_id: number; callBack: () => void  }) => {
            const {context,user_id,topic_id} = values;
            console.log('values', values);
            const response = await RoadmapsQuery<IComment>({
                url: `/api/comments`,
                method: ERequest.POST,
                data: {context,user_id,topic_id},
            });

            return response;
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`نظر شما با موفقیت ثبت شد.`, {toastId: 'addComment'});

                // alert('موفقیت امیز')
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
