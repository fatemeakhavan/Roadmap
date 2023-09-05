import {createContext} from "react";

interface UIContextType {
    tabIndex: number,
    changeTabIndex: Function
}

export default createContext<UIContextType>({
    tabIndex: 0,
    changeTabIndex: () => {}
})