import {useGetRoles} from "../../Hook/RoleController/useRoles";
import {IRole} from "../../Interface/Role.interface";
import {Fab, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {useMemo, useState} from "react";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {AddRole} from "./AddRole";
import {EditRole} from "./EditRole";
import {DeleteRole} from "./DeleteRole";

export const Roles=()=>{

    const listRolesHook= useGetRoles();
    const[searchName,setSearchName]=useState<string>("");
    const [addRole, setAddRole] = useState<IRole[]| null>(null);
    const [editRole, setEditRole] = useState<IRole | null>(null);
    const [deleteRole, setDeleteRole] = useState<IRole | null>(null);

    let roles: IRole[] = [];
    if (listRolesHook.data?.length) {
        roles= listRolesHook.data;
    }
    const handleInputChange=(event : any)=>{
        setSearchName(event.target.value);
    }
    const handleAddRoleClose = () => {
        setAddRole(null);
        listRolesHook.refetch();
    }
    const handleEditClose = () => {
        setEditRole(null);
        listRolesHook.refetch();
    }
    const handleDeleteClose = () => {
        setDeleteRole(null);
        listRolesHook.refetch();
    }

    const filteredItems=useMemo(()=>{
        if (!searchName || searchName === "")
            return roles;

        return roles?.filter((nameRole) => (nameRole.name.toLowerCase().includes(searchName.toLowerCase())));
    }, [roles, searchName])

    return(
        <>
            <form style={{marginTop: "40px", marginRight: "50px"}}>
                <input
                    style={{border: "1px solid #009688", backgroundColor: "#f9f9fd", padding: "8px"}}
                    name="search"
                    type="text"
                    placeholder="جستجو کنید"
                    onChange={handleInputChange}
                />
                <Fab size="medium" color="success" sx={{marginLeft:"1240px"}}>
                    <AddIcon onClick={() => setAddRole(roles)}/>
                </Fab>
            </form>

            {
                roles.length>0 ?
                    <>
                        <TableContainer component={Paper} sx={{marginTop:"45px",backgroundColor:"#f9f9fd",height:"100vh"}}>
                            <Table sx={{minWidth: "650", border:"1px solid #CFD8DC",boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)" }} aria-label="simple table" className="container" >
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#009688"}}>Name</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#B2DFDB"}}>Description</TableCell>
                                        <TableCell align="left" sx={{fontSize:"25px",backgroundColor:"#E1BEE7"}}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredItems?.map((role)=>(
                                        <TableRow className="style-table-hover" >
                                            <TableCell align="left">{role.name} </TableCell>
                                            <TableCell align="left">{role.description}</TableCell>
                                            <TableCell align="left" >
                                                <IconButton >
                                                    <DeleteForeverIcon style={{color:"#CD1818", marginLeft:"20px"}} onClick={() => setDeleteRole(role)} />
                                                </IconButton>
                                                <IconButton>
                                                    <BorderColorIcon style={{color:"#009688"}} onClick={() => setEditRole(role)} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </>

                    :(

                        <div style={{textAlign:"center",marginTop:"300px",height:"100vh"}}>
                            <img style={{width:"450px" , borderRadius:"25px"}} src={require("../../Assets/images/error-404-not-found-1024x512.png")}/>
                            <h2 style={{color:"#9C27B0"}}>نقشی یافت نشد</h2>
                        </div>


                    )}
            {addRole ? <AddRole handleClose={handleAddRoleClose} /> : null}
            {editRole ? <EditRole role={editRole} handleClose={handleEditClose} /> : null}
            {deleteRole ? <DeleteRole role={deleteRole} handleClose={handleDeleteClose} /> : null}

        </>

    )
}