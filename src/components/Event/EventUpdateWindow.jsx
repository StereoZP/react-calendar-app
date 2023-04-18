import React from 'react';
import classes from "../Calendar/Calendar.module.css";
import CustomInput from "../UI/CustomInput/CustomInput";
import Modal from "../UI/Modal/Modal";
import {useContext} from "react";
import {EventListContext} from "../Context/eventListContext";

const EventUpdateWindow = () => {
    const eventList = useContext(EventListContext)
    return (
        <div>
            <Modal className={classes.modalContainer} visible={eventList.updateModal}
                   setVisible={eventList.setUpdateModal}>
                <CustomInput style={{width: "100%"}}
                             type="text"
                             value={eventList.updateTitle}
                             onChange={(e) => eventList.setUpdateTitle(e.target.value)}
                             placeholder="Title"
                />
                <CustomInput style={{width: "100%", marginTop: "10px"}}
                             type="text"
                             value={eventList.updateBody}
                             onChange={(e) => eventList.setUpdateBody(e.target.value)}
                             placeholder="Body"
                />
                <button style={{marginTop: "10px"}} onClick={eventList.openConfirmModal}>Update
                </button>
            </Modal>
        </div>
    );
};

export default EventUpdateWindow;