import React from 'react';
import {useState, useContext} from "react";
import classes from "./Calendar.module.css";
import {format} from "date-fns";
import {MyContext} from "../context";
import MyModal from "./UI/MyModal/MyModal";
import MyInput from "./UI/MyInput/MyInput";

const EventForm = ({selectedDay, createEvent}) => {
    const [newEvent, setNewEvent] = useState({title: ''})
    const [modal, setModal] = useState(false)
    const context = useContext(MyContext)

    const addNewEvent = (e) => {
        e.preventDefault()

        const newPost = {
            ...newEvent,
            id: Date.now(),
            date: selectedDay.toISOString(),
        }
        setNewEvent({title: ""})
        createEvent(newPost);
        closeModal();
    }
    const closeModal = () => {
        setModal(false)
    }

    return (
        <div className={classes.doubleContainer}>
            <div className={classes.selectedDay}>{format(context.selected, 'EEEE')} {format(context.selected, 'd')}</div>
            <button onClick={() => setModal(true)}>+</button>
            <MyModal className={classes.container} visible={modal} setVisible={setModal}>
                <MyInput
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                    type="text"
                    placeholder="Event"
                />
                <button onClick={addNewEvent}>Add event</button>
            </MyModal>
        </div>
    );
};

export default EventForm;