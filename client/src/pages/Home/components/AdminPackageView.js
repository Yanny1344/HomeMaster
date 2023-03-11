import { TableContainer, Table, TableCell, TableHead, TableRow, Typography, Container, Button, TableBody} from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({
    flex: {display:"flex", height: "100%"},
    container: {height: "400px", opacity: "0.85", perspective:"1000px", backgroundColor: "rgb(255, 255, 255)"},
    pad: {padding: "16px"}
}));

function AdminPackageView(props) {
    const classes = useStyles()

    function getProduct(){
        const request =  new Request(`${API_HOST}/products`, {
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
        const u = getProduct()
    }, [])

    async function removeProduct(productID){
        console.log(productID)
        const response = await fetch(`${API_HOST}/product/` + productID,
        {
            method: 'DELETE'
        })
        getProduct()
        const resData = 'resource deleted...'
        return resData
    }


    return (
        <div className={classes.flex}>
        <TableContainer className={classes.container} component={Container}>
            <Typography className={classes.pad} variant="h6">Packages</Typography>
            <Table stickyHeader aria-label="packages table">
                <TableHead>
                    <TableRow>
                        <TableCell>Organization ID</TableCell>
                        <TableCell align="center">Product ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="left">Product Type</TableCell>
                        <TableCell align="left">Price</TableCell>
                        <TableCell align="left">Max hours</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.appState.products.map((the_product,index) => {     
                        const Product_ID = the_product._id;
                        const Organization_ID = the_product.organizationID;
                        const Name = the_product.name;
                        const Product_Type = the_product.productType;
                        const Price = the_product.price;
                        const Max_hours = the_product.maxHour;
                        
                    return (
                        <TableRow 
                        key={`row - ${index}`}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{Organization_ID}</TableCell>
                                    <TableCell align="left">{Product_ID}</TableCell>
                                    <TableCell align="left">{Name}</TableCell>
                                    <TableCell align="left">{Product_Type}</TableCell>
                                    <TableCell align="left">{Price}</TableCell>
                                    <TableCell align="left">{Max_hours}</TableCell>
                                    <TableCell>
                                    <TableCell align="left">
                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => {removeProduct(the_product._id)}}>
                                            DELETE
                                        </Button>
                                    </TableCell>
                                    </TableCell>
                        </TableRow>
                        )})}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
    }

export default AdminPackageView;