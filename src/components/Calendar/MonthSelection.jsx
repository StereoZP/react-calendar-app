import React from 'react';
import classes from "./Calendar.module.css";
import {format} from "date-fns";

const MonthSelection = (props) => {
    const {month, prev, next} = props
    return (
        <div className={classes.dateAndSelectedMonthContainer}>
            <div className={classes.doubleContainer}>
                <div className={classes.selectedMonth}>{format(month, 'LLLL y')}</div>
                <div>
                    <button style={{marginRight: 10}} onClick={prev}>&#5169;</button>
                    <button onClick={next}>&#5167;</button>
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default MonthSelection;