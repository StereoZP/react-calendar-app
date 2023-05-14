import React, {useContext, useState} from 'react';
import classes from '../Calendar/Calendar.module.css'
import cl from "../Form/Form.module.css"
import deleteIcon from "../../images/delete.png"
import updateIcon from "../../images/pencil.png"
import {DateContext} from "../Context/dateContext";
import EventTimeRange from "./EventTimeRange";
import ConfirmWindow from "./ConfirmWindow";


const EventItem = (props) => {
    const {eventTitle, eventBody, event, removeEvent} = props
    const dateContext = useContext(DateContext)
    const [isOpen, setIsOpen] = useState(false)

    const openUpdateModal = () => {
        dateContext.dispatch({type: 'setOpenUpdateModal', payload: {eventTitle, eventBody}})
    }
    const openDeleteModal = () => setIsOpen(true);

    const listOfMembers = event.users.map((item, index) => {
        return <div key={index}>{item.firstName} {item.lastName};</div>
    })

    return (
        <div className={classes.eventContainer}>
            <div className={classes.eventTitlePosition}>{eventTitle}</div>
            <div className={cl.formBlock}>
                <div className={classes.eventTitle}>
                    <div>{eventBody}</div>
                </div>
                <EventTimeRange/>
            </div>
            {
                event.users.length > 0 ?
                    <div className={classes.users}>Members: {listOfMembers}</div> : ""
            }
            <div className={cl.topPadding} style={{fontSize: "14px"}}>
                <div className={cl.updateAndDeleteContainer}>
                    <div>{event.date}</div>
                    <div>
                        <button className={cl.image} onClick={openUpdateModal}><img src={updateIcon} alt="Update"/>
                        </button>
                        <button className={cl.image} onClick={openDeleteModal}><img
                            src={deleteIcon} alt="Delete"/>
                        </button>
                    </div>
                </div>
            </div>
            <ConfirmWindow visible={isOpen} setVisible={setIsOpen}>
                <p>Are you sure to delete event?</p>
                <div className={classes.doubleContainer}>
                    <button className={classes.buttonStyles} onClick={() => {removeEvent(event.id);setIsOpen(false);}}>Ok</button>
                    <button className={classes.buttonStyles} onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </ConfirmWindow>
        </div>
    );
};

export default EventItem;