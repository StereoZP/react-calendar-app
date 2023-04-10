import React, {useState, useEffect, useMemo} from 'react';
import Month from "./Month";
import {add, format, isSameDay, parseISO, setHours, setMinutes} from "date-fns";
import classes from "./Calendar.module.css";
import {DateContext} from "../dateContext";
import {TimeContext} from "../timeContext";
import EventForm from "./EventForm";
import EventList from "./EventList";
import CalendarContextMounter from "./CalendarContextMounter";

const Calendar = () => {
    const [day, setDay] = useState(new Date())
    const [month, setMonth] = useState(new Date())
    const [selected, setSelected] = useState(new Date())
    const startDateForDatePiker = useState(selected)
    const [startTime, setStartTime] = useState(setHours(setMinutes(selected, 30), 17))
    const [endTime, setEndTime] = useState(setHours(setMinutes(selected, 30), 17))

    setInterval(() => {
        setDay(new Date())
    }, 1000)

    const prev = () => {
        setMonth(add(month, {months: -1}))
    }

    const next = () => {
        setMonth(add(month, {months: 1}))
    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [event, setEvent] = useState([]);

    const createEvent = (newPost) => {
        setEvent([...event, newPost])
    }

    const usersEvent = event.map((item, index) => {
        if (isSameDay(selected, parseISO(item.date))) {
            return <EventList key={index} eventTitle={item.title} addDate={item.addDate} startTime={item.startTime}
                              endTime={item.endTime}/>
        }
    })

    const dateCounts = useMemo(() => {
        return event.reduce((acc, obj) => {
            const date = obj.date;
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date]++;

            return acc;
        }, {})
    }, [event])

    useEffect(() => {
        try {
            async function getJson() {
                const response = await fetch("/data.json")
                if (response.status === 200) {
                    setIsLoaded(true)
                    const json = await response.json()
                    return setEvent(json);
                }
            }

            getJson()
        } catch (err) {
            setError(new Error(err.message))
        } finally {
            setIsLoaded(true)
        }
    }, [])
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <CalendarContextMounter>
                <DateContext.Provider value={{
                    selected,
                    setSelected,
                    month,
                    event,
                    startDateForDatePiker,
                    dateCounts,
                }}>
                    <TimeContext.Provider value={{
                        startTime,
                        setStartTime,
                        endTime,
                        setEndTime,
                    }}>
                        <div className={classes.calendar}>
                            <div className={classes.dateContainer}>
                                <div className={classes.time}>{format(day, 'kk:mm:ss')}</div>
                                <div className={classes.date}>{format(day, 'EEEE, d MMMM y')}</div>
                            </div>
                            <div className={classes.dateAndSelectedMonthContainer}>
                                <div className={classes.doubleContainer}>
                                    <div className={classes.selectedMonth}>{format(month, 'LLLL y')}</div>
                                    <div>
                                        <button style={{marginRight: 10}} onClick={prev}>&#5169;</button>
                                        <button onClick={next}>&#5167;</button>
                                    </div>
                                </div>
                                <Month/>
                            </div>
                            <EventForm createEvent={createEvent}/>
                            <div>
                                {usersEvent}
                            </div>
                        </div>
                    </TimeContext.Provider>
                </DateContext.Provider>
            </CalendarContextMounter>
        );
    }
};

export default Calendar;