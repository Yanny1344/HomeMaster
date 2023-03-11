import "./App.css";
import React, {useState} from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { checkSession } from "./actions/user";
import PopUp from "./pages/PopUp";

class App extends React.Component {


    componentDidMount() {
        checkSession(this); // sees if a user is logged in
    }

    // global state passed down includes the current logged in user.
    state = {
        // Current user info
        user: null,

        products: [],
        employees: [],
        employments: [],
        users: [],
        purchases: [],
        paymentInfo: [],
        events: [],
        showPop : false,
        popContent : "",
        popUpGood: "good"
    }

    popUp = (info, goodOrBad) => {
        this.setState({...this.state, showPop: true, popContent: info, popUpGood: goodOrBad})
    }

    closePopUp = () => {
        this.setState({...this.state, showPop: false})
    }

    handleLogin = (user) => {
        this.setState({...this.state, user: user });
    };

    updatePayment = (payments) =>{
        this.setState({...this.state, paymentInfo: payments });
    }
    
    updateEvents = (events) =>{
        this.setState({...this.state, events: events });
    }
    updateUsers = (users) =>{
        this.setState({...this.state, users: users });
    }

    updateProductList = (products) => {
        this.setState({...this.state, products: products });
    }

    updateEmployeeList = (employees) => {
        this.setState({...this.state, employees: employees });
    }

    updateEmploymentList = (employments) => {
        this.setState({...this.state, employments: employments });
    }

    updatePurchases = (purchases) => {
        this.setState({...this.state, purchases: purchases });
    }
    
    theme = createTheme({
    shadows: ["none"],
    zDepthShadows: "none"
    });
    

    render() {
        return (
            
            <ThemeProvider theme={this.theme}>
             <div>
                {
                    this.state.user ? 
                    <Home 
                        app={this}
                        appState={this.state} 
                        updateUsers={this.updateUsers}
                        updateEmploymentList={this.updateEmploymentList}
                        updateEmployeeList={this.updateEmployeeList} 
                        updateEvents={this.updateEvents}
                        updateProductList={this.updateProductList} 
                        updatePayment={this.updatePayment} 
                        updatePurchases={this.updatePurchases}
                        popUp={this.popUp}
                    /> 
                    : <Login app={this} appState={this.state} login={this.handleLogin} popUp={this.popUp} />
                } </div>
            <div>
                {this.state.showPop ? <PopUp content={this.state.popContent} good={this.state.popUpGood} closePopUp={this.closePopUp}></PopUp> : <></>}
            </div>
                
            </ThemeProvider>
        )
    }
}

export default App;
