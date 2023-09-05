import {Box, Fab, Pagination} from "@mui/material";
import {useGetCourse} from "../../Hook/Course/useCourse";
import {Course} from "./Course";
import {ICourse} from "../../Interface/Course.interface"
import React, {ChangeEvent, useContext, useEffect, useMemo, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import {AddCourse} from "./AddCourse";
import Spinner from "../../Spinner/Spinner";
import UIContext from "../../Context/UIContext";



export const Courses = () => {
    const {changeTabIndex} = useContext(UIContext);
    const [searchName, setSearchName] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [addCourse, setAddCourse] = useState<ICourse[] | null>(null);
    const size: number = 10;
    const listCourseHook = useGetCourse(page, size);
    const handlePageChange = (event: ChangeEvent<any>, newPage: number,) => setPage(newPage - 1);


    let courses: ICourse[] = [];
    if (listCourseHook.data?.length) {
        courses = listCourseHook.data;
    }

    useEffect(() => {
        changeTabIndex(0);
    }, [])

    useEffect(() => {
        listCourseHook.refetch();
    }, [page])

    const handleAddClose = () => {
        setAddCourse(null);
        listCourseHook.refetch();
    }

    const handleInputChange = (event: any) => {
        setSearchName(event.target.value);
    }

    const filteredItems = useMemo(() => {
        if (!searchName || searchName === "")
            return courses;

        return courses?.filter((nameTopics) => (nameTopics.name.toLowerCase().includes(searchName.toLowerCase())));
    }, [courses, searchName])


    return (
        <>

            {listCourseHook.isLoading ? <Spinner/> : (
                <Box>
                    <form style={{marginTop: "40px", marginRight: "50px"}}>
                        <input
                            style={{border: "1px solid #009688", backgroundColor: "#f9f9fd", padding: "8px"}}
                            name="search"
                            type="text"
                            placeholder="جستجو کنید"
                            onChange={handleInputChange}
                        />
                        {localStorage.getItem('POD_APP:USER_ROLE') === "ADMIN" ?
                            <Fab size="medium" color="success" sx={{marginLeft: "1240px"}}>
                                <AddIcon onClick={() => setAddCourse(courses)}/>
                            </Fab>
                            : null}

                    </form>

                    {
                        courses.length > 0 ?
                            <>
                                <Box sx={{display: "flex", flexWrap: "wrap", marginTop: "20px"}}>
                                    <Course filteredItems={filteredItems} refetch={listCourseHook.refetch}/>
                                </Box>
                                <Pagination
                                    count={size}
                                    page={page + 1}
                                    onChange={handlePageChange}
                                    style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}
                                />
                            </>
                            : (
                                <Spinner/>

                             )
                     }


                </Box>
            )}
            {addCourse ? <AddCourse course1={addCourse} handleClose={handleAddClose}/> : null}


        </>
    );
}