import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    white: {
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.contrastText,
    },
    background: {
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    },
    left: {
        paddingLeft: "10px"
    }
}));
function NavBar(props) {

    const classes = useStyles()
    return (
        <AppBar
            position="static"
            className={classes.background}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    className={classes.white}
                >
                    Home Master
                </Typography>

                <ButtonGroup className={classes.white} variant="outlined">
                    {props.appState.user.userType === "Client" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("home")
                            }
                        >
                            Home
                        </Button>
                    ) : null}
                    {props.appState.user.userType !== "Admin" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("calendar")
                            }
                        >
                            Calendar
                        </Button>
                    ) : null}

                    {props.appState.user.userType ===
                    "Organization" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("management")
                            }
                        >
                            Management
                        </Button>
                    ) : null}

                    {props.appState.user.userType === "Organization" ||
                    props.appState.user.userType === "Employee" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("requests")
                            }
                        >
                            Requests
                        </Button>
                    ) : null}

                    {props.appState.user.userType === "Client" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("payment")
                            }
                        >
                            Payment
                        </Button>
                    ) : null}

                    {props.appState.user.userType === "Client" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("purchased")
                            }
                        >
                            Purchased
                        </Button>
                    ) : null}

                    {props.appState.user.userType === "Employee" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("paystub")
                            }
                        >
                            Pay Stubs
                        </Button>
                    ) : null}

                    {props.appState.user.userType === "Admin" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("users")
                            }
                        >
                            All Users
                        </Button>
                    ) : null}

                    {props.appState.user.userType === "Admin" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("packages")
                            }
                        >
                            All products
                        </Button>
                    ) : null}

                    {props.appState.user.userType === "Admin" ? (
                        <Button className={classes.white}
                            onClick={() =>
                                props.handleContentChange("addOrganization")
                            }
                        >
                           +
                        </Button>
                    ) : null}       


                </ButtonGroup>
                <IconButton
                    onClick={() =>
                        props.handleContentChange("profile")
                    }
                    size="small"
                    className={classes.white}
                    className={classes.left}
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;