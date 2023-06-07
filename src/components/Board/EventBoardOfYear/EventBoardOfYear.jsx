import React from 'react';
import {format, startOfYear, addMonths, addDays, startOfWeek, startOfMonth} from "date-fns";
import classes from "./EventBoardOfYear.module.css";
import NameDaysOfWeek from "../../MonthСontaining/NameDaysOfWeek";
import {useContext} from "react";
import {ApplicationContext} from "../../../сontext";

const EventBoardOfYear = () => {
    const {state} = useContext(ApplicationContext)
    const startDate = startOfYear(new Date());
    const getCalendarYear = () => {
        const calendarYear = [];
        for (let i = 0; i < 12; i++) {
            const monthStartDate = addMonths(startDate, i);
            const monthName = format(monthStartDate, 'MMMM');
            const monthDays = [];
            while (format(monthStartDate, 'MMMM') === monthName) {
                monthDays.push(format(monthStartDate, 'd'));
                monthStartDate.setDate(monthStartDate.getDate() + 1);
            }
            calendarYear.push({
                month: monthName,
                days: monthDays,
            });
        }
        return calendarYear;
    };
    const calendarYear = getCalendarYear();

    const renderedNameOfWeek = new Array(7).fill(undefined).map((_, index) => {
        const nameOfWeek = addDays(startOfWeek(startOfMonth(state.month), {weekStartsOn: 1}), index)
        return (<NameDaysOfWeek nameOfWeek={nameOfWeek} key={index}/>)
    })

    return (
        <div>
            <div className={classes.boardGridOfParent}>
                {calendarYear.map((monthData, index) => (
                    <div key={index} style={{padding:"25px"}}>
                        <div className={classes.month}>
                            <h2>{monthData.month}</h2>
                            <div className={classes.boardGridOfYear}>
                                {renderedNameOfWeek}
                            </div>
                            <div className={classes.boardGridOfYear}>
                                {monthData.days.map((day, dayIndex) => (
                                    <div key={dayIndex} style={{padding:"5px"}}>{day}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventBoardOfYear;