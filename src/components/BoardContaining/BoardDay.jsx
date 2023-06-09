import React from 'react';
import {format, isSameDay, isSameMonth, isToday, parseISO} from "date-fns";
import {useContext, useMemo} from "react";
import {ApplicationContext,} from "../../сontext";
import classes from "../Board/Board.module.css";

import classNames from "classnames";
import {OPEN_MODAL, SET_SELECTED, SET_START_DAY} from "../../store/actions";


const BoardDay = (props) => {
    const {renderedDay} = props
    const day = format(renderedDay, 'd')
    const {state, dispatch} = useContext(ApplicationContext)

    const eventTitle = useMemo(() => {
        if (!state.openBoard.find(item => item.month)) {
            return [];
        }
        return state.events
            .filter(event => isSameDay(parseISO(event.date), renderedDay))
            .map((event, index) => <div key={index}>{event.title}</div>);
    }, [state.events, renderedDay, state.openBoard]);

    const dayStyles = classNames(classes.dayOfTheMonth,
        {
            [classes.dayOfTheMonthOfWeekBoard]: state.openBoard.find(item => item.week === true || item.day === true),
            [classes.today]: isToday(renderedDay),
            [classes.dayOfOtherMonth]: !isSameMonth(renderedDay, state.month),
            [classes.selectedDay]: isSameDay(state.selected, renderedDay),
        })

    const selectedDay = () => {
        dispatch({type: SET_SELECTED, payload: renderedDay})
        dispatch({type: SET_START_DAY, payload: renderedDay})
        dispatch({type: OPEN_MODAL, payload:renderedDay})
    }

    return (
        <div className={dayStyles} onClick={selectedDay}>
            <div className={classes.textLeft}>{day}</div>
            <div>{eventTitle}</div>
        </div>
    );
};

export default BoardDay;