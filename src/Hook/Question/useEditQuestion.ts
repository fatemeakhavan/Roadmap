import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IQuestion} from '../../Interface/Question.interface'

export const useEditQuestion=()=> {
    const key = 'editQuestion';
    return useMutation(
        async (values: {context: string; correctAnswer:string; id:number; callBack?: () => void }) => {

            const {context,correctAnswer,id} = values;
            console.log(values)
            return await RoadmapsQuery<IQuestion>({
                url: `/api/questions/${id}`,
                method: ERequest.PATCH,
                data: {context,correctAnswer},
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
            onError: (error, values) => {
                console.error(error);
                if (values.callBack) {
                    values.callBack();
                }
            },
        },
    );}