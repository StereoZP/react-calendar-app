import React from 'react';
import Month from "../MonthСontaining/Month";
import classes from "./Calendar.module.css";
import EventForm from "../Form/EventForm";
import CalendarController from "./CalendarController";
import DayAndTime from "./DayAndTime";
import MonthSelection from "./MonthSelection";

const Calendar = () => {

    return (
        <div className={classes.calendar}>
        <CalendarController>
            {
                (props) => {
                    const {day, month, prev, next, usersEvent, error, isLoaded,users} = props
                    if (error) {
                        return <div>Ошибка: {error.message}</div>;
                    }
                    if (!isLoaded) {
                        return <div>Загрузка...</div>;
                    }
                    return <div className={classes.calendarWidth}>
                        <DayAndTime day={day}/>
                        <MonthSelection month={month} prev={prev} next={next}>
                            <Month/>
                        </MonthSelection >
                        <EventForm/>
                        <div>
                            {usersEvent}
                        </div>
                    </div>
                }
            }
        </CalendarController>
        </div>
    )
}

export default Calendar;