import React, {useContext} from 'react';
import classes from '../Calendar/Calendar.module.css'
import cl from "../Form/Form.module.css"
import deleteIcon from "../../images/delete.png"
import updateIcon from "../../images/pencil.png"
import {DateContext} from "../Context/dateContext";
import ConfirmWindow from "./ConfirmWindow";
import EventUpdateWindow from "./EventUpdateWindow";
import EventTimeRange from "./EventTimeRange";

const EventList = (props) => {

    const dateContext = useContext(DateContext)
    const {eventTitle, eventBody, event} = props

    const openUpdateModal = () => {
        dateContext.dispatch({type: 'setOpenUpdateModal', payload: {eventTitle, eventBody}})
    }

    const confirmUpdate = () => {
        dateContext.dispatch({type: 'confirmUpdateModal'})
        dateContext.updateEvent(event.id, dateContext.state.updateTitle, dateContext.state.updateBody, true)
    }

    const closeUpdateModal = () => {
        dateContext.dispatch({type: 'confirmUpdateModal'})
        dateContext.updateEvent(event.id, eventTitle, eventBody, false)
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
                        <button className={cl.image} onClick={()=>dateContext.openDeleteModal(event.id)}><img
                            src={deleteIcon} alt="Delete"/>
                        </button>
                    </div>
                </div>
                <EventUpdateWindow/>
                <ConfirmWindow visible={dateContext.state.confirmUpdateModal}
                               setVisible={() => dateContext.dispatch({type: "setConfirmUpdateModal"})}>
                    <p>Are you sure to update event?</p>
                    <div className={classes.doubleContainer}>
                        <button className={classes.buttonStyles} onClick={confirmUpdate}>Ok</button>
                        <button className={classes.buttonStyles} onClick={closeUpdateModal}>Cansel</button>
                    </div>
                </ConfirmWindow>
                <ConfirmWindow visible={dateContext.state.confirmDeleteModal}
                               setVisible={() => dateContext.dispatch({type: "setConfirmDeleteModal"})}>
                    <p>Are you sure to delete event?</p>
                    <div className={classes.doubleContainer}>
                        <button className={classes.buttonStyles} onClick={() => dateContext.removeEvent(event.id)}>Ok
                        </button>
                        <button className={classes.buttonStyles} onClick={dateContext.closeDeleteModal}>Cansel</button>
                    </div>
                </ConfirmWindow>
            </div>
        </div>
    );
};

export default EventList;