import React from 'react';
import {useEffect, useMemo, useState} from "react";
import {add, format, isSameDay, parseISO, setHours, setMinutes} from "date-fns";
import EventList from "../Event/EventList";
import {DateContext} from "../Context/dateContext";
import EventController from "../Event/EventController";

const CalendarController = (props) => {

    const [day, ] = useState(new Date())
    const [month, setMonth] = useState(new Date())
    const [selected, setSelected] = useState(new Date())
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [startDate, setStartDate] = useState(setHours(setMinutes(selected, 0), 9))
    const [endDate, setEndDate] = useState(setHours(setMinutes(selected, 0), 9))
    const [event, setEvent] = useState([]);
    const [deleteEvent, setDeleteEvent] = useState([])
    const [modal, setModal] = useState(false)
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const [membersModal, setMembersModal] = useState(false)

    const [checkbox, setCheckbox] = useState(true)
    const [errorTitle, setErrorTitle] = useState(null);
    const [errorBody, setErrorBody] = useState(null);
    const [users, setUsers] = useState([{id: 1, firstName: "Alex", lastName: "Sumrii", email:"alex_sumrii@gmail.com", color: "#FF5733", selected:false},
        {id: 2, firstName: "Vladimir", lastName: "Ozirskiy", email:"vladimir_ozirskiy@gmail.com", color: "#900C3F", selected:false},
        {id: 3, firstName: "Stepan", lastName: "Bandera", email:"stepan_bandera@gmail.com", color: "#581845", selected:false}])

    const userSelectedTrue = users.filter(user => user.selected);
    const userSelectedFalse = users.map(user => {
            if (user.selected) {
                return {
                    ...user,
                    selected: !user.selected
                };
            }
            return user;
        });

    /*setInterval(() => {
        setDay(new Date())
    }, 1000)*/

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
        setConfirmDeleteModal(true)
        setDeleteEvent(event.filter(p => p.id !== post.id))
    }

    const closeDeleteModal = () => {
        setConfirmDeleteModal(false)
    }

    const openMembersModal = () => {
        setMembersModal(true)
    }

    const closeMembersModal = () => {
        setMembersModal(false)
    }

    const updateEvent = (id, newTitle, newBody, confirm) => {
        const updatedTitleAndBody = event.map((item) =>
            item.id === id && !checkbox && (item.selected || !item.selected)  ? {...item, title: newTitle, body: newBody, startTime:format(startDate, 'HH:mm'),
                endTime:format(endDate, 'HH:mm'), members:userSelectedTrue} :
            item.id === id && checkbox && (item.selected || !item.selected) ? {...item, title: newTitle, body: newBody, startTime:null,
                endTime:null , members:userSelectedTrue} : item);
        if (confirm) {
            setEvent(updatedTitleAndBody)
        }
    };

        const checkboxController = () =>{
            if(checkbox){
                setCheckbox(false)
            }
            if(!checkbox){
                setCheckbox(true)
            }
        }

    const usersEvent = event.map((item, index) => {
        if (isSameDay(selected, parseISO(item.date))) {
            return <EventController key={index} event={item} id={item.id} eventTitle={item.title} eventBody={item.body}
                                    addDate={item.date} startTime={item.startTime} endTime={item.endTime} members={item.members}>
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
                checkboxController,
                openMembersModal,
                closeMembersModal,
                userSelectedTrue,
                userSelectedFalse,
                selected,
                setSelected,
                month,
                event,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
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
                users,
                setUsers,
                membersModal,
                setMembersModal,
            }}>
                {props.children({day, month, prev, next, usersEvent, error, isLoaded})}
            </DateContext.Provider>
        </div>
    );
}
    ;

    export default CalendarController;