import React from 'react';
import {startOfYear, addMonths} from "date-fns";
import MonthsYear from "./MonthsYear";
import classes from "./EventBoardYear.module.css";

const EventBoardYear = () => {

    const startYear = startOfYear(new Date());
    const getCalendarYear = new Array(12).fill(undefined).map((_, index) => {
        const month = addMonths(startYear, index);
        return <MonthsYear key={index} month={month}/>
    })

    return (
        <div className={classes.boardGridOfYear} >
            {getCalendarYear}
        </div>
    );
};

export default EventBoardYear;