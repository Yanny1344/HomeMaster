import React from "react";
import { Box } from "@mui/system";
import { TableContainer,Container, Avatar,ListItemAvatar, ListItemText} from "@mui/material";
import { List, ListItem, Button } from "@material-ui/core";
import {  Typography } from "@material-ui/core";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import { makeStyles } from "@material-ui/core";
import { logout } from "../../../actions/user"

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
    list: {height: "100%", overflow: "auto", padding:"3%"}
}));
function ProfileView(props) {
    const classes = useStyles()
    const user = props.appState.user;
    const { app } = props

    const logoutUser = (app) => {
        logout(app);
    };
    return (
        <div className={classes.div}>

            <TableContainer className={classes.container} component={Container}>
                <Box
                className={classes.box}
            >
            <Avatar alt="failed to load" src={user.pfp} sx={{ width: 90, height: 90 }}/>
            </Box>
                <List  
                className={classes.list}
                >
            <ListItem key={0}>
            <ListItemAvatar>
            {/* <Avatar>
                <AccountBoxIcon />
            </Avatar> */}
            <AccountBoxIcon />
            </ListItemAvatar>
            <ListItemText primary={
                <Typography component={'span'} className={classes.white}>
                Name:  {user.name}
                </Typography>
                
                } />
            </ListItem>
            <ListItem key={1}>
                <ListItemAvatar>
                {/* <Avatar>
                    <EmailIcon />
                </Avatar> */}
                <EmailIcon />
                </ListItemAvatar>
                <ListItemText primary= {
                <Typography component={'span'} className={classes.white}>
                    Email:  {user.email}
                    </Typography>}
                />
            </ListItem>
            <ListItem key={2}>
                <ListItemAvatar>
                {/* <Avatar>
                    <AccountBoxIcon />
                </Avatar> */}
                </ListItemAvatar>
                <ListItemText primary={
                <Typography component={'span'} className={classes.white}>
                    User Type:  {user.userType}
                    </Typography>} />
            </ListItem>
            <ListItem key={3}>
                <ListItemAvatar>
                {/* <Avatar>
                    <AccountBoxIcon />
                </Avatar> */}
            
                </ListItemAvatar>
                <ListItemText primary={
                <Typography component={'span'} className={classes.white}>
                    userID:  {user._id}
                    </Typography>} />
            </ListItem>
            <Button 
                variant="outlined"
                onClick={(e) => logoutUser(app)}
            >
                Log out 
            </Button>
            </List>
            </TableContainer>
        </div>

        
        
        
    // </div>
    );
}

export default ProfileView;
