import React from 'react';
import classes from './Calendar.module.css'

const EventList = (props) => {
    const {eventTitle, addDate} = props
    return (
        <div className={classes.eventContainer}>
            <strong> {eventTitle}</strong>
            <strong>{addDate}</strong>
        </div>
    );
};

export default EventList;