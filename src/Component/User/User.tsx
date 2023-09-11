import {useGetUser} from "../../Hook/User/useGetUser";
import {IUser} from "../../Interface/User.interface";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useContext, useEffect, useMemo, useState} from "react";
import Paper from "@mui/material/Paper";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {useAddRoleToUser} from "../../Hook/RoleController/useAddRoleToUser";
import Spinner from "../../Spinner/Spinner";
import UIContext from "../../Context/UIContext";
import UserContext from "../../Context/UserContext";
import {useGetRoles} from "../../Hook/RoleController/useRoles";


export const User = () => {
    const {changeTabIndex} = useContext(UIContext);
    const [searchName, setSearchName] = useState<string>("");
    const [activeList, setActiveList] = useState<number[]>([]);
    const [roleId,setRoleId]=useState<number>();
    const {userInfo} = useContext(UserContext);
    const addRoleToUserHook = useAddRoleToUser();
    const listUsersHook=useGetUser();
    const listRolesHook= useGetRoles();


    useEffect(() => {
        changeTabIndex(2);

    }, [])

    let users: IUser[]= [];
    if (listUsersHook.data?.length) {
        users = listUsersHook?.data;
    }

    useEffect(()=>{
        if (listRolesHook?.data?.length)
            listRolesHook?.data?.forEach((role)=>{
                setRoleId(role?.id)
            })
    },[listRolesHook])

    useEffect(() => {
        let activeUsers: number[] = [];

        users?.forEach((user) => {
            if (user.roles.length === 2)
                activeUsers.push(user?.id!);
            else
                console.log('test')

            setActiveList(activeUsers);
        })
    }, [users])

    console.log('users', users);

    const handleActive = (userId: any) => {
        const backup = [...activeList];

        try {
            setActiveList([...activeList, userInfo?.id!]);
            addRoleToUserHook.mutate({
                    userId: userInfo?.id!,
                    roleId: roleId!,
                }
            );
        } catch (e) {
            setActiveList(backup);
        }
    }

    const handleInputChange = (event: any) => {
        setSearchName(event.target.value);
    }

    const filteredItems = useMemo(() => {
        if (!searchName || searchName === "")
            return users;

        return users?.filter((nameUser) => (nameUser.name.toLowerCase().includes(searchName.toLowerCase())));
    }, [users, searchName])


    return (
        <>
            <form style={{marginTop: "2%", marginRight: "10%"}}>
                <input
                    style={{border: "1px solid #009688", backgroundColor: "#f9f9fd", padding: "8px"}}
                    name="search"
                    type="text"
                    placeholder="جستجو کنید"
                    onChange={handleInputChange}
                />
            </form>
            {
                users.length > 0 ?
                    <>
                        <TableContainer component={Paper}
                                        sx={{marginTop: "3%", backgroundColor: "#f9f9fd", height: "100vh"}}>
                            <Table sx={{
                                width: "90%",
                                border: "1px solid #CFD8DC",
                                boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
                            }} aria-label="simple table" className="container">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" sx={{fontSize: "25px", backgroundColor: "#009688"}}>نام کاربری پاد</TableCell>
                                        <TableCell align="left" sx={{fontSize: "25px", backgroundColor: "#B2DFDB"}}>آیدی پاد</TableCell>
                                        <TableCell align="left" sx={{fontSize: "25px", backgroundColor: "#E1BEE7"}}>عملیات</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredItems?.map((user) => (
                                        <TableRow className="style-table-hover">
                                            <TableCell align="left">{user.name} </TableCell>
                                            <TableCell align="left">{user.sso}</TableCell>
                                            <TableCell align="left">
                                                <IconButton disabled={activeList.includes(user?.id!)}>
                                                    <HowToRegIcon
                                                        style={{color: activeList.includes(user?.id!) ? 'green' : 'gray'}}
                                                        onClick={() => handleActive(user?.id)}
                                                    />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </>

                    : (
                        <Spinner/>

                    )}


        </>
    )
}