import React from 'react';
import BoardDay from "../../BoardContainer/BoardDay";
import classes from "./EventBoardDay.module.css";

const DayEventBoardDay = () => {

    const dayOfWeek = [];
    dayOfWeek.push(<div key="empty-div"></div>);

    const day = new Date();
    dayOfWeek.push(<BoardDay renderedDay={day} key={0} />);

    return (
        <div className={classes.boardGridOfDay}>
            {dayOfWeek}
        </div>
    );
};

export default DayEventBoardDay;