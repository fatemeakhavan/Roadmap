import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { IUser} from '../../Interface/User.interface';

export const useGetUser=() => {
    return useQuery(
        `user`,
        async () => {
            let usersResult: IRoadmapResult<IUser[]>;
            let users: IUser[] = [];
            [usersResult] = await getUser();
            if (usersResult) {
               users = usersResult.result;
            }
            return users;
        },
        {
            retry: false,
            onSuccess: () => {},
        },
    );
}

const getUser = (): Promise<[IRoadmapResult<IUser[]>]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const usersResult = await RoadmapsQuery<IUser[]>({
                url: `/api/users`,
                method: ERequest.GET,

            });
            resolve([usersResult]);
        } catch (error) {
            reject(error);
        }
    });
};
