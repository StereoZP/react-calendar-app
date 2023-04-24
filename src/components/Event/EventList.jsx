import React, {useContext} from 'react';
import classes from '../Calendar/Calendar.module.css'
import cl from "../Form/Form.module.css"
import {EventListContext} from "../Context/eventListContext";
import deleteIcon from "../../images/delete.png"
import updateIcon from "../../images/pencil.png"
import {DateContext} from "../Context/dateContext";
import ConfirmWindow from "./ConfirmWindow";
import EventUpdateWindow from "./EventUpdateWindow";
import EventTimeRange from "./EventTimeRange";


const EventList = () => {

    const eventList = useContext(EventListContext)
    const dateContext = useContext(DateContext)

    const members = eventList.members.map((item,index)=>{
         return <div key={index}>{item.firstName} {item.lastName};</div>})


    return (
        <div className={classes.eventContainer}>
            <div className={classes.eventTitlePosition}>{eventList.eventTitle}</div>
            <div className={cl.formBlock}>
                <div className={classes.eventTitle}>
                    <div>{eventList.eventBody}</div>
                </div>
                <EventTimeRange/>
            </div>
                {
                    eventList.members.length>0 ?
                        <div className={classes.members}>Members: {members}</div>: ""
                }
            <div className={cl.topPadding} style={{fontSize: "14px"}}>
                <div className={cl.updateAndDeleteContainer}>
                    <div>{eventList.addDate}</div>
                    <div>
                        <button className={cl.image} onClick={eventList.openUpdateModal}><img src={updateIcon}
                                                                                              alt="Update"/></button>
                        <button className={cl.image} onClick={()=>dateContext.openDeleteModal(eventList.event)}><img
                            src={deleteIcon} alt="Delete"/>
                        </button>
                    </div>
                </div>
                <EventUpdateWindow/>
                <ConfirmWindow visible={eventList.confirmUpdateModal}
                               setVisible={eventList.setConfirmUpdateModal}>
                    <p>Are you sure to update event?</p>
                    <div className={classes.doubleContainer}>
                        <button className={classes.buttonStyles} onClick={eventList.confirmUpdate}>Ok</button>
                        <button className={classes.buttonStyles} onClick={eventList.closeUpdateModal}>Cansel</button>
                    </div>
                </ConfirmWindow>
                <ConfirmWindow visible={dateContext.confirmDeleteModal}
                               setVisible={dateContext.setConfirmDeleteModal}>
                    <p>Are you sure to delete event?</p>
                    <div className={classes.doubleContainer}>
                        <button className={classes.buttonStyles} onClick={dateContext.removeEvent}>Ok</button>
                        <button className={classes.buttonStyles} onClick={dateContext.closeDeleteModal}>Cansel</button>
                    </div>
                </ConfirmWindow>
            </div>
        </div>
    );
};

export default EventList;