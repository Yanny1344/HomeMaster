import { TableContainer, Table, TableCell, TableHead, TableRow, Typography, Container, Button, TableBody} from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({
    flex: {display:"flex", height: "100%"},
    container: {height: "400px", opacity: "0.85", perspective:"1000px", backgroundColor: "rgb(255, 255, 255)"},
    pad: {padding: "16px"}
}));

function AdminUserView(props) {
    const classes = useStyles()

    function getUser(){
        const request =  new Request(`${API_HOST}/users`, {
            method: "get"
        })
        fetch(request)
        .then(data => {return data.json()})
        .then(res => {props.updateUsers(res.users)})    
        .catch(error => {
            console.log(error);
        });

    }

    useEffect(() => {
        const u = getUser()
    }, [])

    function getEmploymentList(userID){
        const request =  new Request(`${API_HOST}/employment/` + userID, {
            method: "get"
        })
        fetch(request)
        .then(data => {return data.json()})
        .then(res => {props.updateEmploymentList(res)})
        .catch(error => {
            console.log(error);
        });

    }

    async function removeUser(userID, userType){
        if(userType === "Employee"){
            const response = await fetch(`${API_HOST}/employee/` + userID,
            {
                method: 'DELETE'
            })
            getUser()
            const resData = 'resource deleted...'
            return resData
        }else if (userType === "Client"){
            const response = await fetch(`${API_HOST}/client/` + userID,
            {
                method: 'DELETE'
            })
            getUser()
            const resData = 'resource deleted...'
            return resData
        }else if (userType === "Organization"){
            const response = await fetch(`${API_HOST}/organization/` + userID,
            {
                method: 'DELETE'
            })
            getUser()
            const resData = 'resource deleted...'
            return resData
        }
        
    }

    let counter = 0
    const userList = props.appState.users
    const createuserListItems = userList.map((user) => { // the fakeDate payment info
    counter = counter + 1
    return (
      <TableRow key = {counter}>
          <TableCell>{user._id}</TableCell>
          <TableCell align="left">{user.userName}</TableCell>
          <TableCell align="left">{user.userType}</TableCell>
          <TableCell align="left">{user.email}</TableCell>
            <TableCell align="left">
            <Button 
                variant="outlined" 
                startIcon={<DeleteIcon />} 
                onClick={() => {removeUser(user._id, user.userType)}}
            >
                DELETE
            </Button>
          </TableCell>
      </TableRow>);
    })

    return (
        <div className={classes.flex}>
        <TableContainer className={classes.container} component={Container}>
            <Typography className={classes.pad} variant="h6">Users</Typography>
                <Divider />
                <Table stickyHeader aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell align="left">User Name</TableCell>
                            <TableCell align="left">User Type</TableCell>
                            <TableCell align="left">User Email</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody> 
                            {createuserListItems}
                    </TableBody>
                </Table>
        </TableContainer>
        </div>
        );
    }

export default AdminUserView;
