import React, {useContext} from 'react';
import classes from "../Calendar/Calendar.module.css";
import Modal from "../UI/Modal/Modal";
import {DateContext} from "../Context/dateContext";
import {EventListContext} from "../Context/eventListContext";

const EventConfirmDeleteWindow = () => {

    const dateContext = useContext(DateContext)
    const eventList =useContext(EventListContext)
    return (
        <div>
            <Modal className={classes.modalContainer} visible={dateContext.confirmDeleteModal}
                   setVisible={dateContext.setConfirmDeleteModal}>
                <p>Are you sure?</p>
                <div className={classes.doubleContainer}>
                    <button onClick={() =>dateContext.removeEvent(eventList.event)}>Ok</button>
                    <button onClick={dateContext.closeDeleteModal}>Cansel</button>
                </div>
            </Modal>
        </div>
    );
};

export default EventConfirmDeleteWindow;