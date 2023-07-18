import React from "react";
import{Route,Routes} from "react-router-dom";
import {Courses} from "../Component/Course/Courses";
import {Topic} from "../Component/Topic/Topic";
import {ProtectedRoute} from "./ProtectedRoute";
import {Roles} from "../Component/RoleController/Roles";
import {User} from "../Component/User/User";


export const Index: React.FunctionComponent<{}> = () => {
    return(
        <Routes>
            <Route path="/" element={
                <ProtectedRoute>
                    <Courses/>
                </ProtectedRoute>
            }/>
            <Route path="/courses" element={
                <ProtectedRoute>
                    <Courses/>
                </ProtectedRoute>
            }/>
            <Route path="/topics/topicsByCourseId/:courseId" element={
                <ProtectedRoute>
                    <Topic/>
                </ProtectedRoute>
            }/>
            <Route path="/roles" element={
                <ProtectedRoute>
                    <Roles/>
                </ProtectedRoute>
            }/>
            <Route path="/users" element={
                <ProtectedRoute>
                    <User/>
                </ProtectedRoute>
            }/>

        </Routes>

    )

}