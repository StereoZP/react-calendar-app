import React, {useContext} from 'react';
import {format, isToday, isSameMonth, isSameDay, parseISO} from "date-fns";
import classes from "./Calendar.module.css";
import {MyContext} from "../context";

const Day = (props) => {

    const {renderedDay} = props
    const day = format(renderedDay, 'd')
    const context = useContext(MyContext)
    const {startDateForDatePiker: [, setStartDate]} = context

    const today = [(isToday(renderedDay)) ? classes.today : classes.day].join(' ');
    const dayOfThisMonth = [(!isSameMonth(renderedDay, context.month)) ? classes.dayOfOtherMonth : classes.day].join(' ');
    const selectedDayStyle = [(isSameDay(context.selected, renderedDay)) ? classes.selected : classes.day]
    const dayStyles = [today, dayOfThisMonth, selectedDayStyle].join(' ')

    const selectedDay = () => {
        context.setSelected(renderedDay)
        setStartDate(renderedDay)
    }

    const dateCounts = context.event.reduce((acc, obj) => {
        const date = obj.date;
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date]++;

        return acc;
    }, {});

    const eventPoint = []
    for (const item of context.event) {
        const targetDate = item.date
        const targetCount = dateCounts[targetDate]
        const isSameDate = isSameDay(parseISO(targetDate), renderedDay)
        if (targetCount && isSameDate) {
            if (targetCount === 1 || targetCount === 2 || targetCount === 3) {
                eventPoint.push(<div key={item.id} className={classes.eventLine}></div>)
            }
            if (targetCount > 3) {
                eventPoint.push(<div key={item.id} className={classes.dayEvent}>*</div>)
                break;
            }
        }
    }

    return (
        <span className={dayStyles} onClick={selectedDay}>
                <div>{day}</div>
                <div>{eventPoint}</div>
        </span>
    );
};


export default Day;