import React, {useContext} from 'react';
import classes from "./Calendar.module.css";
import {format} from "date-fns";
import {ApplicationContext} from "../../сontext";

const DayAndTime = () => {

    const context = useContext(ApplicationContext)

    return (
        <div className={classes.dateContainer}>
                <div className={classes.time}>{format(context.state.day, 'kk:mm:ss')}</div>
                <div className={classes.date}>{format(context.state.day, 'EEEE, d MMMM y')}</div>
        </div>
    );
};

export default DayAndTime;