import React from 'react';
import classes from './Calendar.module.css'

const EventTitle = (props) => {
    const {eventTitle, number} = props
    return (
        <div className={classes.eventContainer}>
            <strong>{number}. {eventTitle}</strong>
        </div>
    );
};

export default EventTitle;