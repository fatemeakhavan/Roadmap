import { useMutation } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { queryClient } from '../../index';
import { toast } from 'react-toastify';
import {IRole} from '../../Interface/Role.interface';
import RoadmapsQuery from "../../Helpers/RoadmapsQuery";

export const useDeleteRole=()=> {
    const key = 'deleteRole';
    return useMutation(
        async (values: { roleId: number | undefined; callBack?: () => void }) => {
            const {roleId} = values;
            const result = await RoadmapsQuery<IRole>({
                url: `/api/roles/${roleId}`,
                method: ERequest.DELETE,
            });
            return result;
        },
        {
            onMutate: (values) => {},
            onSuccess: (result, values) => {

                toast.success(`نقش با موفقیت حذف شد.`);
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