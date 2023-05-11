import React from 'react';
import {useContext, useState} from "react";
import {DateContext} from "../Context/dateContext";
import {format,} from "date-fns";
import {EventFormContext} from "../Context/eventFormContext";
import {validationSchema} from "../../validation/validationSchema";

const FormController = (props) => {
    const dateContext = useContext(DateContext)
    const [post, setPost] = useState({title: '',body:''})

    const selectedMembers = dateContext.selectedUsers.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }))

    const addNewPost = (e) => {
        e.preventDefault()
        validationSchema.validate(post, { abortEarly: false })
            .then(() => {
                const newEvent = {
                    ...post,
                    id: Date.now(),
                    date: format(dateContext.state.startDate, 'y-MM-dd'),
                    isAllDayEvent:dateContext.state.isAllDayEvent,
                    startTime:(!dateContext.state.isAllDayEvent) ? format(dateContext.state.startDate, 'HH:mm') : null,
                    endTime:(!dateContext.state.isAllDayEvent) ? format(dateContext.state.endDate, 'HH:mm') : null,
                    users: selectedMembers,
                }
                dateContext.createEvent(newEvent);
                closeModal()
            })
            .catch((err) => {
                dateContext.dispatch({type:"setFormControllerErrors", payload:err.inner})
            });
    }

    const openModal = () =>{
        setPost({title: '', body: ''})
        dateContext.dispatch({type:'openModal', payload:dateContext.notSelectedUsers})
    }

    const closeModal = () => {
        dateContext.dispatch({type:'setModal', payload:false})
    }

    return (
        <div>
            <EventFormContext.Provider value={{
                post,
                setPost,
                addNewPost,
            }}>
                {props.children({openModal, dateContext})}
            </EventFormContext.Provider>
        </div>
    );
};

export default FormController;