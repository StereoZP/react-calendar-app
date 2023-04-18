import React from 'react';
import classes from "./Menu.module.css";
import CustomInput from "../UI/CustomInput/CustomInput";

const AppMenu = () => {
    return (
        <div className={classes.appMenu}>
            <div className={classes.search}>
                <div>Icon</div>
                <CustomInput/>
            </div>
            <div className={classes.sign}>
                <button>Sign In</button>
                <button>Sign Up</button>
                <div>Icon</div>
                <button>\/</button>
            </div>
        </div>
    );
};

export default AppMenu;