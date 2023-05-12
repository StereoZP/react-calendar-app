import React, {useContext} from 'react';
import classes from '../Calendar/Calendar.module.css'
import cl from "../Form/Form.module.css"
import deleteIcon from "../../images/delete.png"
import updateIcon from "../../images/pencil.png"
import {DateContext} from "../Context/dateContext";
import EventTimeRange from "./EventTimeRange";


const EventItem = (props) => {

    const dateContext = useContext(DateContext)
    const {eventTitle, eventBody, event} = props

    const openUpdateModal = () => {
        dateContext.dispatch({type: 'setOpenUpdateModal', payload: {eventTitle, eventBody}})
    }

    const openDeleteModal = () => {
        dateContext.dispatch({type: 'setConfirmDeleteModal', payload: true})
    }

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
        </div>
    );
};

export default EventItem;