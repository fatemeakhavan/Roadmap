import {createContext} from "react";
import {IUserMe} from "../Interface/UserMe.interface";

interface UserContextType {
    userInfo: IUserMe | undefined,
    userChange: Function
}

export default createContext<UserContextType>({
    userInfo: undefined,
    userChange: () => {}
})