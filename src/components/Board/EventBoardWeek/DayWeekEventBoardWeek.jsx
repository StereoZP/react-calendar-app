import React from 'react';
import {addDays,startOfISOWeek} from "date-fns";
import BoardDay from "../../BoardContainer/BoardDay";
import classes from "./EventBoardWeek.module.css";

const DayWeekEventBoardWeek = (props) => {
    const {weekOfMonth} = props

    const startDayOfWeek = startOfISOWeek(weekOfMonth)
    const dayOfWeek = new Array(7).fill(undefined).map((item, index ) => {
        item = addDays(startDayOfWeek, index)
        return (
            <BoardDay renderedDay={item} key={index}/>
        )
    })
    dayOfWeek.unshift(<div key="empty-div"></div>);

    return (
        <div className={classes.boardGridOfWeek}>
            {dayOfWeek}
        </div>
    );
};

export default DayWeekEventBoardWeek;