import React, { useState, useEffect } from "react";
import { Container, Popover, MenuItem, FormControl, Select, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Typography, Button } from "@material-ui/core";
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
function RequestView(props) {
    const classes = useStyles()

    

    const {events, products, users, user: {_id, userType}, employment} = props.appState;

    // const {organizationID} = users.find(org => userType === "Organization" ? (org._id === _id) : (employment.find(pair => pair.employee === _id).employer === org._id))
    const [requestedEvents, setRequestedEvents] = useState([])
    // events.filter(({organization, status}) => organization === organizationID && status === "requested");
    const [myEmployees, setMyEmployees] = useState([])
    // employment.filter(({employer}) => employer === _id)
    // selected employee ID
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [anchorEls, setAnchorEls] = useState(requestedEvents.map(() => null));

    async function fetchData(){
        
        const productRequest =  new Request(`${API_HOST}/products/`, {
            method: "get"
        })
        const productData = await fetch(productRequest)
        const productRes = await productData.json()
        if (productRes) props.updateProductList(productRes.products)

        if (userType == 'Organization') {
            const eventRequest =  new Request(`${API_HOST}/event/find_requested_event_for_org/${_id}`, {
                method: "get"
            })
            const eventData = await fetch(eventRequest)
            const eventRes = await eventData.json()
            console.log(eventRes)
            if (eventRes) {
                setRequestedEvents(eventRes)
                setAnchorEls(requestedEvents.map(() => null))
            }

            const employeesReq =  new Request(`${API_HOST}/employment/find_employees/${_id}`, {
                method: "get"
            })
            const employeesData = await fetch(employeesReq)
            const employeesRes = await employeesData.json()
            console.log(employeesRes)
            if (employeesRes) {
                setMyEmployees(employeesRes)
                setSelectedEmployee(employeesRes[0].name)
            }
        }else{
            const eventRequest =  new Request(`${API_HOST}/event/find_requested_event_for_worker/${_id}`, {
                method: "get"
            })
            const eventData = await fetch(eventRequest)
            const eventRes = await eventData.json()
            if (eventRes) {
                setRequestedEvents(eventRes)
                setAnchorEls(requestedEvents.map(() => null))
            }
        }

    }
    async function handleAccept(eventID){
        const response = await fetch(`${API_HOST}/event/${eventID}`, {method: 'PATCH', body: JSON.stringify({
            workerID: _id
        }), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})

        if (response.status === 200){
            props.popUp("Successfully accepted!", "good")
            fetchData()
            .catch(e => {
                props.popUp("Request Failed... Please check your input", "bad")
           });
        }
        else{
            props.popUp("Request Failed... Please check your input", "bad")
        }

    }

    async function handleAcceptCertainWorker(eventID){
        const response = await fetch(`${API_HOST}/event/${eventID}`, {method: 'PATCH', body: JSON.stringify({
            workerID: selectedEmployee
        }), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})

        if (response.status === 200){
            props.popUp("Successfully accepted!", "good")
            fetchData()
            .catch(e => {
                props.popUp("Request Failed... Please check your input", "bad")
           });
        }
        else{
            props.popUp("Request Failed... Please check your input", "bad")
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
                <Typography className={classes.padding} variant="h6">Service Requests</Typography>
                <Table stickyHeader aria-label="purchases table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="center">Start Time</TableCell>
                            <TableCell align="center">Duration</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requestedEvents.map((event, index) => { 
                            return (
                                <TableRow key={`row - ${index}`}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{products.find(({_id}) => _id === event.productID)._id}</TableCell>
                                    <TableCell align="center">{event.time}</TableCell>
                                    <TableCell align="center">{event.hours}</TableCell>
                                    <TableCell align="center">
                                        {
                                            userType === "Organization" ? (
                                                <>
                                                <Button  variant="outlined" onClick={event => {
                                                    const newList = [...anchorEls];
                                                    newList[index] = event.currentTarget;
                                                    return setAnchorEls(newList);
                                                }}>
                                                    Assign Employee
                                                </Button> 
                                                <Popover
                                                    open={Boolean(anchorEls[index])}
                                                    anchorEl={anchorEls[index]}
                                                    onClose={() => {const newList = [...anchorEls]; newList[index] = null; setSelectedEmployee(myEmployees[0].employee); return setAnchorEls(newList)}}
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
                                                            Select Employee
                                                        </Typography>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                className={classes.select}
                                                                value={selectedEmployee}
                                                                onChange={event => {setSelectedEmployee(event.target.value)}}
                                                            >
                                                                {myEmployees.map((employee) => (
                                                                    <MenuItem value={employee._id}>
                                                                        {employee.name}
                                                                    </MenuItem>
                                                                ))}
                                                            
                                                            </Select>
                                                        </FormControl>
                                                        <div className={classes.divider}></div>
                                                        <div classNma={classes.input}>
                                                            <Button 
                                                                variant="contained" 
                                                                color="primary" 
                                                                className={classes.button}
                                                                onClick={() =>handleAcceptCertainWorker(event._id)}
                                                            >
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                    </Container>
                                                </Popover>
                                                </>
                                            ) : (
                                                <Button  variant="outlined" onClick={() => handleAccept(event._id)}> 
                                                    Accept
                                                </Button>
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            )})}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default RequestView;
