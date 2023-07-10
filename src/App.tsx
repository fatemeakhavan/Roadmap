import {ThemeProvider} from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import {prefixer} from 'stylis';
import {theme} from './Helpers/theme';
import {Grid, Toolbar} from '@mui/material';
import Sidebar from "./Component/Main/Component/Sidebar";
import Header from "./Component/Main/Component/Header";
import {Index} from "./Component/Router";
import {QueryClient, QueryClientProvider} from "react-query";
import React from "react";



const cacheRtl = createCache({
    key: "muirtl",
    //@ts-ignore
    stylisPlugins: [prefixer, rtlPlugin]
})
export const queryClient = new QueryClient();

function App() {

    return (

        <QueryClientProvider client={queryClient}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <Grid container>
                        <Grid lg={2}>
                            <Sidebar/>
                        </Grid>
                        <Grid
                            lg={10}
                              sx={{height: "100vh",backgroundColor:"#f9f9fd", marginTop:"50px"}}>
                            <Header/>
                            <Index/>
                        </Grid>
                    </Grid>


                </ThemeProvider>

            </CacheProvider>
        </QueryClientProvider>


    );
}

export default App;
