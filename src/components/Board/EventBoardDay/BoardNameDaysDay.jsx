import React from 'react';
import {format} from "date-fns";
import classes from "../Board.module.css";


const BoardNameDaysDay = () => {
    const name = format(new Date(), 'EEEE')

    return (
        <div className={classes.namesDaysOfWeek}>
            {name}
        </div>
    );
};

export default BoardNameDaysDay;