import React from 'react';
import {useContext, useState} from "react";
import {format,} from "date-fns";
import {EventFormContext, DateContext, ApplicationContext} from "../../сontext";
import {validationSchema} from "../../validation/validationSchema";

const FormController = (props) => {
    const appContext = useContext(ApplicationContext)
    const dateContext = useContext(DateContext)

    const [post, setPost] = useState({title: '', body: ''})

    const {state, dispatch} = appContext;

    const selectedMembers = dateContext.selectedUsers.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }))

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
                    users: selectedMembers,
                }
                dateContext.createEvent(newEvent);
                closeModal()
            })
            .catch((err) => {
                dispatch({type: "setFormControllerErrors", payload: err.inner})
            });
    }

    const openModal = () => {
        setPost({title: '', body: ''})
        dispatch({type: 'openModal', payload: dateContext.notSelectedUsers})
    }

    const closeModal = () => {
        dispatch({type: 'setModal', payload: false})
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