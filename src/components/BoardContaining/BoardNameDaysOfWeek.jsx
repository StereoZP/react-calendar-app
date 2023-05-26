import React from 'react';
import {format} from "date-fns";
import classes from "../Board/Board.module.css";

const BoardNameDaysOfWeek = (props) => {
    const {nameOfWeek} = props
    const name = format(nameOfWeek, 'EEEE')

    return (
        <div className={classes.namesDaysOfWeek}>
            {name}
        </div>
    );
};

export default BoardNameDaysOfWeek;