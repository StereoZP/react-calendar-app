import React from 'react';
import {format, isBefore} from "date-fns";
import FieldsOfAddEventOfDay from "./FieldsOfAddEventOfDay";
import classes from "./EventBoardOfDay.module.css";
import cl from  "../EventBoardOfWeek/EventBoardOfWeek.module.css"

const RowFieldsOfAddEventOfDay = (props) => {
    const {time} = props

    const testOfEvent = format(time,'HH:mm')
    const checkTime = isBefore(time,new Date())

    const row = new Array(1).fill(undefined).map((day, index ) => {
        return (
            <FieldsOfAddEventOfDay key={index} time={time} checkTime={checkTime}/>
        )
    })

    return (
        <div className={classes.boardGridOfDay}>
            <div className={cl.timeContainer}>{testOfEvent}</div>
            {row}
        </div>
    );
};

export default RowFieldsOfAddEventOfDay;