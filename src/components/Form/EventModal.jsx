import React from 'react';
import cl from "./Form.module.css";
import CustomInput from "../UI/CustomInput/CustomInput";
import SelectedTime from "./SelectedTime";
import DatePicker from "react-datepicker";
import {useContext} from "react";
import {DateContext} from "../Context/dateContext";
import {EventFormContext} from "../Context/eventFormContext";


const EventModal = () => {
    const dateContext = useContext(DateContext)
    const event =useContext(EventFormContext)

    return (
        <div>
            <div className={cl.formBlock}>
                    <CustomInput
                        className={event.inputStylesTitle}
                        value={event.post.title}
                        onChange={(e) => event.setPost({...event.post, title: e.target.value})}
                        type="text"
                        placeholder="Title"
                    />
                <div className={cl.formBlock}>
                    <div className={cl.inputCheckbox}>
                        <input type="checkbox" checked={dateContext.checkbox} onChange={event.checkboxController}/>
                    </div>
                    <div className={cl.inputCheckbox}>All day</div>
                </div>
            </div>
            {
                dateContext.errorTitle?
                    <div style={{color:"red"}}>{dateContext.errorTitle.message}</div>:
                    ""
            }
            <div className={cl.formBlock}>
                <CustomInput
                    className={event.inputStylesBody}
                    value={event.post.body}
                    onChange={(e) => event.setPost({...event.post, body: e.target.value})}
                    type="text"
                    placeholder="Event"
                />
            </div>
            {
                dateContext.errorBody?
                    <div style={{color:"red"}}>{dateContext.errorBody.message}</div>:
                    ""
            }
            {
                !dateContext.checkbox ?
                    <SelectedTime/> :
                    ''
            }
            <div className={event.blockStyles}>
                <div>Select another date:</div>
                <div>
                    <DatePicker selected={event.startDate}
                                onChange={(date) => event.setStartDate(date)}

                    />
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", paddingTop:"10px"}}>
                <button onClick={event.addNewPost}>Add event</button>
            </div>
        </div>
    );
};

export default EventModal;