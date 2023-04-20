import React from 'react';
import classes from "./User.module.css";


const User = ({ firstName, lastName, email, color }) => {
    const firstLetter = firstName.charAt(0).toUpperCase();
    return (
        <div className={classes.circle}>
            <div className={classes.initial} style={{ backgroundColor: color }}>{firstLetter}</div>
            <div>
                <div className={classes.name}>{`${firstName} ${lastName}`}</div>
                <div>{email}</div>
            </div>
        </div>
    );
};

export default User;