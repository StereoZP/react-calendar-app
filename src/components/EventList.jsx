import React from 'react';
import classes from './Calendar.module.css'

const EventList = (props) => {
    const {eventTitle} = props
    return (
        <div className={classes.eventContainer}>
            <strong> {eventTitle}</strong>
            <strong></strong>
        </div>
    );
};

export default EventList;