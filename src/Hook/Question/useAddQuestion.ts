import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IQuestion} from "../../Interface/Question.interface";

export const useAddQuestion=() =>{
    const key = 'addQuestion';
    return useMutation(
        async (values: {context: string | undefined ; correctAnswer:string | undefined; user_id: number | null; topic_id: number; callBack: () => void}) => {
            const {context,correctAnswer,user_id,topic_id} = values;
            console.log('values', values);
            return await RoadmapsQuery<IQuestion>({
                url: `/api/questions`,
                method: ERequest.POST,
                data: {context,correctAnswer,user_id,topic_id}
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`سوال شما با موفقیت ثبت شد.`);
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
