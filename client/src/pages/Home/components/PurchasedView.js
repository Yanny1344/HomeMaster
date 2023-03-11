import React, { useEffect, useState } from "react";
import { Container, Slider, TextField, Popover, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Typography, Button } from "@material-ui/core";
import { DateTimePicker, LocalizationProvider,  } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { makeStyles } from "@material-ui/core";
import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({
    div: {
        display:"flex", 
        height: "100%"
    },
    tableContainber: {
        height: "400px", 
        opacity: "0.85", 
        perspective:"1000px", 
        backgroundColor: "rgb(255, 255, 255)"
    },
    padding: {padding: "16px"},
    select: {padding: "5px"},
    divider: {margin: "30px 0 20px 0"},
    input: {margin: "0 30px 0 30px"},
    button: {width: "200px"}
}));
function PurchasedView(props) {
    const classes = useStyles()
    const {purchases, products, user: {userID}} = props.appState;
    const [isInitialized, setIsInitialized] = useState(false)

    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedDuration, setSelectedDuration] = useState(0);
    const [anchorEls, setAnchorEls] = useState(purchases.map(() => null));

    async function fetchData(){
        const purchasesRequest =  new Request(`${API_HOST}/purchase/`+ props.appState.user._id, {
            method: "get"
        })
        const purchasesData = await fetch(purchasesRequest)
        const purchasesRes = await purchasesData.json()
        
        if (purchasesRes) props.updatePurchases(purchasesRes)
        
        const productRequest =  new Request(`${API_HOST}/products/`, {
            method: "get"
        })
        const productData = await fetch(productRequest)
        const productRes = await productData.json()
        if (productRes) props.updateProductList(productRes.products)
        
        setIsInitialized(true)
    }

    async function handleServiceReq(purchaseID, product) {
        console.log(selectedTime)
        const response = await fetch(`${API_HOST}/purchase/`, {method: 'PATCH', body: JSON.stringify({
            purchaseID: purchaseID, clientID: props.appState.user._id, productID: product._id, organizationID: product.organizationID, requestedTime: selectedTime, requestedDuration: selectedDuration
        }), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})

        if (response.status === 200){
            console.log(response)
            props.popUp("Request Successfully sent!", "good")
        }
        else{
            props.popUp("Request Failed... Please check your input", "bad")
        }

        fetchData()
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

    useEffect(() => {
       fetchData()
       .catch(e => {
        console.log(e);
      });

    }, [])

    return (
        <div className={classes.div}>
            <TableContainer className={classes.tableContainber} component={Container}>
                <Typography className={classes.padding} variant="h6">Purchased Products</Typography>
                <Table stickyHeader aria-label="purchases table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="center">Remaning Hours</TableCell>
                            <TableCell align="center">Maximum Service Hours</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isInitialized ? purchases.map((purchase, index) => { 
                            const currProduct = products.find(({_id}) => _id == purchase.productID)


                            const maxDuration = Math.min(purchase.remainingHours, currProduct.maxHour)
                            return (
                                <TableRow key={`row - ${index}`}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{getProductName(currProduct.productType)}</TableCell>
                                    <TableCell align="center">{purchase.remainingHours}</TableCell>
                                    <TableCell align="center">{currProduct.maxHour}</TableCell>
                                    <TableCell align="center">
                                        <Button  variant="outlined" onClick={event => {
                                            const newList = [...anchorEls];
                                            newList[index] = event.currentTarget;
                                            return setAnchorEls(newList);
                                        }}>
                                            Request Service
                                        </Button>
                                        <Popover
                                            open={Boolean(anchorEls[index])}
                                            anchorEl={anchorEls[index]}
                                            onClose={() => {const newList = [...anchorEls]; newList[index] = null; return setAnchorEls(newList)}}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <Container className={classes.padding}>
                                                <Typography variant="body1" display="block" gutterBottom>
                                                    Select Service Start Time
                                                </Typography>
                                                <div className={classes.input}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DateTimePicker
                                                            label="Date and Time"
                                                            value={selectedTime}
                                                            onChange={newValue => setSelectedTime(newValue)}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                <div className={classes.divider}></div>
                                                <Typography variant="body1" display="block" gutterBottom>
                                                    Select Service Duration
                                                </Typography>
                                                <div className={classes.button}>
                                                    <Slider  key={purchase.purchaseID}
                                                        className={classes.input}
                                                        aria-label="Custom marks"
                                                        defaultValue={0.5}
                                                        step={.5}
                                                        valueLabelDisplay="auto"
                                                        min={0.5}
                                                        max={maxDuration}
                                                        marks={[
                                                            {value: 0,label: '0 hour'},
                                                            {value: maxDuration,label: `${maxDuration} hour(s)`,
                                                        }]}
                                                        onChange={(event, newValue) => setSelectedDuration(newValue)}
                                                    />
                                                </div>
                                                <div className={classes.divider}></div>
                                                <div className={classes.input}>
                                                    <Button 
                                                        variant="contained" 
                                                        color="primary" 
                                                        className={classes.button}
                                                        onClick={() => handleServiceReq(purchase._id, currProduct)} 
                                                    >
                                                        Confirm Request
                                                    </Button>
                                                </div>
                                            </Container>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )}):null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PurchasedView;
