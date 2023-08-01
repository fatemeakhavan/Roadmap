import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import {IComment} from "../../Interface/Comment.interface";

export const useEditComment=()=> {
    const key = 'editComment';
    return useMutation(
        async (values: {context:string; id:number; callBack?: () => void }) => {

            const {context,id} = values;
            console.log(values)
            return await RoadmapsQuery<IComment>({
                url: `/api/comments/${id}`,
                method: ERequest.PATCH,
                data: {context},
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`نظر شما با موفقیت ادیت شد.`);
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