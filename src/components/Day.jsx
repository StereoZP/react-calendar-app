import React from 'react';
import {format, isToday, isSameMonth, isSameDay} from "date-fns";
import classes from "./Calendar.module.css";

const Day = (props) => {

    const {renderedDay, selectedMonth, selected, setSelected} = props

    const day = format(renderedDay, 'd')


    const today = [(isToday(renderedDay)) ? classes.today : classes.day].join(' ');
    const dayOfThisMonth = [(!isSameMonth(renderedDay, selectedMonth)) ? classes.dayOfOtherMonth : classes.day].join(' ');
    const selectedDayStyle = [(isSameDay(selected, renderedDay)) ? classes.selected :classes.day]
    const dayStyles = [today, dayOfThisMonth, selectedDayStyle].join(' ')

    const selectedDay = () => {
            setSelected(renderedDay)
    }

    return (
            <span className={dayStyles} onClick={selectedDay}>
            {day}
        </span>


    );
};

export default Day;