import React from 'react';
import {addDays,startOfISOWeek} from "date-fns";
import BoardDay from "../../BoardContaining/BoardDay";
import classes from "./EventBoardOfWeek.module.css";

const DayOfWeekOfEventBoardOfWeek = (props) => {
    const {weekOfMonth} = props

    const startDayOfWeek = startOfISOWeek(weekOfMonth)
    const dayOfWeek = new Array(7).fill(undefined).map((day, index ) => {
        day = addDays(startDayOfWeek, index)
        return (
            <BoardDay renderedDay={day} key={index}/>
        )
    })
    dayOfWeek.unshift(<div key="empty-div"></div>);

    return (
        <div className={classes.boardGridOfWeek}>
            {dayOfWeek}
        </div>
    );
};

export default DayOfWeekOfEventBoardOfWeek;