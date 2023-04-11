import React from 'react';
import classes from './Calendar.module.css'
import cl from "./Form.module.css"

const EventList = (props) => {
    const {eventTitle, addDate} = props

    return (
        <div className={classes.eventContainer}>
            <div className={cl.formBlock}>
                <div className={classes.eventTitle}>
                    <div >{eventTitle}</div>
                </div>
            </div>
            <div className={classes.eventAddDay}>
                <div>{addDate}</div>
            </div>
        </div>
    );
};

export default EventList;