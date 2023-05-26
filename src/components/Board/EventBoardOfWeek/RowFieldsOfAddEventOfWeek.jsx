import React from 'react';
import {addDays, startOfISOWeek} from "date-fns";
import classes from "./EventBoardOfWeek.module.css";
import FieldsOfAddEventOfWeek from "./FieldsOfAddEventOfWeek";




const RowFieldsOfAddEventOfWeek = (props) => {
    const {timeOfEvent, weekOfMonth} = props
    const startDayOfWeek = startOfISOWeek(weekOfMonth)

    const row = new Array(7).fill(undefined).map((day, index ) => {
        day = addDays(startDayOfWeek, index)
        return (
            <FieldsOfAddEventOfWeek renderedDay={day} key={index} timeOfEvent={timeOfEvent}/>
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