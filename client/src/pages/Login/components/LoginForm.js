import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import "../styles.css";
import { auth } from "../actions/authentication";
import Fade from "@mui/material/Fade";
import { login } from "../../../actions/user"
import { updateLoginForm } from "../../../actions/user"

class loginForm extends Component {
    state = {
        userName: "",
        password: "",
        typeChosen: "Organization",
        invalidity: false,
        invalidityTextTimer: null,
    };

    // handleChangeText = (event) => {
    //     if (event.target.id === "usernameInput") {
    //         this.setState({ username: event.target.value });
    //     } else {
    //         this.setState({ password: event.target.value });
    //     }
    // };

    handleChangeRadio = (event) => {
        this.setState({ typeChosen: event.target.value });
    };

    handleInvalid = () => {
        clearTimeout(this.state.invalidityTextTimer);
        this.setState({ invalidity: true });
        this.setState({
            invalidityTextTimer: setTimeout(() => {
                this.setState({ invalidity: false });
            }, 2500),
        });
    }

    render() {
        const { typeChosen } = this.state;
        const { app } = this.props
        return (
            <React.Fragment>
                <Box
                    className="center"
                    style={{
                        width: "65%",
                    }}
                >
                    <Fade in={this.state.invalidity}>
                        <Box className="invalidLogin">
                            {" "}
                            Invalid username or password{" "}
                        </Box>
                    </Fade>
                    <TextField
                        style={{ margin: "10px" }}
                        id="usernameInput"
                        name="userName"
                        label="Username"
                        type="username"
                        autoComplete="username"
                        onChange={e => updateLoginForm(this, e.target)}
                        fullWidth
                    />
                    <TextField
                        style={{ margin: "10px" }}
                        className="textField"
                        id="passwordInput"
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={e => updateLoginForm(this, e.target)}
                        fullWidth
                    />

                    <FormControl component="fieldset">
                        <RadioGroup
                            id="userTypeGroup"
                            aria-label="gender"
                            name="controlled-radio-buttons-group"
                            value={typeChosen}
                            onChange={this.handleChangeRadio}
                        >
                            <div style={{ margin: "10px" }}>
                                <FormControlLabel
                                    style={{display: "block"}}
                                    id="organizationButton"
                                    value={"Organization"}
                                    control={<Radio />}
                                    label="Organization"
                                />
                                <FormControlLabel
                                    style={{display: "block"}}
                                    id="employeeButton"
                                    value={"Employee"}
                                    control={<Radio />}
                                    label="Employee"
                                />
                                <FormControlLabel
                                    style={{display: "block"}}
                                    id="clientButton"
                                    value={"Client"}
                                    control={<Radio />}
                                    label="Client"
                                />
                                {/* <FormControlLabel
                                    style={{display: "block"}}
                                    id="adminButton"
                                    value={"Admin"}
                                    control={<Radio />}
                                    label="Admin"
                                /> */}
                            </div>
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Button
                    style={{
                        position: "absolute",
                        right: "10%",
                        bottom: "10%",
                    }}
                    onClick={() => login(this, app)}
                >
                    Log In
                </Button>
            </React.Fragment>
        );
    }
}

export default loginForm;
