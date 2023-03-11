import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import PickersDay from "@mui/lab/PickersDay";
import { TextField, Badge } from "@mui/material";
import { List, ListItem } from "@material-ui/core";
import CalendarListItem from "./CalendarListItem";
import { makeStyles } from "@material-ui/core";
import ENV from './../../../config.js'
const API_HOST = ENV.api_host

const useStyles = makeStyles(() => ({
    flex: { display: "flex" },
    box: {
        color: "Ivory",
        width: "30%",
        float: "left",
        padding: "5%",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    list: { maxHeight: 350, overflow: "auto" },
    placeholder: { top: "50%", left: "50%", color: "white" },
    datePickerContainer: {
        width: "50%",
        float: "left",
        padding: "5%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    datePicker: { color: "rgba(255, 255, 255, 0.6" }
}));
function CalendarView (props) {
    const classes = useStyles()
    const [date, setDate] = useState(new Date(new Date().toDateString()))

    useEffect(() => {
        const user = props.appState.user;
        if (user.userType === "Organization") {
            const request =  new Request(`${API_HOST}/event/find_by_org/`+props.appState.user._id, {
                method: "get"
            })
            fetch(request)
            .then(data => {return data.json()})
            .then(res => {if (res) props.updateEvents(res)})    
            .catch(error => {
                console.log(error);
            });
            const productRequest =  new Request(`${API_HOST}/products/` + props.appState.user._id, {
                method: "get"
            })
            fetch(productRequest)
            .then(data => {return data.json()})
            .then(res => {if (res) {
                console.log(res.products)
                props.updateProductList(res.products)}})
            .catch(error => {
                console.log(error);
            });
        } else if (user.userType === "Employee") {
            const request =  new Request(`${API_HOST}/event/find_by_worker/`+props.appState.user._id, {
                method: "get"
            })
            fetch(request)
            .then(data => {return data.json()})
            .then(res => {if (res) props.updateEvents(res)})    
            .catch(error => {
                console.log(error);
            });
        } else {
            const request =  new Request(`${API_HOST}/event/find_by_client/`+props.appState.user._id, {
                method: "get"
            })
            fetch(request)
            .then(data => {return data.json()})
            .then(res => {if (res) props.updateEvents(res)})    
            .catch(error => {
                console.log(error);
            });

            const productRequest =  new Request(`${API_HOST}/products/`, {
                method: "get"
            })
            fetch(productRequest).then(data => {return data.json()})
            .then(res => {if (res) props.updateProductList(res.products)})    
            .catch(error => {
                console.log(error);
            });
        }
        
        
    }, []) 

    const handleDateChange = (value) => {
        const newDate = new Date(value.toDateString());
        setDate(newDate);
    };

    const isRelatedToCurrentUser = (event) => {
        const user = props.appState.user;
        if (user.userType === "Organization") {
            return event.organization === user._id;
        } else if (user.userType === "Employee") {
            return event.workerID === user._id;
        } else {
            return event.clientID === user._id;
        }
    };

    const isAnEventForToday = (event) => {
        return new Date(new Date(event.time).toDateString()).getTime() ===
            date.getTime() && event.status !== "requested"
            ? true
            : false;
    };

    const dayHasEvent = (day) => {
        return props.appState.events.filter((event) => {
            const eventTime = new Date(new Date(event.time).toDateString());
            return (
                eventTime.getTime() === day.getTime() &&
                isRelatedToCurrentUser(event) && event.status !== "requested"
            );
        }).length > 0
            ? true
            : false;
    };

        const eventsMatterForToday = props.appState.events.filter(
            (event) => {
                return (
                    isAnEventForToday(event) &&
                    isRelatedToCurrentUser(event)
                );
            }
        );

        let counter = 0;
        const eventList = eventsMatterForToday.map((event) => (
            <CalendarListItem
                event={event}
                appState={props.appState}
                key={counter}
            >
                 {counter = counter + 1}
            </CalendarListItem>
        ));
    return (
        <div className={classes.flex}>
            <Box
                className={classes.box}
            >
                {dayHasEvent(date) ? (
                    <List className={classes.list}>
                        {eventList}
                    </List>
                ) : (
                    <div
                        className={classes.placeholder}
                    >
                        No event for this Date
                    </div>
                )}
            </Box>

            <Box
                className={classes.datePickerContainer}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div>
                        <StaticDatePicker
                            orientation="landscape"
                            value={date}
                            openTo="day"
                            className="datePicker"
                            onChange={handleDateChange}
                            className={classes.datePicker}
                            renderDay={(day, _value, DayComponentProps) => {
                                return dayHasEvent(day) ? (
                                    <Badge
                                        key={day.toString()}
                                        color="primary"
                                        variant="dot"
                                        overlap="circular"
                                    >
                                        <PickersDay
                                            {...DayComponentProps}
                                        />
                                    </Badge>
                                ) : (
                                    <PickersDay {...DayComponentProps} />
                                );
                            }}
                            renderInput={(params) => (
                                <TextField {...params} />
                            )}
                        />
                    </div>
                </LocalizationProvider>
            </Box>
        </div>
    );
}

export default CalendarView;
