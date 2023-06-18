import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../../сontext";
import {addDays, addWeeks, startOfMonth, startOfWeek} from "date-fns";
import BoardNameDaysOfWeek from "../../BoardContainer/BoardNameDaysOfWeek";
import classes from "./EventBoardWeek.module.css";
import RowFieldsAddEventWeek from "./RowFieldsAddEventWeek";

import DayWeekEventBoardWeek from "./DayWeekEventBoardWeek";

const EventBoardWeek = () => {
    const {state} = useContext(ApplicationContext)
    const startDay = startOfWeek(startOfMonth(state.month), {weekStartsOn: 1})

    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const week = addWeeks(startDate, 0)

    const renderedNameOfWeek = new Array(7).fill(undefined).map((_, index) => {
        const nameOfWeek = addDays(startDay, index)
        return (<BoardNameDaysOfWeek nameOfWeek={nameOfWeek} key={index}/>)
    })
    renderedNameOfWeek.unshift(<div key="empty-div"></div>);

    const renderedFieldsOfAddEvent = new Array(24).fill(undefined).map((_, index) => {
        const time = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), index)
        return (<RowFieldsAddEventWeek key={index} time={time} weekOfMonth={week}/>)
    })
    const renderedDayOfWeek = new Array(1).fill(undefined).map((_, index) => {
        return (<DayWeekEventBoardWeek weekOfMonth={week} key={index}/>)
    })


    return (
        <div>
            <div className={classes.boardGridOfWeek}>{renderedNameOfWeek}</div>
            <div>{renderedDayOfWeek}</div>
            <div>{renderedFieldsOfAddEvent}</div>
        </div>
    );
};

export default EventBoardWeek;