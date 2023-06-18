import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../сontext";
import {format} from "date-fns";
import EventBoardMonth from "./EventBoardMonth/EventBoardMonth";
import {NEXT_MONTH, PREV_MONTH, SET_CALENDAR_MODE} from "../../store/actions";
import cl from "./Board.module.css"
import classes from "../Calendar/Calendar.module.css"
import EventBoardWeek from "./EventBoardWeek/EventBoardWeek";
import EventBoardDay from "./EventBoardDay/EventBoardDay";
import EventBoardYear from "./EventBoardYear/EventBoardYear";
import {CALENDAR_MODE} from "../../constant/constant";



const Board = () => {
    const context = useContext(ApplicationContext)

    function getCalendarMode(mode) {
        const modes = {
            'DAY': <EventBoardDay/>,
            'WEEK': <EventBoardWeek/>,
            'MONTH': <EventBoardMonth/>,
            'YEAR': <EventBoardYear/>,
        };

        return modes[mode] ?? <EventBoardMonth/>;
    }

    return (
        <div className={cl.board}>
            <div className={classes.doubleContainer}>
                <div className={cl.monthSelection}>
                    <div>
                        <button className={classes.buttonStyles} onClick={()=>context.dispatch({ type: PREV_MONTH })}>&#5169;</button>
                        <button className={classes.buttonStyles} style={{paddingRight: "10px"}} onClick={()=>context.dispatch({type: NEXT_MONTH})}>&#5167;</button>
                    </div>
                    <div className={cl.nameOfMonth}>{format(context.state.month, 'LLLL y')}</div>
                </div>
                <div>
                    <button className={classes.buttonStyles} style={{paddingLeft:"10px"}} onClick={()=>context.dispatch({ type: SET_CALENDAR_MODE, payload:CALENDAR_MODE.DAY})}>Day</button>
                    <button className={classes.buttonStyles} style={{paddingLeft:"10px"}} onClick={()=>context.dispatch({ type: SET_CALENDAR_MODE, payload:CALENDAR_MODE.WEEK})}>Week</button>
                    <button className={classes.buttonStyles} style={{paddingLeft:"10px"}} onClick={()=>context.dispatch({ type: SET_CALENDAR_MODE, payload:CALENDAR_MODE.MONTH})}>Month</button>
                    <button className={classes.buttonStyles} style={{paddingLeft:"10px"}} onClick={()=>context.dispatch({ type: SET_CALENDAR_MODE, payload:CALENDAR_MODE.YEAR})}>Year</button>
                </div>
            </div>
            {getCalendarMode(context.state.calendarMode)}
        </div>
    );
};

export default Board;