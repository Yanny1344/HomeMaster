import { Avatar, ListItem, Typography } from "@material-ui/core";
import { ListItemAvatar, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Box } from "@mui/system";
import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({
    white: { color: "AntiqueWhite" }
}));
function CalendarListItem(props) {
    const classes = useStyles()
    const [clientName, setClientName] = useState("")
    const [workerPfp, setWorkerPfp] = useState(null)
    const [productName, setProductName] = useState("")

    useEffect(() => {
        const clientID = props.event.clientID
        const request =  new Request(`${API_HOST}/user/${clientID}`, {
            method: "get"
        })

        fetch(request)
        .then(data => {return data.json()})
        .then(res => {if (res) setClientName(res.name) })    
        .catch(error => {
            console.log(error);
        });

        const workerID = props.event.workerID
        const workerRequest =  new Request(`${API_HOST}/user/${workerID}`, {
            method: "get"
        })

        fetch(workerRequest)
        .then(data => {return data.json()})
        .then(res => {if (res) setWorkerPfp(res.pfp) })    
        .catch(error => {
            console.log(error);
        });

        // const req =  new Request(`${API_HOST}/products/` + props.event.organization, {
        //     method: "get"
        // })
        // fetch(req)
        // .then(data => {return data.json()})
        // .then(res => {if (res) {
        //     console.log(res.products)
        //     props.updateProductList(res.products)}})
        // .catch(error => {
        //     console.log(error);
        // });

        

    }, [])

    const findProductName = () => {
        console.log(props.appState.products)
        console.log(props.event.productID)
        for (const product of props.appState.products) {
            if (product._id === props.event.productID) {
                return product.name;
            }
        }
        return null;
    };

    const findEventTime = () => {
        return new Date(props.event.time).toUTCString();
    };

    const findEventStatus = () => {
        return props.event.status 
    }

    const findProductType = () => {
        for (const product of props.appState.products) {
            if (product._id === props.event.productID) {
                return product.productType;
            }
        }
        return null;
    }

    const getProductName = (productType) => {
        if (productType === 0){
            return "HouseKeeping"
        }
        else if (productType === 1){
            return "Faucet Repair"
        }
        else if (productType === 2){
            return "Baby Sitting"
        }
        else{
            return "Furniture Assembly"
        }
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={workerPfp} />
            </ListItemAvatar>
            <ListItemText
                primary={getProductName(findProductType())}
                secondary={
                    <div><Typography component={'span'} className={classes.white}> {findEventTime()} at {clientName}  </Typography> { findEventStatus() === "finished" ? <Box style={{"color": "yellow"}}>Finished</Box> : <></>}</div>
                }
            />
        </ListItem>
    );
}

export default CalendarListItem;
