import React from 'react';
import {addDays, addWeeks, format, startOfMonth, startOfWeek} from "date-fns";
import {useContext} from "react";
import {ApplicationContext} from "../../../сontext";
import BoardNameDaysOfWeek from "../../BoardContainer/BoardNameDaysOfWeek";
import BoardWeek from "../../BoardContainer/BoardWeek";
import classes from "../Board.module.css";

const MonthsYear = (month) => {
    const {state} = useContext(ApplicationContext)
    const nameOfMonth = format(month.month, 'MMMM')
    const firstWeekOfMonth = startOfWeek(month.month,{weekStartsOn: 1});
    const renderedNameOfWeek = new Array(7).fill(undefined).map((_, index) => {
        const nameOfWeek = addDays(startOfWeek(startOfMonth(state.month), {weekStartsOn: 1}), index)
        return (<BoardNameDaysOfWeek nameOfWeek={nameOfWeek} key={index}/>)
    })
    const renderedWeekOfMonth = new Array(6).fill(undefined).map((_, index) => {
        const startDate = startOfWeek(firstWeekOfMonth, { weekStartsOn: 1 });
        const week = addWeeks(startDate, index)
        return (<BoardWeek weekOfMonth={week} key={index}/>)
    })
    return (
        <div style={{padding:"30px"}}>
            <div style={{color:"white"}}>{nameOfMonth}</div>
            <div className={classes.boardGrid}>{renderedNameOfWeek}</div>
            <div>{renderedWeekOfMonth}</div>
        </div>
    );
};

export default MonthsYear;