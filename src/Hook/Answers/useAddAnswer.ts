import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IAnswer} from "../../Interface/Answer.interface";

export const useAddAnswer=() =>{
    const key = 'addAnswer';
    return useMutation(
        async (values: {context: string; user_id:number | null; question_id:number; callBack: () => void  }) => {
            const {context,user_id,question_id} = values;
            console.log('values', values);
            return await RoadmapsQuery<IAnswer>({
                url: `/api/answers`,
                method: ERequest.POST,
                data: {context,user_id,question_id}
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`جواب شما با موفقیت ثبت شد.`);
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
