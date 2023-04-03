import React, {useState, useEffect} from 'react';
import Month from "./Month";
import {add, format, isSameDay, parseISO} from "date-fns";
import classes from "./Calendar.module.css";
import {MyContext} from "../context";
import EventForm from "./EventForm";
import EventList from "./EventList";


const Calendar = () => {
    const [day, setDay] = useState(new Date())
    const [month, setMonth] = useState(new Date())
    const [selected, setSelected] = useState(new Date())
    const startDateForDatePiker = useState(selected)

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
            return <EventList key={index} eventTitle={item.title} addDate={item.addDate}/>
        }
    })

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
            <MyContext.Provider value={{selected, setSelected, month, event, startDateForDatePiker}}>
                <div className={classes.calendar}>
                    <div className={classes.dateContainer}>
                        <div
                            className={classes.time}>{format(day, 'kk')}:{format(day, 'mm')}:{format(day, 'ss')}</div>
                        <div
                            className={classes.date}>{format(day, 'EEEE')}, {format(day, 'd')} {format(day, 'MMMM')} {format(day, 'y')}</div>
                    </div>
                    <div className={classes.dateAndSelectedMonthContainer}>
                        <div className={classes.doubleContainer}>
                            <div className={classes.selectedMonth}>{format(month, 'LLLL')} {format(month, 'y')}</div>
                            <div>
                                <button style={{marginRight: 10}} onClick={prev}>&#5169;</button>
                                <button onClick={next}>&#5167;</button>
                            </div>
                        </div>
                        <Month/>
                    </div>
                    <EventForm selectedDay={selected} createEvent={createEvent}/>
                    <div>
                        {usersEvent}
                    </div>
                </div>
            </MyContext.Provider>
        );
    };
};

export default Calendar;