import React from 'react';
import {useEffect, useMemo, useState} from "react";
import {add, isSameDay, parseISO, setHours, setMinutes} from "date-fns";
import EventList from "./EventList";
import {DateContext} from "../dateContext";


const CalendarController = (props) => {

    const [day, setDay] = useState(new Date())
    const [month, setMonth] = useState(new Date())
    const [selected, setSelected] = useState(new Date())
    const startDateForDatePiker = useState(setHours(setMinutes(selected, 0), 9))

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

    return (
        <div>
            <DateContext.Provider value={{
                selected,
                setSelected,
                createEvent,
                month,
                event,
                startDateForDatePiker,
                dateCounts,
            }}>
                {props.children({day, month, prev, next, usersEvent, error, isLoaded})}
            </DateContext.Provider>
        </div>
    );
};

export default CalendarController;