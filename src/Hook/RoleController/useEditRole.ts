import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../index';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { IRole } from '../../Interface/Role.interface';

export const useEditRole=()=> {
    const key = 'editRole';
    return useMutation(
        async (values: { description: string; name:string; roleId:number; callBack?: () => void }) => {
            const { description,name,roleId} = values;
            console.log(values)
            return await RoadmapsQuery<IRole>({
                url: `/api/roles/${roleId}`,
                params:{
                    RoleId:roleId,
                },
                method: ERequest.PATCH,
                data: {description,name},
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`نقش با موفقیت بروزرسانی شد.`);
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