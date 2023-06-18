import React from 'react';
import {format, isBefore} from "date-fns";
import FieldsAddEventDay from "./FieldsAddEventDay";
import classes from "./EventBoardDay.module.css";
import cl from "../EventBoardWeek/EventBoardWeek.module.css"

const RowFieldsAddEventDay = (props) => {
    const {time} = props

    const testOfEvent = format(time,'HH:mm')
    const checkTime = isBefore(time,new Date())

    const row = new Array(1).fill(undefined).map((day, index ) => {
        return (
            <FieldsAddEventDay key={index} time={time} checkTime={checkTime}/>
        )
    })

    return (
        <div className={classes.boardGridOfDay}>
            <div className={cl.timeContainer}>{testOfEvent}</div>
            {row}
        </div>
    );
};

export default RowFieldsAddEventDay;