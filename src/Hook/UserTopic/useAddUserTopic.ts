import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../index';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { IUserTopic } from '../../Interface/UserTopix.interface';

export const useAddUserTopic=()=> {
    const key = 'addUserTopic';
    return useMutation(
        async (values: { topic_id: number |undefined; user_id: number | null; status: "DONE" | "IN_PROGRESS" | "SKIP" | "DEFAULT", callBack: ()=>void}) => {
            const { topic_id, user_id ,status} = values;
            return await RoadmapsQuery<IUserTopic>({
                url: `/api/userTopic`,
                method: ERequest.POST,
                data: { topic_id,user_id,status},
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`با موفقیت اضافه شد`);
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
