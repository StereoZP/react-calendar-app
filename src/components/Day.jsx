import React, {useContext} from 'react';
import {format, isToday, isSameMonth, isSameDay, parseISO} from "date-fns";
import classes from "./Calendar.module.css";
import {DateContext} from "../dateContext";
import {TimeContext} from "../timeContext";

const Day = (props) => {

    const {renderedDay} = props
    const day = format(renderedDay, 'd')
    const dateContext = useContext(DateContext)
    const timeContext = useContext(TimeContext)
    const {startDateForDatePiker: [, setStartDate]} = dateContext

    const today = [(isToday(renderedDay)) ? classes.today : classes.day].join(' ');
    const dayOfThisMonth = [(!isSameMonth(renderedDay, dateContext.month)) ? classes.dayOfOtherMonth : classes.day].join(' ');
    const selectedDayStyle = [(isSameDay(dateContext.selected, renderedDay)) ? classes.selected : classes.day]
    const dayStyles = [today, dayOfThisMonth, selectedDayStyle].join(' ')

    const selectedDay = () => {
        dateContext.setSelected(renderedDay)
        setStartDate(renderedDay)
        timeContext.setStartTime(renderedDay)
        timeContext.setEndTime(renderedDay)
    }


    const eventPoint = []
    for (const item of dateContext.event) {
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