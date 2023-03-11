import React, { useState, useEffect } from "react";
import { TableContainer,Container, Avatar,ListItemAvatar, ListItemText} from "@mui/material";
import { List, ListItem} from "@material-ui/core";
import {  Typography } from "@material-ui/core";
import Divider from '@mui/material/Divider';
import { makeStyles } from "@material-ui/core";
import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(theme => ({
  black: {
    color: "black"
  },
  container: {
    height: "400px", 
    opacity: "0.85", 
    perspective:"1000px", 
    backgroundColor: "rgb(255, 255, 255)"
  },
  pad1: {
    padding: "16px", 
    color:"black"
  },
  pad2: {
    padding: "10px", 
    color:"black"
  },
  list: {
    height: "100%", 
    overflow: "auto", 
    padding:"3%"
  },
  flex: {
    display:"flex", 
    height: "100%"
  }
}));

function PaystubView(props) {
    const classes = useStyles()
    const user = props.appState.user;
    
    function getEventList(){
      const request =  new Request(`${API_HOST}/event/find_by_worker/` + props.appState.user._id, {
          method: "get"
      })

      fetch(request)
      .then(data => {return data.json()})
      .then(res => {props.updateEvents(res)})
      .catch(error => {
          console.log(error);
      });
    }
    useEffect(() => {
      const events = getEventList()
  }, [])

  const curr_user_finished_events = props.appState.events.filter((event) => event.status === "finished");
    const create_curr_user_jobs_list = curr_user_finished_events.map((job) => {

    return(
        <React.Fragment key={job.eventID}>
        <ListItem alignItems="flex-start">
        {/* <ListItemAvatar>
        
        <Avatar alt="failing to load" src={org.logo} />
        </ListItemAvatar> */}
        <ListItemText
          primary={
            <Typography component={'span'} className={classes.black}>
            Product ID:  {job.productID}
            <br />
            
            </Typography>
          }
          secondary={
            <Typography component={'span'} className={classes.black}>
            work hour: {job.hours}
            <br />
            start time: {job.time.slice(0, 10) + " " + job.time.slice(11, 19)}
            <br />
            </Typography>

          }
        
        />
        </ListItem>
        <Divider variant="inset" component="li" />
        </React.Fragment>
      );
    })

      
      return  (
      <div className={classes.flex}>

      <TableContainer className={classes.container} component={Container}>
      <Typography className={classes.pad2} variant="h6">List of finished jobs: </Typography>
          <List className={classes.list}>
          {create_curr_user_jobs_list}
          </List>
      </TableContainer>
  </div>
  );
}

export default PaystubView;
