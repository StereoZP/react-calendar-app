import React from 'react';
import {format} from "date-fns";
import classes from "../Board/Board.module.css";
import {useContext} from "react";
import {ApplicationContext} from "../../сontext";
import {CALENDAR_MODE} from "../../constant/constant";
import classNames from "classnames";

const BoardNameDaysOfWeek = (props) => {
    const {nameOfWeek} = props
    const {state} = useContext(ApplicationContext)
    const name = format(nameOfWeek, 'EEEE')
    const nameOfWeekYear = format(nameOfWeek, 'EEEEEE')

    const stylesDaysOfWeek = classNames(classes.namesDaysOfWeek,
        {
            [classes.namesDaysOfYear]:state.calendarMode===CALENDAR_MODE.YEAR,
        })

    return (
        <div className={stylesDaysOfWeek}>
            {state.calendarMode===CALENDAR_MODE.YEAR
                ? nameOfWeekYear
                : name}
        </div>
    );
};

export default BoardNameDaysOfWeek;