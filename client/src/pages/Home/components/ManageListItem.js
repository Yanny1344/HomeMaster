import { Avatar, ListItem, Typography } from "@material-ui/core";
import { ListItemAvatar, ListItemText } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import React, { Component } from "react";
import Divider from '@mui/material/Divider';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    white: {color: "white"},
    antiqueWhite: { color: "AntiqueWhite" },
}));
function ManageListItem(props) {
    const classes = useStyles()

    if (props.processType === "product"){
        return (
            <ListItem>
                <ListItemButton
                    onClick={() => props.observe("true", props.item._id, "false")}
                >
                    <ListItemText 
                        primary={
                            <Typography component={'span'} className ={classes.white}>
                                Product ID : {props.item._id}
                            </Typography>
                        }
                        secondary={
                            <Typography component={'span'} className ={classes.white}>
                                Name:  {props.item.name}
                                <br></br>
                                Hours:  {props.item.hours}
                                <br></br>
                                Price: {props.item.price}
                                <br></br>
                                MaxHours: {props.item.maxHour}
                                <br></br>
                                Hourly Wages: {props.item.hourlyWage}
                            </Typography>
                        }
                    />
                </ListItemButton>
            </ListItem>
        );
    }else{
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={props.item.pfp} />
                </ListItemAvatar>
                <ListItemText 
                    primary={
                        <Typography component={'span'} className ={classes.white}>
                            Employee ID : {props.item._id}
                        </Typography>
                    }
                    secondary={
                        <Typography component={'span'} className ={classes.white}>
                            Name: {props.item.name}
                            <br></br>
                            email: {props.item.email}
                        </Typography>
                    }
                />
            </ListItem>
        );
    } 
}

export default ManageListItem;