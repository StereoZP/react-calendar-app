import React from 'react';
import {format} from "date-fns";
import classes from "../Calendar/Calendar.module.css";

const NameDaysOfWeek = (props) => {

    const {nameOfWeek} = props
    const name = format(nameOfWeek, 'EEEEEE')

    return (
        <span className={classes.namesOfWeek}>
            {name}
        </span>
    );
};

export default NameDaysOfWeek;