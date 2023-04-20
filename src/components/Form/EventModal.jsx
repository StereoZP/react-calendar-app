import React from 'react';
import cl from "./Form.module.css";
import classes from "../Calendar/Calendar.module.css";
import CustomInput from "../UI/CustomInput/CustomInput";
import SelectedTime from "./SelectedTime";
import DatePicker from "react-datepicker";
import {useContext} from "react";
import {DateContext} from "../Context/dateContext";
import {EventFormContext} from "../Context/eventFormContext";
import Modal from "../UI/Modal/Modal";
import ListOfUsers from "../Users/ListOfUsers";


const EventModal = () => {
    const dateContext = useContext(DateContext)
    const event = useContext(EventFormContext)

    return (
        <div>
            <div className={cl.inputBlock}>
                <div>
                    <CustomInput
                        className={event.inputStylesTitle}
                        value={event.post.title}
                        onChange={(e) => event.setPost({...event.post, title: e.target.value})}
                        type="text"
                        placeholder="Title"
                    />
                        {
                            dateContext.errorTitle ?
                                <div style={{color: "red"}}>{dateContext.errorTitle.message}</div> :
                                ""
                        }
                    <CustomInput
                        className={event.inputStylesBody} style={{marginTop: "10px"}}
                        value={event.post.body}
                        onChange={(e) => event.setPost({...event.post, body: e.target.value})}
                        type="text"
                        placeholder="Event"
                    />
                    {
                        dateContext.errorBody ?
                            <div style={{color: "red"}}>{dateContext.errorBody.message}</div> :
                            ""
                    }
                </div>
                <div className={cl.formBlock}>
                    <div className={cl.inputCheckbox}>
                        <input type="checkbox" checked={dateContext.checkbox} onChange={event.checkboxController}/>
                    </div>
                    <div className={cl.inputCheckbox}>All day</div>
                </div>
            </div>
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
            <div className={cl.formBlock}>
                <button onClick={event.addNewPost}>Add event</button>
                <button onClick={event.openMembersModal}>Add members</button>
            </div>
            <Modal className={classes.modalContainer} visible={event.membersModal} setVisible={event.setMembersModal}>
                <ListOfUsers/>
                <div className={cl.formBlock}>
                    <button onClick={event.addMembers}>Add</button>
                    <button onClick={event.closeMembersModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default EventModal;