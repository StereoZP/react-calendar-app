import React from 'react';
import {useContext, useState} from "react";
import {format,} from "date-fns";
import {EventFormContext, ApplicationContext} from "../../сontext";
import {validationSchema} from "../../validation/validationSchema";
import {OPEN_MODAL, SET_EVENT, SET_FORM_CONTROLLER_ERRORS} from "../../store/actions";

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
                dispatch({type: SET_EVENT, payload: newEvent});
            })
            .catch((err) => {
                dispatch({type: SET_FORM_CONTROLLER_ERRORS, payload: err.inner})
            });
    }

    const openModal = () => {
        setPost({title: '', body: ''})
        dispatch({type: OPEN_MODAL})
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