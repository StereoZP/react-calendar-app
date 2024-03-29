import React from 'react';
import {format} from "date-fns";
import classes from "../EventBoardOfWeek/EventBoardOfWeek.module.css";

const FieldsOfAddEventOfDay = (props) => {
    const {time} = props

    const day = format(new Date(),'d')
    const timeOfEvent = format(time,'HH:mm')

    return (
        <div className={classes.fieldsContainer}>
            <div className={classes.eventButtonTop}>{timeOfEvent}</div>
            <div className={classes.eventButtonBottom}>{day}</div>
        </div>
    );
};

export default FieldsOfAddEventOfDay;