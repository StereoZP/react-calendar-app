import React from 'react';
import cl from "./Form.module.css";
import DatePicker from "react-datepicker";
import {DateContext} from "../Context/dateContext";
import {useContext} from "react";

const SelectedTime = () => {
    const dateContext = useContext(DateContext)

    const blockStyles = [cl.formBlock, cl.topPadding].join(' ');

    const filterPassedTimeStart = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };
    const filterPassedTimeEnd = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return (currentDate.getTime() && dateContext.startDate.getTime()) < selectedDate.getTime();
    };

    return (
        <div className={blockStyles}>
            <div>
                Select time range:
            </div>
            <div>From:
                <DatePicker
                    selected={dateContext.startDate}
                    onChange={(date) => dateContext.setStartDate(date)}
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
                    selected={dateContext.endDate}
                    onChange={(date) => dateContext.setEndDate(date)}
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