import React, {useContext} from 'react';
import classes from '../Calendar/Calendar.module.css'
import cl from "../Form/Form.module.css"
import {EventListContext} from "../Context/eventListContext";
import deleteIcon from "../../images/delete.png"
import updateIcon from "../../images/pencil.png"
import {DateContext} from "../Context/dateContext";
import EventConfirmUpdateWindow from "./EventConfirmUpdateWindow";
import EventUpdateWindow from "./EventUpdateWindow";
import EventTimeRange from "./EventTimeRange";
import EventConfirmDeleteWindow from "./EventConfirmDeleteWindow";

const EventList = () => {

    const eventList = useContext(EventListContext)
    const dateContext = useContext(DateContext)

    return (
        <div className={classes.eventContainer}>
            <div className={classes.eventTitlePosition}>{eventList.eventTitle}</div>
            <div className={cl.formBlock}>
                <div className={classes.eventTitle}>
                    <div>{eventList.eventBody}</div>
                </div>
                <EventTimeRange/>
            </div>
            <div className={cl.topPadding} style={{fontSize: "14px"}}>
                <div className={cl.updateAndDeleteContainer}>
                    <div>{eventList.addDate}</div>
                    <div>
                        <button className={cl.image} onClick={eventList.openUpdateModal}><img src={updateIcon} alt="Update"/></button>
                        <button className={cl.image} onClick={()=>dateContext.openDeleteModal(eventList.event)}><img src={deleteIcon} alt="Delete"/>
                        </button>
                    </div>
                </div>
                <EventUpdateWindow/>
                <EventConfirmUpdateWindow/>
                <EventConfirmDeleteWindow/>
            </div>
        </div>
    );
};

export default EventList;