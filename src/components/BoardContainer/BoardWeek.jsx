import React from 'react';
import {addDays,startOfISOWeek} from "date-fns";
import BoardDay from "./BoardDay";
import classes from "../Board/Board.module.css";

const BoardWeek = (props) => {
    const {weekOfMonth} = props

    const startDayOfWeek = startOfISOWeek(weekOfMonth)

    const week = new Array(7).fill(undefined).map((day, index ) => {
        day = addDays(startDayOfWeek, index)
        return (
            <BoardDay renderedDay={day} key={index}/>
        )
    })

    return (
        <div className={classes.boardGrid}>
            {week}
        </div>
    );
};

export default BoardWeek;