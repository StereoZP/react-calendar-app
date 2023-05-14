import React, {useReducer} from 'react';
import {useEffect, useMemo} from "react";
import {format} from "date-fns";
import {DateContext} from "../Context/dateContext";
import {reducer} from "../../store/reducer";
import initialState from "../../store/store"
import {SET_EVENTS} from "../../store/actions";

const CalendarController = (props) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        console.log(state.events.id)
        /*setInterval(() => {
            setDay(new Date())
        }, 1000)*/

        const createEvent = (newEvent) => {
            dispatch({type: 'setEvent', payload: newEvent})
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
                dispatch({type: SET_EVENTS, payload: updatedTitleAndBody})
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
                        return dispatch({type: SET_EVENTS, payload: json});
                    }
                }
                getJson()
            } catch (err) {
                dispatch({type: 'setError', payload: new Error(err.message)})
            } finally {
                dispatch({type: 'setIsLoaded', payload: true})
            }
        }, [])

    const confirmUpdate = () => {
        dispatch({type: 'confirmUpdateModal'})
        updateEvent(state.events.id, state.updateTitle, state.updateBody, true)
    }

    const closeUpdateModal = () => {
        dispatch({type: 'confirmUpdateModal'})
        updateEvent(state.events.id, state.events.eventTitle, state.events.eventBody, false)
    }

        return (
            <div>
                <DateContext.Provider value={{
                    confirmUpdate,
                    closeUpdateModal,
                    createEvent,
                    updateEvent,
                    isAllDayEventController,
                    openMembersModal,
                    closeMembersModal,
                    openConfirmModal,
                    selectedUsers,
                    notSelectedUsers,
                    dateCounts,
                    state,
                    dispatch,
                }}>
                    {props.children(state, dispatch)}
                </DateContext.Provider>
            </div>
        );
    }
;

export default CalendarController;