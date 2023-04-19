import React, {useState} from 'react';
import classes from "./Menu.module.css";
import CustomInput from "../UI/CustomInput/CustomInput";
import nightModeImg from "../../images/moon.png"
import dayModeImg from "../../images/sun.png"
import userImg from "../../images/user.png"
import calendarIMG from "../../images/calendar.png"
import cl from "../Form/Form.module.css"

const AppMenu = () => {

    const [nightMode, setNightMode] = useState(false)

    const turnOnNightMode = () =>{
        document.body.style.background = "darkgrey";
        setNightMode(true)

    }
    const turnOffNightMode = () =>{
        document.body.style.background = "white";
        setNightMode(false)
    }

    return (
        <div className={classes.appMenu}>
            <div className={classes.searchContainer}>
                <div className={classes.paddingContainer}><img src={calendarIMG} alt="CalendarIcon"/></div>
                <CustomInput/>
            </div>
            <div className={classes.signContainer}>
                <div className={classes.sign}>
                    <button className={classes.paddingContainer}>Sign In</button>
                    <button className={classes.paddingContainer}>Sign Up</button>
                    <div className={cl.image}><img src={userImg} alt="User"/></div>
                </div>
                <div>
                    <button className={cl.image} onClick={turnOnNightMode}><img src={nightModeImg} alt="Moon"/></button>
                    <button className={cl.image} onClick={turnOffNightMode}><img src={dayModeImg} alt="Sun"/></button>
                </div>
            </div>
        </div>
    );
};

export default AppMenu;