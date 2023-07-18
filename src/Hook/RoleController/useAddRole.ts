import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../App';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { IRole } from '../../Interface/Role.interface';

export const useAddRole=() =>{
    const key = 'addRole';
    return useMutation(
        async (values: {description: string; name:string; callBack?: () => void }) => {
            const {description,name} = values;
            return await RoadmapsQuery< IRole >({
                url: `/api/roles`,
                method: ERequest.POST,
                data: { description,name},
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`نقش جدید با موفقیت اضافه گردید.`);
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
