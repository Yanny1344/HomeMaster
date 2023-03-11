import React, { Component } from "react";
import { Box } from "@mui/material";
import "./styles.css";
import ProfileView from "./components/ProfileView";
import HomeView from "./components/HomeView";
import ManagementView from "./components/ManagementView";
import CalendarView from "./components/CalendarView";
import RequestView from "./components/RequestView";
import PaystubView from "./components/PaystubView";
import PurchasedView from "./components/PurchasedView";
import PaymentView from "./components/PaymentView";
import AdminUserView from "./components/AdminUserView";
import AdminPackageView from "./components/AdminPackageView";
import AdminAddView from "./components/AdminAddView";

import NavBar from "./components/NavBar";
import BottomBar from "./components/BottomBar";

const components = {
    profile: ProfileView,
    home: HomeView,
    management: ManagementView,
    calendar: CalendarView,
    requests: RequestView,
    paystub: PaystubView,
    purchased: PurchasedView,
    payment: PaymentView,
    users: AdminUserView,
    packages: AdminPackageView,
    addOrganization:AdminAddView,
};

class Home extends Component {
    state = {
        content: "",
    };

    handleContentChange = (value) => {
        this.setState({ content: value });
    };

    // By default, show CalendarView for Org/Employee, or HomeView for Client
    showContent = () => {
        if (this.state.content === "") {
            if (this.props.appState.user.userType === "Client") {
                return  (
                    <HomeView 
                        appState={this.props.appState}
                        updateProductList={this.props.updateProductList}
                        updatePayment={this.props.updatePayment} 
                        popUp={this.props.popUp}
                    >
                    </HomeView>
                );
            }else if (this.props.appState.user.userType === "Admin") {
                return  (
                    <AdminUserView 
                        appState={this.props.appState}
                        updateProductList={this.props.updateProductList}
                        updateUsers={this.props.updateUsers}
                        popUp={this.props.popUp}
                    ></AdminUserView>
                );
            }else {
                return (
                    <CalendarView 
                        appState={this.props.appState} 
                        updateEvents={this.props.updateEvents} 
                        updateProductList={this.props.updateProductList}
                    >
                    </CalendarView>
                );
            }
        } else {
            const ComponentName = components[this.state.content];
            return (
                <ComponentName 
                    app={this.props.app}
                    appState={this.props.appState} 
                    updateUsers={this.props.updateUsers}
                    updateEvents={this.props.updateEvents}
                    updateEmploymentList={this.props.updateEmploymentList}
                    updateEmployeeList={this.props.updateEmployeeList}
                    updateProductList={this.props.updateProductList} 
                    updatePayment={this.props.updatePayment} 
                    updatePurchases={this.props.updatePurchases}
                    popUp={this.props.popUp}
                >
                </ComponentName>
            );
        }
    };

    render() {
        return (
            <div className="backg center">
                <Box className="mainWindowBox center">
                    <NavBar
                        {...this.props}
                        handleContentChange={this.handleContentChange}
                    ></NavBar>
                    <div style={{ minHeight: 400 }}>
                        {this.showContent(this.state.content)}
                    </div>
                    <BottomBar></BottomBar>
                </Box>
            </div>
        );
    }
}

export default Home;
