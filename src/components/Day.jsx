import React, {useContext} from 'react';
import {format, isToday, isSameMonth, isSameDay} from "date-fns";
import classes from "./Calendar.module.css";
import {MyContext} from "../context";

const Day = (props) => {

    const {renderedDay} = props
    const day = format(renderedDay, 'd')
    const context = useContext(MyContext)

    const today = [(isToday(renderedDay)) ? classes.today : classes.day].join(' ');
    const dayOfThisMonth = [(!isSameMonth(renderedDay, context.month)) ? classes.dayOfOtherMonth : classes.day].join(' ');
    const selectedDayStyle = [(isSameDay(context.selected, renderedDay)) ? classes.selected :classes.day]
    const dayStyles = [today, dayOfThisMonth, selectedDayStyle].join(' ')

    const selectedDay = () => {
            context.setSelected(renderedDay)
    }

    return (
            <span className={dayStyles} onClick={selectedDay}>
            {day}
        </span>
    );
};

export default Day;