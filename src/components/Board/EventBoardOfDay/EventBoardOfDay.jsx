import React from 'react';
import {addWeeks, startOfWeek} from "date-fns";
import classes from "./EventBoardOfDay.module.css";
import BoardNameDaysOfDay from "./BoardNameDaysOfDay"
import RowFieldsOfAddEventOfDay from "./RowFieldsOfAddEventOfDay"
import DayOfEventBoardOfDay from "./DayOfEventBoardOfDay"

const EventBoardOfDay = () => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const week = addWeeks(startDate, 0)

    const renderedNameOfWeekOfDay = new Array(1).fill(undefined).map((_, index) => {
        return (<BoardNameDaysOfDay key={index}/>)
    })
    renderedNameOfWeekOfDay.unshift(<div key="empty-div"></div>);

    const renderedFieldsOfAddEvenToDay = new Array(24).fill(undefined).map((_, index) => {
        const time = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), index)
        return (<RowFieldsOfAddEventOfDay key={index} time={time} weekOfMonth={week}/>)
    })

    return (
        <div>
            <div className={classes.boardGridOfDay}>{renderedNameOfWeekOfDay}</div>
            <DayOfEventBoardOfDay/>
            <div>{renderedFieldsOfAddEvenToDay}</div>
        </div>
    );
};

export default EventBoardOfDay;