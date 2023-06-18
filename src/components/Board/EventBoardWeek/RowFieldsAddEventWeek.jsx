import React from 'react';
import {addDays, format, isBefore, startOfISOWeek} from "date-fns";
import classes from "./EventBoardWeek.module.css";
import FieldsAddEventWeek from "./FieldsAddEventWeek";

const RowFieldsAddEventWeek = (props) => {
    const {time, weekOfMonth} = props
    const startDayOfWeek = startOfISOWeek(weekOfMonth)
    const timeOfEvent = format(time,'HH:mm')
    const checkTime = isBefore(time,new Date())

    const row = new Array(7).fill(undefined).map((day, index ) => {
        day = addDays(startDayOfWeek, index)
        return (
            <FieldsAddEventWeek renderedDay={day} key={index} time={time} checkTime={checkTime}/>
        )
    })

    return (
        <div className={classes.boardGridOfWeek}>
            <div className={classes.timeContainer}>{timeOfEvent}</div>
            {row}
        </div>
    );
};

export default RowFieldsAddEventWeek;