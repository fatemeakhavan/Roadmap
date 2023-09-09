import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../index';
import { toast } from 'react-toastify';
import RoadmapsQuery from "../../Helpers/RoadmapsQuery";
import {IAnswer} from "../../Interface/Answer.interface";

export const useDeleteAnswer=()=> {
    const key = 'deleteAnswer';
    return useMutation(
        async (values: { id: number | null ; callBack?: () => void }) => {
            const { id } = values;
            const result = await RoadmapsQuery<IAnswer>({
                url: `/api/answers/${id}`,
                method: ERequest.DELETE,
            });
            return result;
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {

                toast.success(`جواب شما با موفقیت حذف شد.`);
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