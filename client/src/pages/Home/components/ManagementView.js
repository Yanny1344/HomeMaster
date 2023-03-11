import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { List} from "@material-ui/core";
import { Button } from "@mui/material";
import { ListItem, Typography } from "@material-ui/core";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ManageListItem from "./ManageListItem";
import { TextField, Autocomplete } from "@mui/material";

import HouseIcon from '@mui/icons-material/House';
import PeopleIcon from '@mui/icons-material/People';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import TimeIcon from '@mui/icons-material/AccessTime';
import MaxTimeIcon from '@mui/icons-material/MoreTime';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import { makeStyles } from "@material-ui/core";


import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({
    flex: { display: "flex" },
    white: {color: "white"},
    antiqueWhite: { color: "AntiqueWhite" },
    list: { maxHeight: 280, overflow: "auto" },
    detailList: { maxHeight: 245, overflow: "auto" },
    optionBox: {
        color: "Ivory",
        width: "30%",
        float: "left",
        padding: "5%",
        height: "300px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    contentBox: {
        width: "50%",
        float: "left",
        padding: "5%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        color: "white",
    },
    smallTextField: {
        margin: "10px",
        marginRight: "0px",
        width: "120px",
    },
    multiLineTextField: {
        margin: "10px",
        marginRight: "0px",
        width: "450px",
    },
    mediumTextField: {
        margin: "10px",
        marginRight: "0px",
        width: "250px",
    }
}));
function ManagementView(props) {
    const classes = useStyles()
    const [content, setContent] = useState(0)
    const [showProduct, setShowProduct] = useState("false")
    const [desriptionProductID, setDescriptionID] = useState(null)
    const [enableProductButton, setEnableProductButton] = useState("true")
    const [addItem, setAddItems] = useState(0)
    const [clickBack, setClickBack] = useState("false")

    // add product
    const [productType, setProductType] = useState(0)
    const [organizationID, setOrganizationID] = useState(props.appState.user._id)
    const [price, setPrice] = useState(0)
    const [hours, setHours] = useState("")
    const [maxHour, setMaxHour] = useState(0)
    const [des, setDes] = useState("")
    const [hourlyWage, setHourlyWage] = useState(0)

    // add employee
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userType, setUserType] = useState("Employee")
    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")
    // const [currEmployeeId, setCurrEmployeeId] = useState("")

    const chooseProductType = [{title: "HouseKeeping"}, {title: "Faucet Repair"}, {title: "Baby Sitting"}, {title: "Furniture Assembly"}];

    const getProductName = (productType) => {
        if (productType === "HouseKeeping"){
            return 0
        }
        else if (productType === "Faucet Repair"){
            return 1
        }
        else if (productType === "Baby Sitting"){
            return 2
        }
        else{
            return 3
        }
    }

    const handleSwitch = (value) => {
        setContent(value);
    }

    const observeShowProduct = (value1, productID, value2) =>{
        setShowProduct(value1);
        setDescriptionID(productID);
        setEnableProductButton(value2);
    }

    const hideProductDetail = () => {
        setShowProduct("false");
        setEnableProductButton("true");
    }

    const showAddProductPage = () => {
        setContent(2)
        setEnableProductButton("false");
        setAddItems(0)
    }

    const hideAddProductPage = () => {
        addProduct() // after clicking the confrim button for add product
        setContent(0)
        setEnableProductButton("true");
    }

    const handleBackProductPage = () => {
        setContent(0)
        setEnableProductButton("true");
    }

    const showAddEmployeePage = () => {
        setContent(2)
        setEnableProductButton("false");
        setAddItems(1)
    }

    const hideAddEmployeePage = () => {

        addEmployee() // after clicking the confrim button for add employee
        console.log("after calling addEmployee")
        // SetEmployment() // setup employment relationship
        setContent(1)
        setEnableProductButton("true");
    }

    const handleBackEmployeePage = () => {
        setContent(1)
        setEnableProductButton("true");
    }

    const handleTextInput = (field) => {
        const value = field.value;
        const name = field.name;

        if (name === "productType"){
            setProductType(value )
        }else if (name === "price"){
            setPrice(value)
        }else if (name === "hours"){
            setHours(value)
        }else if (name === "maxHour"){
            setMaxHour(value)
        }else if (name === "des"){
            setDes(value)
        }else if (name === "hourlyWage"){
            setHourlyWage(value)
        }else if (name === "name"){
            setName(value)
        }else if (name === "email"){
            setEmail(value)
        }else if (name === "userName"){
            setuserName(value)
        }else if (name === "password"){
            setPassword(value)
        }
    }

    function addProduct(){
        console.log(maxHour)
        const request =  new Request(`${API_HOST}/product/create`, {
            method: "post",
            body: JSON.stringify({
                productType: productType,
                organizationID: organizationID,
                price: price,
                hours: hours,
                maxHour:maxHour,
                des: des,
                hourlyWage: hourlyWage,
                name: props.appState.user.name,
                pfp: props.appState.user.pfp
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
        fetch(request).then(res => {
            return res.json()
        }).then(json => {
            props.popUp("Product added successfully!", "good")
            getProductList()
        }).catch(error => {
            console.log(error)
            props.popUp("Adding product failed! Please verify the product info and try again.", "bad")
            getProductList()
        })
    }

    function getProductList(){
        const request =  new Request(`${API_HOST}/products/` + props.appState.user._id, {
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
        const products = getProductList()
    }, [])

    function addEmployee(){
        const request =  new Request(`${API_HOST}/user/signup`, {
            method: "post",
            body: JSON.stringify({
                userType: userType,
                pfp: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
                userName: userName,
                password: password,
                email: email,
                name: name
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
        fetch(request).then(res => {
            return res.json()
        }).then(json => {
            SetEmployment(json._id)
            props.popUp("Employee added successfully!", "good")
            getEmploymentList()
            getEmployeeList()
        }).catch(error => {
            console.log(error)
            props.popUp("Adding employee failed! Please verify the employee info and try again.", "bad")
            getEmploymentList()
            getEmployeeList()
        })
    }

    function SetEmployment(currEmployeeId){
        const request =  new Request(`${API_HOST}/employment/`, {
            method: "post",
            body: JSON.stringify({
                employer_id: props.appState.user._id,
                employee_id: currEmployeeId,
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
        console.log("set employment!!")
        console.log(currEmployeeId)
        fetch(request).then(res => {
            return res.json()
        }).catch(error => {
            console.log(error)
        })
    }

    function getEmployeeList(){
        const request =  new Request(`${API_HOST}/employees`, {
            method: "get"
        })

        fetch(request)
        .then(data => {return data.json()})
        .then(res => {props.updateEmployeeList(res.employees)})
        .catch(error => {
            console.log(error);
        });

    }

    useEffect(() => {
        const employee = getEmployeeList()
    }, [])

    function getEmploymentList(){
        const request =  new Request(`${API_HOST}/employment/` + props.appState.user._id, {
            method: "get"
        })
        fetch(request)
        .then(data => {return data.json()})
        .then(res => {props.updateEmploymentList(res)})
        .catch(error => {
            console.log(error);
        });

    }

    useEffect(() => {
        const employedEmployees = getEmploymentList()
    }, [])

    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const showOptionButton = () => {
        if (enableProductButton === "true"){
            return (
                <nav aria-label="main mailbox folders">
                        <List>
                        <ListItem>
                            <ListItemButton
                                onClick={() => handleSwitch(0)}
                            >
                            <ListItemIcon>
                                <HouseIcon />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemButton
                                onClick={() => handleSwitch(1)}
                            >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Employees" />
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
                        <ListItemText primary="Products" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton disabled>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Employees" />
                        </ListItemButton>
                    </ListItem>
                    </List>
                </nav>
            );
        }
    }

    const showContent = () => {
        if (content === 0){
            let counter = 0;
            const productList = props.appState.products
            const filteredProductList = productList.map((product) => ( // the fakeDate products
                <ManageListItem
                    item={product}
                    appState={props.appState}
                    key={counter}
                    observe={observeShowProduct}
                    processType={"product"}
                >
                    {counter = counter + 1}
                </ManageListItem>
            ));
            if (showProduct === "false"){
                return (
                    <List className={classes.list}>
                        {filteredProductList}
                        <Button variant="contained" onClick={() => showAddProductPage()}>
                            Add More                   
                        </Button>
                    </List>
                ); 
            }else {
                const referProductID = desriptionProductID;
                const productList = props.appState.products
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
                return (
                    <Box>
                        <Button className={classes.white} onClick={hideProductDetail}> 
                            <BackIcon/> 
                        </Button> 
                        <List className={classes.detailList}>
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
                        </List>
                    </Box>
                );
            }
            
        }else if (content === 1){
            // employee
            let counter = 0;
            const employmentList = props.appState.employments
            let employeeList = props.appState.employees
            const inputEmployeeIdList = []
            for (let item of employmentList){
                for (let employee of employeeList){
                    if (item['employee_id'] === employee._id){
                        inputEmployeeIdList.push(employee)
                    }
                }
            }
            
            const filteredEmployeeList = inputEmployeeIdList.map((employee) => ( // the fakeDate products
                <ManageListItem
                    item={employee}
                    appState={props.appState}
                    key={counter}
                    observe={observeShowProduct}
                    processType={"employee"}
                >
                    {counter = counter + 1}
                </ManageListItem>
            ));
            if (showProduct === "false"){
                return (
                    <List className={classes.list}>
                        {filteredEmployeeList}
                        <Button variant="contained" onClick={() => showAddEmployeePage()}>
                            Add More                   
                        </Button>
                    </List>
                ); 
            }
        }else{
            // show add item page
            if (addItem === 0){
                // add product page
                return (
                    <Box>
                        <Button className={classes.white} onClick={handleBackProductPage}> 
                            <BackIcon/> 
                        </Button> 
                        <List className={classes.detailList}>
                            {/* <TextField
                                className={classes.mediumTextField}
                                required
                                id="productIdInput"
                                label="ProductType"
                                type="text"
                                name="productType"
                                onChange={(e) => handleTextInput(e.target)}
                            /> */}
                            <Autocomplete
                                freeSolo
                                id="tags-standard"
                                value={productType}
                                onChange={(event, newValue) => {
                                    setProductType(getProductName(newValue));

                                }}
                                options={chooseProductType.map((option) => option.title)}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="user type"
                                    name="productType"
                                    // onChange={(e) => handleTextInput(e.target)}
                                    
                                />
                                )}
                            />
                            <br></br>
                            <TextField
                                className={classes.multiLineTextField}
                                id="descriptionInput"
                                label="Description"
                                multiline
                                type="text"
                                rows={4}
                                name="des"
                                onChange={(e) => handleTextInput(e.target)}
                            />
                            <br></br>
                            <TextField
                                className={classes.smallTextField}
                                required
                                id="hoursInput"
                                label="Hours"
                                type="text"
                                name="hours"
                                onChange={(e) => handleTextInput(e.target)}
                            />
                            <TextField
                                className={classes.smallTextField}
                                required
                                id="priceInput"
                                label="Price"
                                type="text"
                                name="price"
                                onChange={(e) => handleTextInput(e.target)}
                            />
                            <br></br>
                            <TextField
                                className={classes.smallTextField}
                                required
                                id="maxHoursInput"
                                label="Max Hours"
                                type="text"
                                name="maxHour"
                                onChange={(e) => handleTextInput(e.target)}
                            />
                            <TextField
                                className={classes.smallTextField}
                                required
                                id="hourlyWagesInput"
                                label="Hourly Wages"
                                type="text"
                                name="hourlyWage"
                                onChange={(e) => handleTextInput(e.target)}
                            />
                            <br></br>
                            <Button variant="contained" onClick={hideAddProductPage}>
                                Confirm 
                            </Button>
                            
                        </List>
                    </Box>
                );


            }else{
                return (
                    <Box>
                        <Button className={classes.white} onClick={handleBackEmployeePage}> 
                            <BackIcon/> 
                        </Button> 
                        <List className={classes.detailList}>
                            <TextField
                                className={classes.mediumTextField}
                                required
                                id="nameInput"
                                label="Name"
                                type="text"
                                name="name"
                                onChange={(e) => handleTextInput(e.target)}
                            />
                            <br></br>
                            <TextField
                                className={classes.mediumTextField}
                                required
                                id="userNameInput"
                                label="User Name"
                                type="text"
                                name="userName"
                                onChange={(e) => handleTextInput(e.target)}
                            />
                            <br></br>
                            <TextField
                                className={classes.mediumTextField}
                                required
                                id="emailInput"
                                label="Email"
                                type="text"
                                name="email"
                                onChange={(e) => handleTextInput(e.target)}
                            />
                            <br></br>
                            <TextField
                                className={classes.mediumTextField}
                                required
                                id="passwordInput"
                                label="Password"
                                type="text"
                                name="password"
                                onChange={(e) => handleTextInput(e.target)}
                            />
                            <br></br>
                            <Button variant="contained" onClick={hideAddEmployeePage}>
                                Confirm 
                            </Button>
                            
                        </List>
                    </Box>
                );
            }
            
        }
    }

    return (
        <div className={classes.flex}>
            <Box
                className={classes.optionBox}
            >  
                {showOptionButton()}
            </Box>

            <Box
                className={classes.contentBox}
            >   
                {showContent()}
            </Box>
        </div>
    );
}

export default ManagementView;
