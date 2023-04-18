import React from 'react';
import Day from "./Day";
import {addDays, startOfISOWeek} from "date-fns";

const Week = (props) => {

    const {weekOfMonth} = props

    const startDayOfWeek = startOfISOWeek(weekOfMonth)

    const week = new Array(7).fill(undefined).map((day, index ) => {
        day = addDays(startDayOfWeek, index)
        return (
            <Day renderedDay={day} key={index}/>
        )
    })

    return (
        <div>
            {week}
        </div>
    );
};

export default Week;