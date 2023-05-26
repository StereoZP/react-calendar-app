import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../../сontext";
import {OPEN_MODAL_BOARD_WEEK, SET_SELECTED, SET_START_DAY} from "../../../store/actions";
import {format, isSameDay, isSameMonth, isToday} from "date-fns";
import classes from "./EventBoardOfWeek.module.css";
import cl from "../Board.module.css"
import classNames from "classnames";


const FieldsOfAddEventOfWeek = (props) => {
    const {renderedDay,timeOfEvent} = props

    const context = useContext(ApplicationContext)
    const day = format(renderedDay,'d')

    const selectedDay = () => {
        context.dispatch({type: SET_SELECTED, payload: renderedDay})
        context.dispatch({type: SET_START_DAY, payload: renderedDay})
    }

    const dayStyles = classNames(classes.fieldsContainer,
        {
            [cl.today]: isToday(renderedDay),
            [cl.dayOfOtherMonth]: !isSameMonth(renderedDay, context.state.month),
            [cl.selectedDay]: isSameDay(context.state.selected, renderedDay),
        })

    return (
        <div className={dayStyles} onClick={selectedDay}>
            <div className={classes.eventButtonTop} onClick={()=>context.dispatch({type:OPEN_MODAL_BOARD_WEEK})}>{day}</div>
            <div className={classes.eventButtonBottom} onClick={()=>context.dispatch({type:OPEN_MODAL_BOARD_WEEK})}>{day}</div>
        </div>
    );
};

export default FieldsOfAddEventOfWeek;