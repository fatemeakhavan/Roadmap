import {Box, Fab} from "@mui/material";
import{useGetCourse} from "../../Hook/Course/useCourse";
import Spinner from "../../Spinner";
import {Course} from "./Course";
import {ICourse} from "../../Interface/Course.interface"
import React, {useMemo, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import {AddCourse} from "./AddCourse";


export const Courses= ()=> {
   const listCourseHook=useGetCourse();


    let courses: ICourse[] = [];
    if (listCourseHook.data?.length) {
        courses = listCourseHook.data;
    }


    const[searchName,setSearchName]=useState<string>("");
    const [addCourse, setAddCourse] = useState<ICourse[] | null>(null);

    const handleAddClose = () => {
        setAddCourse(null);
        listCourseHook.refetch();
    }

    const handleInputChange=(event : any)=>{
        setSearchName(event.target.value);
    }

    const filteredItems=useMemo(()=>{
        if (!searchName || searchName === "")
            return courses;

        return courses?.filter((nameTopics) => (nameTopics.name.toLowerCase().includes(searchName.toLowerCase())));
    }, [courses, searchName])

    return(
        <>

               {listCourseHook.isLoading ? <Spinner/> :(
                    <Box >
                        <form style={{marginTop: "40px", marginRight: "50px"}}>
                            <input
                                style={{border: "1px solid #009688", backgroundColor: "#f9f9fd", padding: "8px"}}
                                name="search"
                                type="text"
                                placeholder="جستجو کنید"
                                onChange={handleInputChange}
                            />

                            <Fab size="medium" color="success" sx={{marginLeft:"1240px"}}>
                                <AddIcon onClick={() => setAddCourse(courses)}/>
                            </Fab>

                        </form>

                     {
                         courses.length >0 ?
                                 <Box sx={{display:"flex", flexWrap:"wrap" ,marginTop:"20px"}} >
                                     <Course filteredItems={filteredItems}/>
                                 </Box>
                         :(

                             <div style={{textAlign:"center",height:"100%",marginTop:"280px"}}>
                                 <img style={{width:"450px" , borderRadius:"25px"}} src={require("../../Assets/images/error-404-not-found-1024x512.png")} />
                                 <h2 style={{color:"#9C27B0"}}>موضوعی یافت نشد</h2>
                             </div>
                         )
                      }


                   </Box>
               )}
            {addCourse ? <AddCourse course1={addCourse} handleClose={handleAddClose} /> : null}



        </>
    );
}