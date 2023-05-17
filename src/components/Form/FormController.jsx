import React from 'react';
import {useContext, useState} from "react";
import {format,} from "date-fns";
import {EventFormContext, ApplicationContext} from "../../сontext";
import {validationSchema} from "../../validation/validationSchema";

const FormController = (props) => {
    const appContext = useContext(ApplicationContext)

    const [post, setPost] = useState({title: '', body: ''})

    const {state, dispatch} = appContext;

    const addNewPost = (e) => {
        e.preventDefault()
        validationSchema.validate(post, {abortEarly: false})
            .then(() => {
                const newEvent = {
                    ...post,
                    id: Date.now(),
                    date: format(state.startDate, 'y-MM-dd'),
                    isAllDayEvent: state.isAllDayEvent,
                    startTime: (!state.isAllDayEvent) ? format(state.startDate, 'HH:mm') : null,
                    endTime: (!state.isAllDayEvent) ? format(state.endDate, 'HH:mm') : null,
                    users: state.users?.filter(user => user.selected),
                }
                dispatch({type: 'setEvent', payload: newEvent});
            })
            .catch((err) => {
                dispatch({type: "setFormControllerErrors", payload: err.inner})
            });
    }

    const openModal = () => {
        setPost({title: '', body: ''})
        dispatch({type: 'openModal'})
    }

    return (
        <div>
            <EventFormContext.Provider value={{
                post,
                setPost,
                addNewPost,
            }}>
                {props.children({openModal, appContext})}
            </EventFormContext.Provider>
        </div>
    );
};

export default FormController;