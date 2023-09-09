import {ThemeProvider} from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import {prefixer} from 'stylis';
import {theme} from './Helpers/theme';
import {Grid} from '@mui/material';
import Sidebar from "./Component/Main/Component/Sidebar";
import Header from "./Component/Main/Component/Header";
import {Index} from "./Router/index";
import React, {useEffect, useState} from "react";
import {ProtectedRoute} from "./Router/ProtectedRoute";
import {Route, Routes} from "react-router-dom";
import {Login} from "./Component/Login/Login";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import UIContext from "./Context/UIContext";
import UserContext from "./Context/UserContext";
import {useGetUserMe} from "./Hook/User/useGetUserMe";
import {IUserMe} from "./Interface/UserMe.interface";


const cacheRtl = createCache({
    key: "muirtl",
    //@ts-ignore
    stylisPlugins: [prefixer, rtlPlugin]
})

function App() {
    const [tabIndex, setTabIndex] = useState(0);
    const [userInfo, setUserInfo] = useState<IUserMe>()
    const userInfoHook = useGetUserMe();

    useEffect(() => {
        setUserInfo(userInfoHook?.data)
    }, [userInfoHook?.data])

    return (
        <>

                <CacheProvider value={cacheRtl}>
                    <UIContext.Provider value={{tabIndex, changeTabIndex: setTabIndex}}>
                        <UserContext.Provider value={{userInfo, userChange: setUserInfo}}>
                        <ThemeProvider theme={theme}>
                            <Routes><Route path="/login" element={<Login/>}/></Routes>
                            <ProtectedRoute>
                                <Grid container>
                                    <Grid lg={2}>
                                        <Sidebar/>
                                    </Grid>
                                    <Grid
                                        lg={10}
                                        sx={{height: "100vh", backgroundColor: "#f9f9fd", marginTop: "50px", marginLeft: "320px", width: '100%'}}>
                                        <Header/> .
                                        <Index/>
                                    </Grid>
                                </Grid>
                            </ProtectedRoute>
                        </ThemeProvider>
                        </UserContext.Provider>
                    </UIContext.Provider>
                </CacheProvider>
            <ToastContainer position={"top-left"}/>
        </>


    );
}

export default App;
