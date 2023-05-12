import React from 'react';
import Month from "../MonthСontaining/Month";
import classes from "./Calendar.module.css";
import EventForm from "../Form/EventForm";
import CalendarController from "./CalendarController";
import DayAndTime from "./DayAndTime";
import MonthSelection from "./MonthSelection";
import {isSameDay, parseISO} from "date-fns";
import EventItem from "../Event/EventItem";
import ConfirmWindow from "../Event/ConfirmWindow";
import {useContext} from "react";
import {DateContext} from "../Context/dateContext";



const Calendar = () => {
    const dateContext = useContext(DateContext)
    const removeEvent = (id) => {
        dateContext.dispatch({type: 'removeEvent', payload: id})
        dateContext.dispatch({type: 'setConfirmDeleteModal', payload: false})
    }

    const closeDeleteModal = () => {
        dateContext.dispatch({type: 'setConfirmDeleteModal', payload: false})
    }
    return (
        <div className={classes.calendar}>
        <CalendarController>
            {
                (state) => {
                    if (state.error) {
                        return <div>Ошибка: {state.error.message}</div>;
                    }
                    if (!state.isLoaded) {
                        return <div>Загрузка...</div>;
                    }
                    const usersEvent = state.events
                        .filter(item => isSameDay(state.selected, parseISO(item.date)))
                        .map((item) => <EventItem key={item.id} event={item} eventTitle={item.title}
                                                  eventBody={item.body}/>
                        )
                    return <div className={classes.calendarWidth}>
                        <DayAndTime/>
                        <MonthSelection>
                            <Month/>
                        </MonthSelection >
                        <EventForm/>
                        <div>
                            {usersEvent}
                        </div>
                        {/*<ConfirmWindow visible={state.confirmUpdateModal}*/}
                        {/*               setVisible={() => dateContext.dispatch({type: "setConfirmUpdateModal"})}>*/}
                        {/*    <p>Are you sure to update event?</p>*/}
                        {/*    <div className={classes.doubleContainer}>*/}
                        {/*        <button className={classes.buttonStyles} onClick={()=>dateContext.confirmUpdate(state.events.id)}>Ok</button>*/}
                        {/*        <button className={classes.buttonStyles} onClick={dateContext.closeUpdateModal}>Cancel</button>*/}
                        {/*    </div>*/}
                        {/*</ConfirmWindow>*/}
                        <ConfirmWindow visible={state.confirmDeleteModal}
                                       setVisible={() => dateContext.dispatch({type: "setConfirmDeleteModal"})}>
                            <p>Are you sure to delete event?</p>
                            <div className={classes.doubleContainer}>
                                <button className={classes.buttonStyles} onClick={() => {removeEvent()}}>Ok</button>
                                <button className={classes.buttonStyles} onClick={closeDeleteModal}>Cancel</button>
                            </div>
                        </ConfirmWindow>
                    </div>
                }
            }
        </CalendarController>
        </div>
    )
}

export default Calendar;