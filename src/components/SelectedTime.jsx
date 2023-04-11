import React from 'react';
import cl from "./Form.module.css";
import DatePicker from "react-datepicker";
import {DateContext} from "../dateContext";
import {useContext} from "react";

const SelectedTime = () => {
    const dateContext = useContext(DateContext)
    const {startDateForDatePiker: [startDate, setStartDate]} = dateContext
    const blockStyles = [cl.formBlock, cl.topPadding].join(' ');

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    return (
        <div className={blockStyles}>
                <div>
                    Выбрать время:
                </div>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        filterTime={filterPassedTime}
                        dateFormat="h:mm aa"
                    />
                </div>
        </div>
    );
};

export default SelectedTime;