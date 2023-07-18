import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { IRole} from '../../Interface/Role.interface';

export const useGetRoles=() => {
    return useQuery(
        `Roles`,
        async () => {
            let RolesResult: IRoadmapResult<IRole[]>;
            let Roles: IRole[] = [];
            [RolesResult] = await getRoles();
            if (RolesResult) {
                Roles = RolesResult.result;
            }
            return Roles;
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getRoles = (): Promise<[IRoadmapResult<IRole[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const RolesResult = await RoadmapsQuery< IRole[]>({
                url: `/api/roles`,
                method: ERequest.GET,

            });
            resolve([RolesResult]);
        } catch (error) {
            reject(error);
        }
    });
};
