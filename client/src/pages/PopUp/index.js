import { Box } from '@mui/system';
import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton'
import AlarmIcon from '@mui/icons-material/Alarm'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import "./styles.css";



class PopUp extends Component {
    state = {  }
    render() {
        const good = this.props.good 
        const content = this.props.content
        const closeIt = this.props.closePopUp

        return (
            <div className="center">
                <Box className="popBox center">
                <IconButton style={{color: "white"}} aria-label="add to shopping cart" onClick={closeIt}>
                    <CloseIcon />
                </IconButton>
                
                <Box className="popContent"><Box className="center" style={{color: "white"}}>{good === "good" ? <CheckCircleOutlineIcon style={{color: "green"}} className="" /> : <ErrorOutlineIcon style={{color: "red"}}/>} {content}</Box>
                </Box>
                </Box>
            </div>
        );
    }
}

export default PopUp;