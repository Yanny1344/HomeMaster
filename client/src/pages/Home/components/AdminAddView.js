
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { TableContainer,Container, Avatar,ListItemAvatar, ListItemText, Autocomplete} from "@mui/material";
import { List, ListItem, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@mui/material";

import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({

    white: {color: "white"},
    padding: {padding: "16px"},
    div: { display:"flex", height: "100%"},
    container: {height: "400px", opacity: "0.85", perspective:"1000px"},
    box: {
        color: "Ivory",
        width: "10%",
        height: "100%",
        float: "left",
        padding: "3%",
        // backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: 'flex',
    },
    list: {maxheight: 245, overflow: "auto", padding:"3%", width: 600},
    detailList: { maxHeight: 245, overflow: "auto" }
}));

function AdminAddView(props) {
    const classes = useStyles()
    const chooseUserType = [{title: "Client"}, {title: "Organization"}];

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userType, setUserType] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [orgID, setOrgId] = useState("")


    const handleTextInput = (field) => {
        const value = field.value;
        const name = field.name;
        console.log(name)
        console.log(value)

        if (name === "name"){
            setName(value )
        }else if (name === "email"){
            setEmail(value)
        }else if (name === "userName"){
            setUserName(value)
        }else if (name === "password"){
            setPassword(value)
        }
    }

    function addUser(){
        const request =  new Request(`${API_HOST}/user/signup`, {
            method: "post",
            body: JSON.stringify({
                userType: userType,
                pfp:  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                userName: userName,
                password: password,
                email: email,
                name: name
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
        fetch(request).then(res => {
            return res.json()
        }).then(json => {
            props.popUp("User added successfully!", "good")
        }).catch(error => {
            console.log(error)
            props.popUp("Adding user failed! Please verify the user info and try again.", "bad")
        })
    }


    const handleSignUp = () => {
        addUser()
    }

    return (
        <div className={classes.div}>

            <List className={classes.list}>
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    defaultValue=""
                    name="name"
                    onChange={(e) => handleTextInput(e.target)}
                />
                <br></br>
                <br></br>
                <TextField
                    required
                    id="outlined-required"
                    label="UserName"
                    defaultValue=""
                    name="userName"
                    onChange={(e) => handleTextInput(e.target)}
                />
                <br></br>
                <br></br>
                <TextField
                    required
                    id="outlined-required"
                    label="password"
                    defaultValue=""
                    name="password"
                    onChange={(e) => handleTextInput(e.target)}
                />
                <br></br>
                <br></br>
                <TextField
                    required
                    id="outlined-required"
                    label="email"
                    defaultValue=""
                    name="email"
                    onChange={(e) => handleTextInput(e.target)}
                />
                <br></br>
                <br></br>
                <Autocomplete
                    freeSolo
                    id="tags-standard"
                    value={userType}
                    onChange={(event, newValue) => {
                        setUserType(newValue);

                    }}
                    options={chooseUserType.map((option) => option.title)}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="user type"
                        name="userType"
                        // onChange={(e) => handleTextInput(e.target)}
                        
                    />
                    )}
                />
                <br></br>
                <Button 
                    variant="contained" 
                    onClick={handleSignUp}
                >
                    Confirm 
                </Button>
                
            </List>
        </div>
    );
            
    }

export default AdminAddView;