import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { List} from "@material-ui/core";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ProductsListItem from "./ProductsListItem";
import { Button } from "@mui/material";
import { ListItem, Typography } from "@material-ui/core";

import HouseIcon from '@mui/icons-material/House';
import BathIcon from '@mui/icons-material/Bathtub';
import ChildIcon from '@mui/icons-material/ChildFriendly';
import ChairIcon from '@mui/icons-material/Chair';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import TimeIcon from '@mui/icons-material/AccessTime';
import MaxTimeIcon from '@mui/icons-material/MoreTime';
import MoneyIcon from '@mui/icons-material/AttachMoney';

import { makeStyles } from "@material-ui/core";

import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({
    flex: {display: "flex"},
    list: { maxHeight: 350, overflow: "auto" },
    white: {color: "white"},
    antiqueWhite: { color: "AntiqueWhite" },
    productBox: {
        color: "Ivory",
        width: "30%",
        float: "left",
        padding: "5%",
        height: "400px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",     
    },
    contentBox: {
        width: "50%",
        float: "left",
        padding: "5%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        color: "white",
    }
  
}));
function HomeView(props) {
    const classes = useStyles()
    const [currProductType, setCurrProductType] = useState(0)
    const [showDesription, setShowDesription] = useState("false")
    const [desriptionProductID, setDescriptionID] = useState(null)
    const [purchaseStatus, setPurchaseStatus] = useState("false")
    const [enableProductButton, setEnableProductButton] = useState("true")
    const [showSelectCard, setShowSelectCard] = useState("false")

    const handleProductSwitch = (productId) => {
        setCurrProductType(productId);
    };

    const observeShowDescription = (value1, desId, value2) => {
        setShowDesription(value1);
        setDescriptionID(desId);
        setEnableProductButton(value2);
    };

    const hideDesription = () => {
        setShowDesription('false');
        setPurchaseStatus('false');
        setEnableProductButton('true');
    }

    const disableButton = (referProductID, hours) => {
        setPurchaseStatus("true");
        addPurchase(referProductID, hours)
    }

    const handleSelectCard = () => {
        setShowSelectCard("true")
        getPaymentInfo()
    }

    const hideSelectCard = () => {
        setShowSelectCard("false")
    }

    const getAllProductList = () => {
        const request =  new Request(`${API_HOST}/products`,{
            method: "get"
        })

        fetch(request)
        .then(data => {return data.json()})
        .then(res => {props.updateProductList(res.products)})
        .catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        const products = getAllProductList()
    }, [])

    function getPaymentInfo(){
        const request =  new Request(`${API_HOST}/payment/` + props.appState.user._id, {
            method: "get"
        })


        fetch(request)
        .then(data => {return data.json()})
        .then(res => {props.updatePayment(res)})    
        .catch(error => {
            console.log(error);
        });

    }

    useEffect(() => {
        const payment = getPaymentInfo()
    }, [])

    function addPurchase(referProductID, hours){
        const request =  new Request(`${API_HOST}/purchase`, {
            method: "post",
            body: JSON.stringify({
                clientID: props.appState.user._id, 
                productID: referProductID,
                remainingHours: hours[0]
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
        fetch(request).then(res => {
            return res.json()
        }).then(json => {
            props.popUp("Product purchased successfully!", "good")
        }).catch(error => {
            console.log(error)
            props.popUp("purchasing products failed!", "bad")
        })
    }

    const showButton = (referProductID, hours) => {
        if (purchaseStatus === "false") {
            return (
                <div>
                    <Button 
                        variant="contained"
                        onClick={() => handleSelectCard()}
                    >
                        Select Card
                    </Button>
                    <br></br>
                    <br></br>
                    <Button 
                        variant="contained"
                        onClick={() => disableButton(referProductID, hours)}
                    >
                        Place Order
                    </Button>
                </div>
            );
        }else{
            return (
                <div>
                    <Button 
                        variant="contained"
                        onClick={() => handleSelectCard()}
                    >
                        Select Card
                    </Button>
                    <br></br>
                    <br></br>
                    <Button variant="contained" disabled>
                        Place Order
                    </Button>
                </div>
            );
        }
    }

    const showProductButton = () =>{
        if (enableProductButton === "true"){
            return(
                <nav aria-label="main mailbox folders">
                    <List>
                    <ListItem>
                        <ListItemButton
                            onClick={() => handleProductSwitch(0)}
                        >
                        <ListItemIcon>
                            <HouseIcon />
                        </ListItemIcon>
                        <ListItemText primary="Housekeeping" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton
                            onClick={() => handleProductSwitch(1)}
                        >
                        <ListItemIcon>
                            <BathIcon />
                        </ListItemIcon>
                        <ListItemText primary="Faucet Repair" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton
                            onClick={() => handleProductSwitch(2)}
                        >
                        <ListItemIcon>
                            <ChildIcon />
                        </ListItemIcon>
                        <ListItemText primary="Baby Sitting" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton
                            onClick={() => handleProductSwitch(3)}
                        >
                        <ListItemIcon>
                            <ChairIcon />
                        </ListItemIcon>
                        <ListItemText primary="Furniture Assembly" />
                        </ListItemButton>
                    </ListItem>
    
                    </List>
                </nav>
            );
        }else{
            return(
                <nav aria-label="main mailbox folders">
                    <List>
                    <ListItem>
                        <ListItemButton disabled>
                        <ListItemIcon>
                            <HouseIcon />
                        </ListItemIcon>
                        <ListItemText primary="Housekeeping" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton disabled>
                        <ListItemIcon>
                            <BathIcon />
                        </ListItemIcon>
                        <ListItemText primary="Faucet Repair" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton disabled>
                        <ListItemIcon>
                            <ChildIcon />
                        </ListItemIcon>
                        <ListItemText primary="Baby Sitting" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton disabled>
                        <ListItemIcon>
                            <ChairIcon />
                        </ListItemIcon>
                        <ListItemText primary="Furniture Assembly" />
                        </ListItemButton>
                    </ListItem>
    
                    </List>
                </nav>
            );
        }
        
    }

    const showContent = (filteredProductList, productList) => {
        if (showDesription === "false"){
            return (
                <List className={classes.list}>
                    SERVICE PACKAGES
                    {filteredProductList}
                </List>
            );
        } else{
            if (showSelectCard === "false"){
                const referProductID = desriptionProductID;
                const organizationName = productList.map(function (product) {
                    if (product._id === referProductID){
                        return product.name;
                    }
                })
                const content = productList.map(function (product) {
                    if (product._id === referProductID){
                        return product.des;
                    }
                })

                const hours = productList.map(function (product) {
                    if (product._id === referProductID){
                        return product.hours;
                    }
                })

                const price = productList.map(function (product) {
                    if (product._id === referProductID){
                        return product.price;
                    }
                })

                const maxHour = productList.map(function (product) {
                    if (product._id === referProductID){
                        return product.maxHour;
                    }
                })

                return(
                    <Box>
                        <Button className={classes.white} onClick={hideDesription}> 
                            <BackIcon/> 
                        </Button>
                        {organizationName}
                        <List className={classes.list}>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Typography 
                                            component={'span'} 
                                            className={classes.white}
                                        > 
                                            Description:
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Typography 
                                            component={'span'} 
                                            className={classes.white}
                                        > 
                                            {content}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Typography 
                                            component={'span'} 
                                            className={classes.antiqueWhite}
                                        > 
                                            <TimeIcon /> Hours: {hours}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                            <ListItemText
                                    primary={
                                        <Typography
                                            component={'span'} 
                                            className={classes.antiqueWhite}
                                        > 
                                            <MoneyIcon /> Price: {price}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                            <ListItemText
                                    primary={
                                        <Typography
                                            component={'span'} 
                                            className={classes.antiqueWhite}
                                        > 
                                            <MaxTimeIcon /> Maximum Hours: {maxHour}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                {showButton(referProductID, hours)}
                            </ListItem>
                        </List>
                    </Box>
                );
            }else{
                let counter = 0;
                console.log(props.appState.paymentInfo)
                const paymentList = props.appState.paymentInfo.map((card) => ( // the fakeDate products
                    <ProductsListItem
                        processType={"card"}
                        item={card}
                        appState={props.appState}
                        key={counter}
                        handleClick={hideSelectCard}
                        // productType={currProductType}
                        // observe={observeShowDescription}
                    >
                        {counter = counter + 1}
                    </ProductsListItem>
                ));
                return(
                    <Box>
                    <Button className={classes.white} onClick={hideSelectCard}> 
                        <BackIcon/> 
                    </Button>
                    <List className={classes.list}>
                        Available cards
                        {paymentList}
                    </List>

                </Box>
                );
            }
            
        }
    };

    let counter = 0;
    const productList = props.appState.products.filter((product) => product.productType === currProductType)
    const filteredProductList = productList.map((product) => ( // the fakeDate products
        <ProductsListItem
            processType={"product"}
            item={product}
            appState={props.appState}
            key={counter}
            productType={currProductType}
            observe={observeShowDescription}
        >
            {counter = counter + 1}
        </ProductsListItem>
    ));
    
    return (
        <div className={classes.flex}>
            <Box
                className={classes.productBox}
            >  
                {showProductButton()}    
            </Box>

            <Box
                className={classes.contentBox}
            >   
                {showContent(filteredProductList, productList)}
            </Box>
        </div>
    );
}

export default HomeView;
