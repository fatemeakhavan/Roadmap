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
            main:"#00796b",
         },
         success:{
            main:"#009688"

         },
         error:{
            main:"#CD1818"
         },
         warning:{
            main:"#FF5722"

         }



     }
});