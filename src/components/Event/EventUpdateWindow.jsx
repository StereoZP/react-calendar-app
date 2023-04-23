import React from 'react';
import classes from "../Calendar/Calendar.module.css";
import Input from "../UI/CustomInput/Input";
import Modal from "../UI/Modal/Modal";
import {useContext} from "react";
import {EventListContext} from "../Context/eventListContext";
import {DateContext} from "../Context/dateContext";
import cl from "../Form/Form.module.css";
import SelectedTime from "../Form/SelectedTime";
import ListOfUsers from "../Users/ListOfUsers";

const EventUpdateWindow = () => {
    const eventList = useContext(EventListContext)
    const dateContext = useContext(DateContext)
    return (
        <div>
            <Modal className={classes.modalContainer} visible={eventList.updateModal}
                   setVisible={eventList.setUpdateModal}>
                <div className={cl.inputBlock}>
                    <div>
                        <Input style={{width: "100%"}}
                               type="text"
                               value={eventList.updateTitle}
                               onChange={(e) => eventList.setUpdateTitle(e.target.value)}
                               placeholder="Title"
                        />
                        <Input style={{width: "100%", marginTop: "10px"}}
                               type="text"
                               value={eventList.updateBody}
                               onChange={(e) => eventList.setUpdateBody(e.target.value)}
                               placeholder="Body"
                        />
                    </div>
                    <div className={cl.formBlock}>
                        <div className={cl.inputCheckbox}>
                            <input type="checkbox" checked={dateContext.checkbox} onChange={dateContext.checkboxController}/>
                        </div>
                        <div className={cl.inputCheckbox}>All day</div>
                    </div>
                </div>
                {
                    !dateContext.checkbox ?
                        <SelectedTime/> :
                        ''
                }
                <div className={cl.formBlock}>
                    <button className={classes.buttonStyles} style={{marginTop: "10px"}} onClick={eventList.openConfirmModal}>Update</button>
                    <button className={classes.buttonStyles} onClick={dateContext.openMembersModal}>Add members</button>
                </div>
            </Modal>
            <Modal className={classes.modalContainer} visible={dateContext.membersModal} setVisible={dateContext.setMembersModal}>
                <ListOfUsers/>
                    <button className={classes.buttonStyles} onClick={dateContext.closeMembersModal}>Add</button>
            </Modal>
        </div>
    );
};

export default EventUpdateWindow;