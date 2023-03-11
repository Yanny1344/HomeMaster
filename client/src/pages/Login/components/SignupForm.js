import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { validForm } from "../actions/authentication";
import "../styles.css";
import { makeStyles } from "@material-ui/core";
// import { signup } from "../../../actions/user";
import ENV from '../../../config'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({
    
    nameTextField: {
        margin: "10px",
        marginRight: "0px",
        width: "120px",
    },
    textField : { margin: "10px" }

}));

function SignupForm (props) {
    const classes = useStyles()
    const [email, setEmail] = useState("")
    const [email_validity, setEmail_validity] = useState(true)
    const [password, setPassword] = useState("")
    const [password_validity, setPassword_validity] = useState(true)
    const [name, setName] = useState("")
    const [name_validity, setName_validity] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPassword_validity, setConfirmPassword_validity] = useState(true)
    const [userName, setUserName] = useState("")
    const [userName_validity, setUserName_validity] = useState(true)

    const handleChangeText = (event) => {
        const value = event.target.value;

        switch (event.target.id) {
            case "emailInput":
                setEmail(value);
                break;
            case "passwordInput":
                setPassword(value);
                break;
            case "nameInput":
                setName(value);
                break;
            case "confirmPasswordInput":
                setConfirmPassword(value);
                break;
            case "userNameInput":
                setUserName(value);
            default:
                break;
        }
    };

    const signup = () => {
        const request = new Request(`${API_HOST}/user/signup`, {
            method: "post",
            body: JSON.stringify({
                name: name,
                email: email,
                userType: "Client",
                userName: userName,
                pfp: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                password: password,
    
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
    
            fetch(request).then(res => {
                return res.json()
            }).then(json => {
                props.popUp("Client account created successfully!", "good")
            }).catch(error => {
                console.log(error)
                props.popUp("Client account creation failed! Please verify the account info and try again.", "bad")
            })
        
    };

    const submit = (event) => {
        const valid_result = validForm(
            name,
            email,
            password,
            confirmPassword,
            userName,
        );

        setName_validity(valid_result.name);
        setEmail_validity(valid_result.email);
        setPassword_validity(valid_result.password);
        setConfirmPassword_validity(valid_result.confirmPassword);
        setUserName_validity(valid_result.userName);
        if (email_validity && password_validity && name_validity && confirmPassword_validity && userName_validity){ 
            signup()
        }
        else{
            props.popUp("One or more fields have incorrect info. Please try again", "bad")
        }
    };

    
        return (
            <React.Fragment>
                <Box
                    className="center"
                    style={{
                        width: "65%",
                    }}
                >
                    <TextField
                        className={classes.textField}
                    
                        required
                        error={!name_validity}
                        id="nameInput"
                        name="name"
                        label="Name"
                        type="text"
                        onChange={handleChangeText}
                    />

                    <TextField
                        className={classes.textField}
                        error={!userName_validity}
                        id="userNameInput"
                        label="User Name"
                        name="userName"
                        type="text"
                        fullWidth
                        required
                        onChange={handleChangeText}
                    />
                   
                    <TextField
                        className={classes.textField}
                        error={!email_validity}
                        id="emailInput"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        fullWidth
                        required
                        onChange={handleChangeText}
                    />
                    <TextField
                        className={classes.textField}
                        error={!password_validity}
                        id="passwordInput"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        required
                        onChange={handleChangeText}
                    />
                    <TextField
                        className={classes.textField}
                        error={!confirmPassword_validity}
                        id="confirmPasswordInput"
                        label="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        required
                        onChange={handleChangeText}
                    />
                
                <Button
                    style={{
                        bottom: "17%",
                    }}
                    onClick={submit}
                >
                    Sign Up
                </Button>
                </Box>
                

                
            </React.Fragment>
        );
    
}

export default SignupForm;
