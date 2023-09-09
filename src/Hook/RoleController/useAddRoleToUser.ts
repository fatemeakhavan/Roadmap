import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../index';
import { toast } from 'react-toastify';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { IRole } from '../../Interface/Role.interface';

export const useAddRoleToUser=() =>{
    const key = 'addRoleToUser';
    return useMutation(
        async (values: {roleId:number; userId:number;}) => {
            const {roleId, userId} = values;
            return await RoadmapsQuery< IRole >({
                url: `/api/roles/roleToUser`,
                method: ERequest.POST,
                params:{
                    roleId,
                    userId
                }
            });
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {
                toast.success(`حساب کاربر فعال شد.`);

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