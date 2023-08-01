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
import {QueryClient, QueryClientProvider} from "react-query";
import React from "react";
import {ProtectedRoute} from "./Router/ProtectedRoute";
import {Route,Routes} from "react-router-dom";
import {Login} from "./Component/Login/Login";



const cacheRtl = createCache({
    key: "muirtl",
    //@ts-ignore
    stylisPlugins: [prefixer, rtlPlugin]
})
export const queryClient = new QueryClient();

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                        <Routes><Route path="/login" element={<Login/>}/></Routes>
                       <ProtectedRoute>
                             <Grid container>
                                <Grid lg={2}>
                                   <Sidebar/>
                                 </Grid>
                                <Grid
                                   lg={10}
                                    sx={{height: "100vh",backgroundColor:"#f9f9fd", marginTop:"50px"}}>
                                     <Header/> .
                                     <Index/>
                               </Grid>
                            </Grid>
                       </ProtectedRoute>
                    </ThemeProvider>
                </CacheProvider>
              </QueryClientProvider>

        </>




    );
}

export default App;
