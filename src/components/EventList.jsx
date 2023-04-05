import React from 'react';
import classes from './Calendar.module.css'

const EventList = (props) => {
    const {eventTitle, addDate, startTime, endTime} = props
    return (
        <div className={classes.eventContainer}>
            <div className={classes.eventTitle}>
                    <div >{eventTitle}</div>
                <div>
                    <div className={classes.eventTime}>From:{startTime}</div>
                    <div className={classes.eventTime}>To:{endTime}</div>
                </div>
            </div>
            <div className={classes.eventAddDay}>
                <div>{addDate}</div>
            </div>
        </div>
    );
};

export default EventList;