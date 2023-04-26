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
                    const {usersEvent, state} = props
                    if (state.error) {
                        return <div>Ошибка: {state.error.message}</div>;
                    }
                    if (!state.isLoaded) {
                        return <div>Загрузка...</div>;
                    }
                    return <div className={classes.calendarWidth}>
                        <DayAndTime/>
                        <MonthSelection>
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