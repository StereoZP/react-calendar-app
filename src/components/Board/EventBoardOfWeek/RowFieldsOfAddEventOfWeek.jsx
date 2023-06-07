import React from 'react';
import {addDays, format, isBefore, startOfISOWeek} from "date-fns";
import classes from "./EventBoardOfWeek.module.css";
import FieldsOfAddEventOfWeek from "./FieldsOfAddEventOfWeek";

const RowFieldsOfAddEventOfWeek = (props) => {
    const {time, weekOfMonth} = props
    const startDayOfWeek = startOfISOWeek(weekOfMonth)
    const timeOfEvent = format(time,'HH:mm')
    const checkTime = isBefore(time,new Date())

    const row = new Array(7).fill(undefined).map((day, index ) => {
        day = addDays(startDayOfWeek, index)
        return (
            <FieldsOfAddEventOfWeek renderedDay={day} key={index} time={time} checkTime={checkTime}/>
        )
    })

    return (
        <div className={classes.boardGridOfWeek}>
            <div className={classes.timeContainer}>{timeOfEvent}</div>
            {row}
        </div>
    );
};

export default RowFieldsOfAddEventOfWeek;