import React, { useState, useEffect } from "react";
import { Container, List, TextField, TableContainer, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, } from "@material-ui/core";
import Divider from '@mui/material/Divider';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from "@material-ui/core";
import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({
    padding: {padding: "16px"},
    div: { display:"flex", height: "100%"},
    container: {height: "400px", opacity: "0.85", perspective:"1000px", backgroundColor: "rgb(255, 255, 255)"},
    list: { maxHeight: 350 },
    cardNumInput: {
        margin: "10px",
        marginRight: "0px",
        width: "200px",
    },
    textField: {
        margin: "10px",
        marginRight: "0px",
        width: "100px",
    }
}));
function PaymentView(props) {
    const classes = useStyles()
    const [add, setAdd] = useState("false")
    const [cardNum, setCardNum] = useState("")
    const [cvv, setCVV] = useState("")
    const [mmdd, setMMDD] = useState("")
    let counter = 0
    const user = props.appState.user

    function cardInput (e){
        // console.log(e.target.value)
        if(e.target.id === "cardNumInput"){
            setCardNum(e.target.value)
        }
        else if (e.target.id === "cvvInput"){
            setCVV(e.target.value)
        }
        else{
            setMMDD(e.target.value)
        }
    }
    

    function getPaymentInfo(){
        const request =  new Request(`${API_HOST}/payment/` + user._id, {
            method: "get"
        })


        fetch(request)
        .then(data => {return data.json()})
        .then(res => {props.updatePayment(res)})    
        .catch(error => {
            console.log(error);
        });

    }

    async function removeCard(cardNum){
        const response = await fetch(`${API_HOST}/payment/` + user._id + '/' + cardNum,
        {
            method: 'DELETE'
        })

        getPaymentInfo()

        if (response.status === 200){
            props.popUp("Card Removed!", "good")
        }

        const resData = 'resource deleted...'
        return resData
    }

    async function addNewCard(cardInfo){
        const response = await fetch(`${API_HOST}/payment/`, {method: 'POST', body: JSON.stringify(cardInfo), headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }})

        if (response.status === 200){
            props.popUp("Card added successfully!", "good")
        }
        else{
            props.popUp("Adding card failed! Please verify the card info and try again.", "bad")
        }

        getPaymentInfo()

        const resData = 'resource added'
        return resData
    }

    useEffect(() => {
        const payment = getPaymentInfo()
    }, [])

    const cardList = props.appState.paymentInfo.filter((card) => card.clientID === user._id)
    const createCardListItems = cardList.map((card) => { // the fakeDate payment info
    counter = counter + 1
    return (
      <TableRow key = {counter}>
          <TableCell>{card.cardNum}</TableCell>
          <TableCell align="left">{card.cvv}</TableCell>
          <TableCell align="left">{card.mmdd}</TableCell>
          <TableCell align="left">
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => {removeCard(card.cardNum)}}>
              DELETE
          </Button>
          </TableCell>
      </TableRow>);
    })

    if (add === "false"){ 
      return (
      <div className={classes.div}>
      <TableContainer className={classes.container} component={Container}>
      <Typography className={classes.padding} variant="h6">Cards Information &nbsp;
      <Button variant="outlined" startIcon={<AddIcon />} onClick={()=>{setAdd("true")}}>new card</Button>
      </Typography>

          <Divider />
          <Table stickyHeader aria-label="cards table">
                  <TableHead>
                      <TableRow>
                          <TableCell>card number</TableCell>
                          <TableCell align="left">cvv</TableCell>
                          <TableCell align="left">mmdd</TableCell>
                          <TableCell align="left"></TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {createCardListItems}

                  </TableBody>
          </Table>
      </TableContainer>
      
  </div>);
  
  } else if (add === "true"){
    const cardInfo = {
        "clientID": user._id, 
        "cardNum": cardNum,
        "cvv": cvv, 
        "mmdd": mmdd
    }
    return (
      <div className={classes.div}>
      <TableContainer className={classes.container} component={Container}>
      
                      <Button  onClick={()=>{setAdd("false")}}> 
                          <BackIcon/> back
                      </Button> 
                      <Typography className={classes.padding} variant="h6">New Card Information </Typography>
                      <List className={classes.list}>
                        
                          <TextField
                              className={classes.cardNumInput}
                              required
                              id="cardNumInput"
                              label="card number"
                              type="text"
                              onChange={cardInput}
                          />
                          <br></br>
                          <TextField
                              className={classes.textField}
                              id="cvvInput"
                              label="cvv"
                              required
                              type="text"
                              onChange={cardInput}
                          />
                          <br></br>
                          <TextField
                              className={classes.textField}
                              required
                              id="mmddInput"
                              label="mmdd"
                              type="text"
                              onChange={ cardInput}
                          />
                          <br /> 
                          <Button variant="contained" onClick={() => {addNewCard(cardInfo)}}>
                              save
                          </Button>
                          
                      </List>
                  
      </TableContainer>
       
    </div>);
    }
}

export default PaymentView;


