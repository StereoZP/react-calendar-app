import React from 'react';
import classes from "../EventBoardWeek/EventBoardWeek.module.css";

const FieldsAddEventDay = () => {

    return (
        <div className={classes.fieldsContainer}>
            <div className={classes.eventButtonTop}></div>
            <div className={classes.eventButtonBottom}></div>
        </div>
    );
};

export default FieldsAddEventDay;