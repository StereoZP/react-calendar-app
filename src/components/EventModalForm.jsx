import React from 'react';
import cl from "./Form.module.css";
import MyInput from "./UI/MyInput/MyInput";
import SelectedTime from "./SelectedTime";
import DatePicker from "react-datepicker";
import {useContext} from "react";
import {EventContext} from "../eventContext";

const EventModalForm = (props) => {
    const {setCheckbox} = props
    const event = useContext(EventContext)
    return (
        <div>
            <div className={cl.formBlock}>
                <MyInput
                    className={event.inputStyles}
                    value={event.post.title}
                    onChange={(e) => event.setPost({...event.post, title: e.target.value})}
                    type="text"
                    placeholder="Event"
                />
                <div className={cl.formBlock}>
                    <div className={cl.inputCheckbox}>
                        <input type="checkbox" checked={event.checkbox} onChange={() => setCheckbox(false)}/>
                    </div>
                    <div className={cl.inputCheckbox}>Весь день</div>
                </div>
            </div>
            {
                !event.checkbox ?
                    <SelectedTime/> :
                    ''
            }
            <div className={event.blockStyles}>
                <div>Выбрать другую дату:</div>
                <div>
                    <DatePicker selected={event.startDate}
                                onChange={(date) => event.setStartDate(date)}
                    />
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <button className={cl.topPadding}
                        onClick={event.addNewPost}>Add event
                </button>
            </div>
        </div>
    );
};

export default EventModalForm;