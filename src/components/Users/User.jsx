import React, {useContext} from 'react';
import classes from "./User.module.css";
import cl from "../ApplicationMenu/Menu.module.css"
import {DateContext} from "../Context/dateContext";




const User = ({id, firstName, lastName, email, color, selected}) => {
    const firstLetter = firstName.charAt(0).toUpperCase();

    const dateContext =useContext(DateContext)

    const stylesButton = [(selected===true) ? cl.buttonStyleActive : cl.buttonStyle].join('')

    const usersSelectedUpdate = (userId) => {
        const updatedUsers = dateContext.users.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    selected: !user.selected
                };
            }
            return user;
        });
        dateContext.setUsers(updatedUsers);
    };

    return (
        <div>
            <button className={stylesButton} onClick={()=>usersSelectedUpdate(id)}>
                <div className={classes.circle}>
                    <div className={classes.initial} style={{backgroundColor: color}}>{firstLetter}</div>
                    <div>
                        <div className={classes.name}>{`${firstName} ${lastName}`}</div>
                        <div>{email}</div>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default User;