import React, {useState, useEffect} from 'react';
import classes from "./Menu.module.css";
import Input from "../UI/CustomInput/Input";
import nightModeImg from "../../images/moon.png"
import dayModeImg from "../../images/sun.png"
import userImg from "../../images/user.png"
import calendarIMG from "../../images/calendar.png"
import cl from "../Form/Form.module.css"

const AppMenu = () => {

    const [mode, setMode] = useState(false)

    const switchMode = () => setMode(!mode);

    useEffect(() => {
        if (mode) {
            document.body.style.background = 'darkgrey';
        } else {
            document.body.style.background = 'white';
        }
    }, [mode]);

    return (
        <div className={classes.appMenu}>
            <div className={classes.searchContainer}>
                <div className={classes.paddingContainer}><img src={calendarIMG} alt="CalendarIcon"/></div>
                <Input/>
            </div>
            <div className={classes.signContainer}>
                <div className={classes.sign}>
                    <button className={classes.paddingContainer}>Sign In</button>
                    <button className={classes.paddingContainer}>Sign Up</button>
                    <div className={cl.image}><img src={userImg} alt="User"/></div>
                </div>
                <div className={cl.image}>
                    <button className={cl.image} onClick={switchMode}>
                        {mode ? <img src={nightModeImg} alt="Moon"/>: <img src={dayModeImg} alt="Sun"/>}</button>
                </div>
            </div>
        </div>
    );
};

export default AppMenu;