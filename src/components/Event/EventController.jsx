import React from 'react';
import {EventListContext} from "../Context/eventListContext";
import {useContext, useState} from "react";
import {DateContext} from "../Context/dateContext";

const EventController = (props) => {

    const {eventTitle, eventBody, addDate, startTime, endTime, event, id} = props

    const dateContext = useContext(DateContext)
    const [updateModal, setUpdateModal] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(eventTitle)
    const [updateBody, setUpdateBody] = useState(eventBody)
    const [confirmUpdateModal, setConfirmUpdateModal] = useState(false)

    const openUpdateModal = () => {
        setUpdateModal(true)
        setUpdateTitle(eventTitle)
        setUpdateBody(eventBody)
    }

    const confirmUpdate = () =>{
        setConfirmUpdateModal(false)
        setUpdateModal(false)
        dateContext.updateEvent(id, updateTitle, updateBody,true)
    }

    const openConfirmModal = () => {
        setConfirmUpdateModal(true)
        setUpdateModal(false)
    }

    const closeUpdateModal = () => {
        setUpdateModal(false)
        setConfirmUpdateModal(false)
        dateContext.updateEvent(id, eventTitle, eventBody)
    }

    return (
        <div>
            <EventListContext.Provider value={{
                addDate, startTime, endTime, updateModal, setUpdateModal, confirmUpdateModal, setConfirmUpdateModal,eventTitle, eventBody, event,
                openUpdateModal, openConfirmModal,confirmUpdate, closeUpdateModal, updateTitle, setUpdateTitle, updateBody, setUpdateBody
            }}>
                {props.children}
            </EventListContext.Provider>
        </div>
    );
};

export default EventController;