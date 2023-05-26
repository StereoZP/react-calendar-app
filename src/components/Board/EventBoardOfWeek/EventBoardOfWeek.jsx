import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../../сontext";
import {addDays, addWeeks, format, startOfMonth, startOfWeek} from "date-fns";
import BoardNameDaysOfWeek from "../../BoardContaining/BoardNameDaysOfWeek";
import classes from "./EventBoardOfWeek.module.css";
import RowFieldsOfAddEventOfWeek from "./RowFieldsOfAddEventOfWeek";

import DayOfWeekOfEventBoardOfWeek from "./DayOfWeekOfEventBoardOfWeek";

const EventBoardOfWeek = () => {
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
        const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        const timeOfEvent = format(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), index), 'HH:mm')
        return (<RowFieldsOfAddEventOfWeek key={index} timeOfEvent={timeOfEvent} weekOfMonth={week}/>)
    })
    const renderedDayOfWeek = new Array(1).fill(undefined).map((_, index) => {
        return (<DayOfWeekOfEventBoardOfWeek weekOfMonth={week} key={index}/>)
    })


    return (
        <div>
            <div className={classes.boardGridOfWeek}>{renderedNameOfWeek}</div>
            <div>{renderedDayOfWeek}</div>
            <div>{renderedFieldsOfAddEvent}</div>
        </div>
    );
};

export default EventBoardOfWeek;