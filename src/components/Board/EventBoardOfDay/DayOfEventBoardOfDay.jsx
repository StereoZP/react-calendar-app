import React from 'react';
import BoardDay from "../../BoardContaining/BoardDay";
import classes from "./EventBoardOfDay.module.css";

const DayOfEventBoardOfDay = () => {

    const dayOfWeek = new Array(1).fill(undefined).map((_, index ) => {
        const day = new Date();
        return (
            <BoardDay renderedDay={day} key={index}/>
        )
    })
    dayOfWeek.unshift(<div key="empty-div"></div>);

    return (
        <div className={classes.boardGridOfDay}>
            {dayOfWeek}
        </div>
    );
};

export default DayOfEventBoardOfDay;