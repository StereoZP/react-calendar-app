import React, {useReducer} from 'react';
import {useEffect, useMemo} from "react";
import {format, isSameDay, parseISO} from "date-fns";
import EventList from "../Event/EventList";
import {DateContext} from "../Context/dateContext";
import {reducer} from "../../store/reducer";
import initialState from "../../store/store"

const CalendarController = (props) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        /*setInterval(() => {
            setDay(new Date())
        }, 1000)*/

        const createEvent = (newEvent) => {
            dispatch({type: 'setEvent', payload: newEvent})
        }

        const removeEvent = (id) => {
            dispatch({type: 'removeEvent', payload: id})
            dispatch({type: 'setConfirmDeleteModal', payload: false})
        }

        const openDeleteModal = () => {
            dispatch({type: 'setConfirmDeleteModal', payload: true})
        }

        const closeDeleteModal = () => {
            dispatch({type: 'setConfirmDeleteModal', payload: false})
        }

        const openMembersModal = () => {
            dispatch({type: 'setMembersModal', payload: true})
            dispatch({type: 'setModal', payload: false})
        }

        const closeMembersModal = () => {
            dispatch({type: 'setMembersModal', payload: false})
            dispatch({type: 'setModal', payload: true})
        }

        const openConfirmModal = () => {
            dispatch({type: 'setConfirmUpdateModal', payload: true})
            dispatch({type: 'setUpdateModal', payload: false})
        }

        const [selectedUsers, notSelectedUsers] = useMemo(() => {

            const selected = state.users?.filter(user => user.selected);
            const notSelected = state.users?.map(user => {
                if (user.selected) {
                    return {
                        ...user,
                        selected: !user.selected
                    };
                }
                return user;
            });
            return [selected, notSelected];
        }, [state.users]);

        const isAllDayEventController = () => {
            dispatch({type: 'setAllDayEvent', payload: !state.isAllDayEvent})
        }

        const usersEvent = state.events.filter(item => isSameDay(state.selected, parseISO(item.date))).map((item) => {
            return <EventList key={item.id} event={item} eventTitle={item.title} eventBody={item.body}/>
        })

        const updateEvent = (id, newTitle, newBody, confirm) => {
            const updatedTitleAndBody = state.events.map((item) => {
                if (item.id === id && !state.isAllDayEvent && (item.selected || !item.selected)) {
                    return {
                        ...item,
                        title: newTitle,
                        body: newBody,
                        startTime: format(state.startDate, 'HH:mm'),
                        endTime: format(state.endDate, 'HH:mm'),
                        users: selectedUsers
                    }
                }
                if (item.id === id && state.isAllDayEvent && (item.selected || !item.selected)) {
                    return {
                        ...item,
                        title: newTitle,
                        body: newBody,
                        users: selectedUsers
                    }
                }
                return item
            })
            if (confirm) {
                dispatch({type: 'setEvent', payload: updatedTitleAndBody})
            }
        };

        const dateCounts = useMemo(() => {
            return state.events.reduce((acc, obj) => {
                const date = obj.date;
                if (!acc[date]) {
                    acc[date] = 0;
                }
                acc[date]++;
                return acc;
            }, {})
        }, [state.events])

        useEffect(() => {
            try {
                async function getJson() {
                    const response = await fetch("/data.json")
                    if (response.status === 200) {
                        dispatch({type: 'setIsLoaded', payload: true})
                        const json = await response.json()
                        return dispatch({type: 'setEvent', payload: json});
                    }
                }
                getJson()
            } catch (err) {
                dispatch({type: 'setError', payload: new Error(err.message)})
            } finally {
                dispatch({type: 'setIsLoaded', payload: true})
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
                    isAllDayEventController,
                    openMembersModal,
                    closeMembersModal,
                    openConfirmModal,
                    selectedUsers,
                    notSelectedUsers,
                    dateCounts,
                    state, dispatch
                }}>
                    {props.children({usersEvent, state})}
                </DateContext.Provider>
            </div>
        );
    }
;

export default CalendarController;