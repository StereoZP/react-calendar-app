import React from 'react';
import {useContext, useMemo} from "react";
import {ApplicationContext} from "../../../сontext";
import {OPEN_MODAL_BOARD_WEEK, SET_SELECTED, SET_START_DAY} from "../../../store/actions";
import {format, isSameDay, parseISO} from "date-fns";
import classes from "./EventBoardWeek.module.css";



const FieldsAddEventWeek = (props) => {
    const {renderedDay, time} = props

    const {state, dispatch} = useContext(ApplicationContext)
    const timeOfEvent = format(time,'HH:mm')


    const selectedDay = () => {
        dispatch({type: SET_SELECTED, payload: renderedDay})
        dispatch({type: SET_START_DAY, payload: renderedDay})
        dispatch({type: OPEN_MODAL_BOARD_WEEK, payload:renderedDay})
    }

    const eventBody = useMemo(() => {
        return state.events.map((event, index) => {
            const isSameDate = isSameDay(parseISO(event.date), renderedDay);
            if (isSameDate) {
                return <div key={index}>{timeOfEvent === event.startTime ? event.body : null}</div>;
            }
            return null;
        });
    }, [state.events, renderedDay, timeOfEvent]);


    return (
        <div className={classes.fieldsContainer} onClick={selectedDay}>
            <div className={classes.eventButtonTop}>{eventBody}</div>
            <div className={classes.eventButtonBottom}></div>
        </div>
    );
};

export default FieldsAddEventWeek;