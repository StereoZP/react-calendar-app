import React from 'react';
import {useEffect, useMemo, useState} from "react";
import {add, isSameDay, parseISO, setHours, setMinutes} from "date-fns";
import EventList from "../Event/EventList";
import {DateContext} from "../Context/dateContext";
import EventController from "../Event/EventController";

const CalendarController = (props) => {

    const [day, setDay] = useState(new Date())
    const [month, setMonth] = useState(new Date())
    const [selected, setSelected] = useState(new Date())
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [event, setEvent] = useState([]);
    const [deleteEvent, setDeleteEvent] = useState([])
    const [modal, setModal] = useState(false)
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const startDateForDatePiker = useState(setHours(setMinutes(selected, 0), 9))
    const endDateForDatePiker = useState(setHours(setMinutes(selected, 0), 9))
    const [checkbox, setCheckbox] = useState(true)
    const [errorTitle, setErrorTitle] = useState(null);
    const [errorBody, setErrorBody] = useState(null);
    const [user, setUser] = useState([{id: 1, firstName: "Alex", lastName: "Sumrii", email:"alex_sumrii@gmail.com", color: "#FF5733",},
        {id: 2, firstName: "Vladimir", lastName: "Ozirskiy", email:"vladimir_ozirskiy@gmail.com", color: "#900C3F",},
        {id: 3, firstName: "Stepan", lastName: "Bandera", email:"stepan_bandera@gmail.com", color: "#581845",}])

    setInterval(() => {
        setDay(new Date())
    }, 1000)

    const prev = () => {
        setMonth(add(month, {months: -1}))
    }

    const next = () => {
        setMonth(add(month, {months: 1}))
    }

    const createEvent = (newEvent) => {
        setEvent([...event, newEvent])
    }

    const removeEvent = () => {
        setEvent(deleteEvent)
        setConfirmDeleteModal(false)
    }

    const openDeleteModal = (post) => {
        setDeleteEvent(event.filter(p => p.id !== post.id))
        setConfirmDeleteModal(true)
    }

    const closeDeleteModal = () => {
        setConfirmDeleteModal(false)
    }

    const updateEvent = (id, newTitle, newBody, confirm) => {
        const updatedTitleAndBody = event.map((item) =>
            item.id === id ? {...item, title: newTitle, body: newBody} : item
        );
        if (confirm) {
            setEvent(updatedTitleAndBody)
        }
    };

    const usersEvent = event.map((item, index) => {
        if (isSameDay(selected, parseISO(item.date))) {
            return <EventController key={index} event={item} id={item.id} eventTitle={item.title} eventBody={item.body}
                                    addDate={item.date} startTime={item.startTime} endTime={item.endTime}>
                <EventList/>
            </EventController>
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
                createEvent,
                removeEvent,
                updateEvent,
                openDeleteModal,
                closeDeleteModal,
                selected,
                setSelected,
                month,
                event,
                startDateForDatePiker,
                endDateForDatePiker,
                dateCounts,
                setEvent,
                modal,
                setModal,
                checkbox,
                setCheckbox,
                errorTitle,
                setErrorTitle,
                errorBody,
                setErrorBody,
                confirmDeleteModal,
                setConfirmDeleteModal,
                user,
            }}>
                {props.children({day, month, prev, next, usersEvent, error, isLoaded})}
            </DateContext.Provider>
        </div>
    );
}
    ;

    export default CalendarController;