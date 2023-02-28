import React from 'react';
import classes from "./Calendar.module.css";
import {format} from "date-fns";
import {MyContext} from "../context";
import {useContext} from "react";

const EventList = () => {

    const context = useContext(MyContext)

    return (
        <div className={classes.doubleContainer}>
            <div className={classes.selectedDay}>{format(context.selected,'EEEE')} {format(context.selected,'d')}</div>
            <button>+</button>
        </div>
    );
};

export default EventList;