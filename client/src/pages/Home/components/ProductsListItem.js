import { Avatar, ListItem, Typography } from "@material-ui/core";
import { ListItemAvatar, ListItemText } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    antiqueWhite: {
        color: "AntiqueWhite"
    },
    
  }));
  
function ProductsListItem(props) {
    const classes = useStyles()

    if (props.processType === "product"){
        return (
            <ListItem>
                <ListItemButton
                    onClick={() => props.observe("true", props.item._id, "false")}
                >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={props.item.pfp} />
                    </ListItemAvatar>
                    <ListItemText 
                        primary={props.item.name}
                        secondary={
                            <Typography component={'span'} className={classes.antiqueWhite}>
                                Hours:  {props.item.hours}
                                <br></br>
                                Price: {props.item.price}
                                <br></br>
                                Maximum Hours: {props.item.maxHour}
                            </Typography>
                        }
                    />
                </ListItemButton>
            </ListItem>
        );
    }else{
        return (
            <ListItem>
                <ListItemButton
                    onClick={() =>props.handleClick()}
                >
                    {/* <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={props.item.pfp} />
                    </ListItemAvatar> */}
                    <ListItemText 
                        primary={props.item.cardNum}
                        secondary={
                            <Typography component={'span'} className={classes.antiqueWhite}>
                                {/* Card Number:  {props.item.cardNum}
                                <br></br> */}
                                cvv: {props.item.cvv}
                                <br></br>
                                Expired date: {props.item.mmdd}
                            </Typography>
                        }
                    />
                </ListItemButton>
            </ListItem>
        );
    }
    

}

export default ProductsListItem;