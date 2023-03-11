import React, { Component } from "react";
import "./styles.css";
import { Tab, Box, Tabs } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

class Login extends Component {
    state = {
        chosenAction: "Log In",
    };

    handleChange = (event, newValue) => {
        this.setState({ chosenAction: newValue });
    };

    render() {
        return (
            <div className="bg center">
                <Box className="loginBox center">
                    <Tabs
                        className="tabs"
                        value={this.state.chosenAction}
                        onChange={this.handleChange}
                        variant="fullWidth"
                    >
                        <Tab
                            icon={<LoginIcon />}
                            label={"Log In"}
                            value="Log In"
                        />
                        <Tab
                            icon={<CreateIcon />}
                            label={"Sign Up"}
                            value="Sign Up"
                        />
                    </Tabs>
                    <Box className="tabPanels">
                        {this.state.chosenAction === "Log In" ? (
                            <LoginForm app={this.props.app} login={this.props.login} observe={this.props.observe} appState={this.props.appState}/>
                        ) : (
                            <SignupForm popUp={this.props.popUp}/>
                        )}
                    </Box>
                </Box>
            </div>
        );
    }
}

export default Login;
