import React, {useContext} from 'react';
import {useEffect, useMemo} from "react";
import {ApplicationContext, DateContext} from "../../сontext";
import {CLEAR_EVENTS, SET_ERROR, SET_EVENTS, SET_IS_LOADED} from "../../store/actions";

const CalendarController = (props) => {
    const {state, dispatch} = useContext(ApplicationContext)

    /*setInterval(() => {
        setDay(new Date())
    }, 1000)*/

    // const [selectedUsers, notSelectedUsers] = useMemo(() => {
    //     const selected = state.users?.filter(user => user.selected);
    //     const notSelected = state.users?.map(user => {
    //         if (user.selected) {
    //             return {
    //                 ...user,
    //                 selected: !user.selected
    //             };
    //         }
    //         return user;
    //     });
    //     return [selected, notSelected];
    // }, [state.users]);

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
                    dispatch({type: SET_IS_LOADED, payload: true})
                    const json = await response.json()
                    return dispatch({type: SET_EVENTS, payload: json});
                }
            }
            getJson()
        } catch (err) {
            dispatch({type: SET_ERROR, payload: new Error(err.message)})
        } finally {
            dispatch({type: SET_IS_LOADED, payload: true})
        }
        return () => dispatch({type: CLEAR_EVENTS})
    }, [])

    return (
        <div>
            <DateContext.Provider value={{
                // selectedUsers,
                // notSelectedUsers,
                dateCounts,
            }}>
                {props.children(state, dispatch)}
            </DateContext.Provider>
        </div>
    );
};

export default CalendarController;