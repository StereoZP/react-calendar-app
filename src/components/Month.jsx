import React from 'react';
import {addDays, addWeeks, startOfMonth, startOfWeek} from "date-fns";
import Week from "./Week";
import NameDaysOfWeek from "./NameDaysOfWeek";
import classes from "./Calendar.module.css";

const Month = (props) => {

    const {selectedMonth} = props

    const startDayOfWeek = startOfWeek(startOfMonth(selectedMonth), { weekStartsOn: 1 })

    const renderedNameOfWeek = new Array(7).fill(undefined).map((nameOfWeek, index) => {
        nameOfWeek = addDays(startDayOfWeek, index)
        return (<NameDaysOfWeek nameOfWeek={nameOfWeek} key={index}/>)
    })
    const renderedWeekOfMonth = new Array(6).fill(undefined).map((week, index) => {
        week = addWeeks(startDayOfWeek, index)
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