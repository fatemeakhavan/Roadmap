import {useEffect, useState} from "react";
import {ERequest} from "../../Enum/App.enums"
import Fetch from "../../Service/fetch"
import {Box, Button, Typography} from "@mui/material";
import {isAuth} from "../../Helpers/Auth";
import {useNavigate} from "react-router-dom";



export const Login=()=>{
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleRedirect = async () => {
        try {
            setLoading(true);
            const response = await Fetch({
                url: "http://localhost:8080/api/pod/login",
                method: ERequest.GET,

            });
            window.location.assign("http://" + response.result);
        } catch {
            setLoading(false);
        }
    };
    const getCode = async (code: string) => {
        try{
            const userInfo = await Fetch<{
                access_Token: string;
                refresh_token: string;
                expire_in:number;
            }>({
                url: "http://localhost:8080/api/pod/getCode",
                method: ERequest.GET,
                params: {
                    code: code,
                },
            });

            localStorage.setItem('POD_APP:ACCESS_TOKEN', userInfo.data.access_Token);
            localStorage.setItem('POD_APP:REFRESH_TOKEN', userInfo.data.refresh_token);
            localStorage.setItem('POD_APP:EXPIRE_TIME', `${Date.now()}`);
            localStorage.setItem('POD_APP:USER_ROLE',"ADMIN");
            if(localStorage.getItem('POD_APP:USER_ROLE') === "ADMIN"){}

        }catch {
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuth())
            navigate('/');

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
            getCode(code);
        } else {
            setLoading(false);
        }
    }, []);

    return(
           <Box  sx={{textAlign:"center", display:"flex", justifyContent:"center", backgroundColor:"#f9f9fd",marginTop:"10%"}}>
               <Box className="card">
                   <Box className="card-body" style={{padding:"60px 90px"}}>
                       {error ? (
                           <Typography variant="h4" style={{color:"warning"}}>
                               خطایی به وجود آمده لطفا دوباره تلاش کنید.
                           </Typography>

                       ) : (
                           <>
                               <Typography variant="h4" className="card-title" sx={{marginBottom:"30px",}}>به سایت ما خوش آمدید!</Typography >

                               <Box width="100%" textAlign="center" marginBottom="25px">
                                   <img src={require("../../Assets/images/download.png")} width="100px" alt="logo" />
                               </Box>

                               <Typography sx={{fontSize:"13px", marginBottom:"15px"}}>برای ورود باید از درگاه POD استفاده کنید</Typography>
                           </>
                       )}
                       <Button  variant="outlined" size="large" color="warning" onClick={handleRedirect}>ورود</Button>

                   </Box>
               </Box>
           </Box>


    )

}