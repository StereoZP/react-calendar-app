import React, {useContext} from 'react';
import {useEffect, useMemo} from "react";
import {ApplicationContext, DateContext} from "../../сontext";
import {CLEAR_EVENTS, SET_EVENTS} from "../../store/actions";

const CalendarController = (props) => {
    const {state, dispatch} = useContext(ApplicationContext)

    /*setInterval(() => {
        setDay(new Date())
    }, 1000)*/

    const createEvent = (newEvent) => {
        dispatch({type: 'setEvent', payload: newEvent})
    }

    const openMembersModal = () => {
        dispatch({type: 'setMembersModal', payload: true})
    }

    const closeMembersModal = () => {
        dispatch({type: 'setMembersModal', payload: false})
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

    const setIsAllDayEvent = () => {
        dispatch({type: 'setAllDayEvent', payload: !state.isAllDayEvent})
    }

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
        return () => dispatch({type: CLEAR_EVENTS})
    }, [])

    return (
        <div>
            <DateContext.Provider value={{
                createEvent,
                setIsAllDayEvent,
                openMembersModal,
                closeMembersModal,
                selectedUsers,
                notSelectedUsers,
                dateCounts,
            }}>
                {props.children(state, dispatch)}
            </DateContext.Provider>
        </div>
    );
};

export default CalendarController;