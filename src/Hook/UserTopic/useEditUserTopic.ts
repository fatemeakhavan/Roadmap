import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../index';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { IUserTopic } from '../../Interface/UserTopix.interface';

export const useUpdateUserTopic=()=> {
    const key = 'updateUserTopic';
    return useMutation(
        async (values: { user_id: number | null; topic_id:number | undefined; status:"DONE" | "IN_PROGRESS" | "SKIP" | "DEFAULT" ;callBack?: () => void }) => {
            const { user_id,topic_id,status } = values;
            console.log('user_id', user_id)
            console.log('topic_id',topic_id)
            return await RoadmapsQuery<IUserTopic>({
                url: `/api/userTopic`,
                params:{
                    topicId:topic_id,
                    userId:user_id,

                },
                method: ERequest.PATCH,
                data: {user_id,topic_id,status},
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`با موفقیت انجام شد`);
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
