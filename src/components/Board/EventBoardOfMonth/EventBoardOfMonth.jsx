import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../../сontext";
import BoardNameDaysOfWeek from "../../BoardContaining/BoardNameDaysOfWeek";
import BoardWeek from "../../BoardContaining/BoardWeek";
import {addDays, addWeeks, startOfMonth, startOfWeek} from "date-fns";
import classes from "../Board.module.css";

const EventBoardOfMonth = () => {
    const {state} = useContext(ApplicationContext)
    const startDayOfWeek = startOfWeek(startOfMonth(state.month), {weekStartsOn: 1})

    const renderedNameOfWeek = new Array(7).fill(undefined).map((_, index) => {
        const nameOfWeek = addDays(startDayOfWeek, index)
        return (<BoardNameDaysOfWeek nameOfWeek={nameOfWeek} key={index}/>)
    })
    const renderedWeekOfMonth = new Array(6).fill(undefined).map((_, index) => {
        const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        const week = addWeeks(startDate, index)

        return (<BoardWeek weekOfMonth={week} key={index}/>)
    })

    return (
        <div>
            <div className={classes.boardGrid}>{renderedNameOfWeek}</div>
            <div>{renderedWeekOfMonth}</div>
        </div>
    );
};

export default EventBoardOfMonth;