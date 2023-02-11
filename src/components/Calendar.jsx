import React, {useState} from 'react';
import classes from "./Calendar.module.css"
import * as calendarFn from './CalendarFunctions';

const Calendar = (props) => {

    const {defaultProps:{date, years, monthNames, weekDayNames, onChange}} = props

    const [calendar, setCalendar] = useState({
        date: date,
        currentDate: new Date(),
        selectedDate: null,
    })

    return (
        <div className={classes.calendar}>
            <header>
                <button>{"<"}</button>
                <select>
                    {monthNames.map((name, index)=>
                    <option key={name} value={index}>{name}</option>
                    )}
                </select>
                <select>
                    {years.map((year)=>
                        <option key={year} value={year}>{year}</option>
                    )}
                </select>
                <button>{">"}</button>
            </header>

            <table>
                <thead>
                <tr>
                    {weekDayNames.map((day)=>
                        <th key={day}>{day}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                    {calendar.date.map((week,index)=>
                    <tr key={index}>
                        {week.map((date, index)=>
                        date ? <td key={index} className={classes.day}>{date}</td>
                        :
                        <td key={index}/>
                        )}
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;