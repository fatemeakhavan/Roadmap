import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import {IQuestion} from "../../Interface/Question.interface";
import RoadmapsQuery from "../../Helpers/RoadmapsQuery";

export const useDeleteQuestion=()=> {
    const key = 'deleteQuestion';
    return useMutation(
        async (values: { id: number | null; callBack?: () => void }) => {
            const { id } = values;
            const result = await RoadmapsQuery<IQuestion>({
                url: `/api/questions/${id}`,
                method: ERequest.DELETE,
            });
            return result;
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {

                toast.success(`سوال شما با موفقیت حذف شد.`);
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