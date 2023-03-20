import React from 'react';
import classes from './Calendar.module.css'

const EventTitle = (props) => {
    const {eventTitle} = props
    return (
        <div className={classes.eventContainer}>
            <strong> {eventTitle}</strong>
            <strong></strong>
        </div>
    );
};

export default EventTitle;