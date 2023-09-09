import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../index';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IAnswer} from "../../Interface/Answer.interface";

export const useEditAnswer=()=> {
    const key = 'editAnswer';
    return useMutation(
        async (values: {context: string; user_id:number | null; question_id:number; id:number; callBack?: () => void }) => {

            const {context,user_id,question_id,id} = values;
            console.log(values)
            return await RoadmapsQuery<IAnswer>({
                url: `/api/answers/${id}`,
                method: ERequest.PATCH,
                data: {context,user_id,question_id},
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`جواب شما با موفقیت آپدیت شد.`);
                if (values.callBack) {
                    values.callBack();
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(key);
            },
            onError: (error, values) => {
                console.error(error);
                if (values.callBack) {
                    values.callBack();
                }
            },
        },
    );}