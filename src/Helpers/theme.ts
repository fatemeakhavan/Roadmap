import{createTheme} from "@mui/material";

 export const theme=createTheme({
    direction:'rtl',
     unstable_sxConfig:{
        borderColor:{
            themeKey:"primary",
        }

     },
     palette:{
        mode:"light",
         primary:{
            main:"#9C27B0",
         },
         success:{
            main:"#009688"

         },
         warning:{
            main:"#CD1818"
         }



     }
});