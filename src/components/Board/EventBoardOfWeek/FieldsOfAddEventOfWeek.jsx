import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../../сontext";
import {OPEN_MODAL_BOARD_WEEK, SET_SELECTED, SET_START_DAY} from "../../../store/actions";
import {format} from "date-fns";
import classes from "./EventBoardOfWeek.module.css";



const FieldsOfAddEventOfWeek = (props) => {
    const {renderedDay, time} = props

    const context = useContext(ApplicationContext)
    const day = format(renderedDay,'d')
    const timeOfEvent = format(time,'HH:mm')


    const selectedDay = () => {
        context.dispatch({type: SET_SELECTED, payload: renderedDay})
        context.dispatch({type: SET_START_DAY, payload: renderedDay})
        context.dispatch({type: OPEN_MODAL_BOARD_WEEK, payload:renderedDay})
    }

    return (
        <div className={classes.fieldsContainer} onClick={selectedDay}>
            <div className={classes.eventButtonTop}>{timeOfEvent}</div>
            <div className={classes.eventButtonBottom}>{day}</div>
        </div>
    );
};

export default FieldsOfAddEventOfWeek;