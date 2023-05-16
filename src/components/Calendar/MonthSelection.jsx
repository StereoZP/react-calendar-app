import React, {useContext} from 'react';
import classes from "./Calendar.module.css";
import {format} from "date-fns";
import {ApplicationContext} from "../../сontext";

const MonthSelection = (props) => {
    const context = useContext(ApplicationContext)

    const prev = () => {
        context.dispatch({ type: 'PREV_MONTH' })
    }

    const next = () => {
        context.dispatch({type: 'NEXT_MONTH',
        });
    }
    return (
        <div className={classes.dateAndSelectedMonthContainer}>
            <div className={classes.doubleContainer}>
                <div className={classes.selectedMonth}>{format(context.state.month, 'LLLL y')}</div>
                <div>
                    <button className={classes.buttonStyles} style={{marginRight: 10}} onClick={prev}>&#5169;</button>
                    <button className={classes.buttonStyles} onClick={next}>&#5167;</button>
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default MonthSelection;