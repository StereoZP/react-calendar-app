import React from 'react';
import {addWeeks, startOfWeek} from "date-fns";
import classes from "./EventBoardDay.module.css";
import BoardNameDaysDay from "./BoardNameDaysDay"
import RowFieldsAddEventDay from "./RowFieldsAddEventDay"
import DayEventBoardDay from "./DayEventBoardDay"

const EventBoardDay = () => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const week = addWeeks(startDate, 0)

    const renderedNameOfWeekOfDay = new Array(1).fill(undefined).map((_, index) => {
        return (<BoardNameDaysDay key={index}/>)
    })
    renderedNameOfWeekOfDay.unshift(<div key="empty-div"></div>);

    const renderedFieldsOfAddEvenToDay = new Array(24).fill(undefined).map((_, index) => {
        const time = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), index)
        return (<RowFieldsAddEventDay key={index} time={time} weekOfMonth={week}/>)
    })

    return (
        <div>
            <div className={classes.boardGridOfDay}>{renderedNameOfWeekOfDay}</div>
            <DayEventBoardDay/>
            <div>{renderedFieldsOfAddEvenToDay}</div>
        </div>
    );
};

export default EventBoardDay;