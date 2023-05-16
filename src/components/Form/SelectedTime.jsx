import React from 'react';
import cl from "./Form.module.css";
import DatePicker from "react-datepicker";
import {ApplicationContext} from "../../сontext";
import {useContext} from "react";

const SelectedTime = () => {
    const {state, dispatch} = useContext(ApplicationContext)

    const blockStyles = [cl.formBlock, cl.topPadding].join(' ');

    const filterPassedTimeStart = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };
    const filterPassedTimeEnd = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return (currentDate.getTime() && state.startDate.getTime()) < selectedDate.getTime();
    };

    return (
        <div className={blockStyles}>
            <div>
                Select time range:
            </div>
            <div>From:
                <DatePicker
                    selected={state.startDate}
                    onChange={(date) => dispatch({type: 'setStartDate', payload: date})}
                    showTimeSelect
                    showTimeSelectOnly
                    filterTime={filterPassedTimeStart}
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
            </div>
            <div>To:
                <DatePicker
                    selected={state.endDate}
                    onChange={(date) => dispatch({type: 'setEndDate', payload: date})}
                    showTimeSelect
                    showTimeSelectOnly
                    filterTime={filterPassedTimeEnd}
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
            </div>
        </div>
    );
};

export default SelectedTime;