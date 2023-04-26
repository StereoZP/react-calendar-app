import React, {useContext} from 'react';
import {format, isToday, isSameMonth, isSameDay, parseISO} from "date-fns";
import classes from "../Calendar/Calendar.module.css";
import {DateContext} from "../Context/dateContext";

const Day = (props) => {

    const {renderedDay} = props
    const day = format(renderedDay, 'd')
    const dateContext = useContext(DateContext)


    const today = [(isToday(renderedDay)) ? classes.today : classes.day].join(' ');
    const dayOfThisMonth = [(!isSameMonth(renderedDay, dateContext.state.month)) ? classes.dayOfOtherMonth : classes.day].join(' ');
    const selectedDayStyle = [(isSameDay(dateContext.state.selected, renderedDay)) ? classes.selected : classes.day]
    const dayStyles = [today, dayOfThisMonth, selectedDayStyle].join(' ')

    const selectedDay = () => {
        dateContext.dispatch({ type: 'setSelected', payload: renderedDay})
        dateContext.dispatch({ type: 'setStartDate', payload: renderedDay})
    }

    const eventPoint = []
    for (const item of dateContext.state.event) {
        const targetDate = item.date
        const targetCount = dateContext.dateCounts[targetDate]
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