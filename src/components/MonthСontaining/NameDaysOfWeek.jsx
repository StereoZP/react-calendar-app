import React from 'react';
import {format} from "date-fns";
import classes from "../Calendar/Calendar.module.css";

const NameDaysOfWeek = (props) => {

    const {nameOfWeek} = props
    const name = format(nameOfWeek, 'EEEEEE')

    return (
        <div className={classes.namesOfWeek}>
            {name}
        </div>

    );
};

export default NameDaysOfWeek;