import React from 'react';
import cl from "./Form.module.css";
import DatePicker from "react-datepicker";
import {TimeContext} from "../timeContext";
import {useContext} from "react";

const SelectedTime = () => {
    const timeContext = useContext(TimeContext)
    const blockStyles = [cl.formBlock, cl.topPadding].join(' ');
    return (
        <div className={blockStyles}>
            <div>
                <div>
                    Начало:
                </div>
                <div>
                    <DatePicker selected={timeContext.startTime}
                                onChange={(date) => timeContext.setStartTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                    />
                </div>

            </div>
            <div>
                <div>
                    Конец:
                </div>
                <div>
                    <DatePicker selected={timeContext.endTime}
                                onChange={(date) => timeContext.setEndTime(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectedTime;