import React from 'react';
import {format, isSameDay, isSameMonth, isToday} from "date-fns";
import {useContext} from "react";
import {ApplicationContext, } from "../../сontext";
import classes from "../Board/Board.module.css";

import classNames from "classnames";
import {SET_SELECTED, SET_START_DAY} from "../../store/actions";


const BoardDay = (props) => {
    const {renderedDay} = props
    const day = format(renderedDay, 'd')
    const {state, dispatch} = useContext(ApplicationContext)

    const dayStyles = classNames(classes.dayOfTheMonth,
        {
            [classes.dayOfTheMonthOfWeekBoard]: state.openBoard.find(item=> item.week===true),
            [classes.today]: isToday(renderedDay),
            [classes.dayOfOtherMonth]: !isSameMonth(renderedDay, state.month),
            [classes.selectedDay]: isSameDay(state.selected, renderedDay),
        })

    const selectedDay = () => {
        dispatch({type: SET_SELECTED, payload: renderedDay})
        dispatch({type: SET_START_DAY, payload: renderedDay})
    }

    return (
        <div className={dayStyles} onClick={selectedDay}>
            <div className={classes.textLeft}>{day}</div>
        </div>
    );
};

export default BoardDay;