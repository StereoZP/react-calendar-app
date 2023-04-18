import React from 'react';
import classes from "../Calendar/Calendar.module.css";
import Modal from "../UI/Modal/Modal";
import {useContext} from "react";
import {EventListContext} from "../Context/eventListContext";

const EventConfirmUpdateWindow = () => {
    const eventList = useContext(EventListContext)
    return (
        <div>
            <Modal className={classes.modalContainer} visible={eventList.confirmUpdateModal}
                   setVisible={eventList.setConfirmUpdateModal}>
                <p>Are you sure?</p>
                <div className={classes.doubleContainer}>
                    <button onClick={eventList.confirmUpdate}>Ok</button>
                    <button onClick={eventList.closeUpdateModal}>Cansel</button>
                </div>
            </Modal>
        </div>
    );
};

export default EventConfirmUpdateWindow;