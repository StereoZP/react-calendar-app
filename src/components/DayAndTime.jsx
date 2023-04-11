import React from 'react';
import classes from "./Calendar.module.css";
import {format} from "date-fns";

const DayAndTime = (props) => {
    const {day} = props
    return (
        <div className={classes.dateContainer}>
                <div className={classes.time}>{format(day, 'kk:mm:ss')}</div>
                <div className={classes.date}>{format(day, 'EEEE, d MMMM y')}</div>
        </div>
    );
};

export default DayAndTime;