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
    const {eventTitle, eventBody, addDate, event, id, members} = props

    const openUpdateModal = () => {
        dateContext.dispatch({ type: 'setCheckbox', payload: true})
        dateContext.dispatch({ type: 'setUpdateModal', payload: true})
        dateContext.dispatch({ type: 'setUpdateTitle', payload: eventTitle})
        dateContext.dispatch({ type: 'setUpdateBody', payload: eventBody})
    }

    const confirmUpdate = () =>{
        dateContext.dispatch({ type: 'setConfirmUpdateModal', payload: false})
        dateContext.dispatch({ type: 'setUpdateModal', payload: false})
        dateContext.updateEvent(id, dateContext.state.updateTitle, dateContext.state.updateBody,true)
    }

    const closeUpdateModal = () => {
        dateContext.dispatch({ type: 'setUpdateModal', payload: false})
        dateContext.dispatch({ type: 'setConfirmUpdateModal', payload: false})
        dateContext.updateEvent(id, eventTitle, eventBody, false)
    }

    const listOfMembers = members.map((item,index)=>{
         return <div key={index}>{item.firstName} {item.lastName};</div>})

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
                    members.length>0 ?
                        <div className={classes.members}>Members: {listOfMembers}</div>: ""
                }
            <div className={cl.topPadding} style={{fontSize: "14px"}}>
                <div className={cl.updateAndDeleteContainer}>
                    <div>{addDate}</div>
                    <div>
                        <button className={cl.image} onClick={openUpdateModal}><img src={updateIcon} alt="Update"/></button>
                        <button className={cl.image} onClick={()=>dateContext.openDeleteModal(event)}><img
                            src={deleteIcon} alt="Delete"/>
                        </button>
                    </div>
                </div>
                <EventUpdateWindow/>
                <ConfirmWindow visible={dateContext.state.confirmUpdateModal}
                               setVisible={()=>dateContext.dispatch({type:"setConfirmUpdateModal"})}>
                    <p>Are you sure to update event?</p>
                    <div className={classes.doubleContainer}>
                        <button className={classes.buttonStyles} onClick={confirmUpdate}>Ok</button>
                        <button className={classes.buttonStyles} onClick={closeUpdateModal}>Cansel</button>
                    </div>
                </ConfirmWindow>
                <ConfirmWindow visible={dateContext.state.confirmDeleteModal}
                               setVisible={()=>dateContext.dispatch({type:"setConfirmDeleteModal"})}>
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