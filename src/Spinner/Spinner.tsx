import React from 'react';
import { DotLottiePlayer} from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
const Spinner =()=>{
    return(
        < >
            <div style={{display:"flex", justifyContent:"center",alignItems:"center",textAlign:"center",marginTop:"15%"}}>
                <DotLottiePlayer
                    src={require("../Assets/images/test.lottie")}
                    style={{width:"200px", height: 200}}
                    autoplay
                    loop
                />
            </div>
        </>
    )
}
export default Spinner;