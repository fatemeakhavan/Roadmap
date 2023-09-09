import { useQuery } from 'react-query';
import { ERequest } from '../../Enum/App.enums';
import { IRoadmapResult } from '../../Interface/RoadmapResult.interface';
import RoadmapsQuery from '../../Helpers/RoadmapsQuery';
import { IUserMe} from '../../Interface/UserMe.interface';

export const useGetUserMe=() => {
    return useQuery(
        `userMe`,
        async () => {
            let usersMeResult: IRoadmapResult<IUserMe>;
            let infoUserMe: IUserMe ;
            usersMeResult = await getUser();
            if (usersMeResult) {
                infoUserMe= usersMeResult.result;
            }
            // @ts-ignore
            return infoUserMe;
        },
        {
            retry: false,
            onSuccess: () => {}
        },
    );
}

const getUser = (): Promise<IRoadmapResult<IUserMe>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const usersMeResult = await RoadmapsQuery<IUserMe>({
                url: `/api/users/me`,
                method: ERequest.GET,
            });
            resolve(usersMeResult);
        } catch (error) {
            reject(error);
        }
    });
};
