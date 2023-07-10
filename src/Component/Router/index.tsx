import React from "react";
import{Route,Routes} from "react-router-dom";
import {Courses} from "../Course/Courses";
import {Topic} from "../Topic/Topic";
import {AddCourse} from "../Course/AddCourse";


export const Index: React.FunctionComponent<{}> = () => {
    return(
        <Routes>
            <Route path="/*" element={<Courses/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/topics/topicsByCourseId/:courseId" element={<Topic/>}/>
        </Routes>

    )

}