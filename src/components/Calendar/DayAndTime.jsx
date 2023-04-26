import React, {useContext} from 'react';
import classes from "./Calendar.module.css";
import {format} from "date-fns";
import {DateContext} from "../Context/dateContext";

const DayAndTime = () => {

    const context = useContext(DateContext)

    return (
        <div className={classes.dateContainer}>
                <div className={classes.time}>{format(context.state.day, 'kk:mm:ss')}</div>
                <div className={classes.date}>{format(context.state.day, 'EEEE, d MMMM y')}</div>
        </div>
    );
};

export default DayAndTime;