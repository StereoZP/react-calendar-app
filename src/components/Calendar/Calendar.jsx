import React from 'react';
import Month from "../MonthСontaining/Month";
import classes from "./Calendar.module.css";
import EventForm from "../Form/EventForm";
import CalendarController from "./CalendarController";
import DayAndTime from "./DayAndTime";
import MonthSelection from "./MonthSelection";
import {isSameDay, parseISO} from "date-fns";
import EventItem from "../Event/EventItem";


const Calendar = () => {
    return (
        <div className={classes.calendar}>
            <CalendarController>
                {
                    (state, dispatch) => {
                        const removeEvent = (id) => {
                            dispatch({type: 'removeEvent', payload: id})
                            dispatch({type: 'setConfirmDeleteModal', payload: false})
                        }
                        const updateEvent = (id, updateTitle, updateBody, selectedUsers) => {
                            dispatch({type: 'UPDATE_EVENT', payload: {id, updateTitle, updateBody, selectedUsers }})
                        }

                        if (state.error) {
                            return <div>Ошибка: {state.error.message}</div>;
                        }

                        if (!state.isLoaded) {
                            return <div>Загрузка...</div>;
                        }

                        const usersEvent = state.events
                            .filter(item => isSameDay(state.selected, parseISO(item.date)))
                            .map((item) => <EventItem key={item.id} event={item} eventTitle={item.title}
                                                      eventBody={item.body} removeEvent={removeEvent} updateEvent={updateEvent}/>
                            )

                        return <div className={classes.calendarWidth}>
                            <DayAndTime/>
                            <MonthSelection>
                                <Month/>
                            </MonthSelection>
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