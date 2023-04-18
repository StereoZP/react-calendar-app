import React from 'react';
import {addDays, addWeeks, startOfMonth, startOfWeek} from "date-fns";
import Week from "./Week";
import NameDaysOfWeek from "./NameDaysOfWeek";
import classes from "../Calendar/Calendar.module.css";
import {DateContext} from "../Context/dateContext";
import {useContext} from "react";

const Month = () => {
    const dateContext = useContext(DateContext)
    const startDayOfWeek = startOfWeek(startOfMonth(dateContext.month), { weekStartsOn: 1 })

    const renderedNameOfWeek = new Array(7).fill(undefined).map((_, index) => {
        const nameOfWeek = addDays(startDayOfWeek, index)
        return (<NameDaysOfWeek nameOfWeek={nameOfWeek} key={index}/>)
    })
    const renderedWeekOfMonth = new Array(6).fill(undefined).map((_, index) => {
        const week = addWeeks(startDayOfWeek, index)
        return (<Week weekOfMonth={week} key={index}/>)
    })

    return (
        <div>
            <div className={classes.namesOfWeekContainer}>{renderedNameOfWeek}</div>
            <div>{renderedWeekOfMonth}</div>
        </div>
    );
};

export default Month;