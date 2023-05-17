import React, {useContext} from 'react';
import {format, isToday, isSameMonth, isSameDay, parseISO} from "date-fns";
import classNames from "classnames";
import classes from "../Calendar/Calendar.module.css";
import {ApplicationContext, DateContext} from "../../сontext";

const Day = (props) => {

    const {renderedDay} = props
    const day = format(renderedDay, 'd')
    const {state, dispatch} = useContext(ApplicationContext)
    const dateContext = useContext(DateContext)

    const dayStyles = classNames(classes.day,
        {
            [classes.today]: isToday(renderedDay),
            [classes.dayOfOtherMonth]: !isSameMonth(renderedDay, state.month),
            [classes.selected]: isSameDay(state.selected, renderedDay),
        })

    const selectedDay = () => {
        dispatch({type: 'setSelected', payload: renderedDay})
        dispatch({type: 'setStartDate', payload: renderedDay})
    }

    const eventPoint = []
    for (const item of state.events) {
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
        <div className={dayStyles} onClick={selectedDay}>
            <div>{day}</div>
            <div>{eventPoint}</div>
        </div>
    );
};


export default Day;