import React from 'react';
import {addDays, addWeeks, startOfMonth, startOfWeek} from "date-fns";
import Week from "./Week";
import NameDaysOfWeek from "./NameDaysOfWeek";
import classes from "../Calendar/Calendar.module.css";
import {useContext} from "react";
import {ApplicationContext} from "../../сontext";

const Month = () => {
    const {state} = useContext(ApplicationContext)
    const startDayOfWeek = startOfWeek(startOfMonth(state.month), {weekStartsOn: 1})

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
            <div className={classes.calendarGrid}>{renderedNameOfWeek}</div>
            <div>{renderedWeekOfMonth}</div>
        </div>
    );
};

export default Month;