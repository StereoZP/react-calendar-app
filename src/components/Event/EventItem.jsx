import React, {useContext, useState} from 'react';
import classes from '../Calendar/Calendar.module.css'
import cl from "../Form/Form.module.css"
import deleteIcon from "../../images/delete.png"
import updateIcon from "../../images/pencil.png"
import EventTimeRange from "./EventTimeRange";
import ConfirmWindow from "./ConfirmWindow";
import {ApplicationContext} from "../../сontext";
import EventUpdateWindow from "./EventUpdateWindow";


const EventItem = (props) => {
    const {eventTitle, eventBody, event, removeEvent, updateEvent} = props
    const {state, dispatch} = useContext(ApplicationContext)

    const [isOpenRemove, setIsOpenRemove] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [isOpenConfirmUpdate, setIsOpenConfirmUpdate] = useState(false)

    const openUpdateModal = () => {
        setIsOpenUpdate(true)
        dispatch({type: 'setUpdateTitleAndBody', payload: {eventTitle, eventBody}})
    }
    const openDeleteModal = () => setIsOpenRemove(true);
    const openConfirmUpdateModal = () => setIsOpenConfirmUpdate(true)

    const confirmUpdate = (id) => {
        setIsOpenUpdate(false)
        updateEvent(id, state.updateTitle, state.updateBody)
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
                <EventTimeRange event={event}/>
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
            <EventUpdateWindow isOpenUpdate={isOpenUpdate} setIsOpenUpdate={setIsOpenUpdate} openConfirmModal={openConfirmUpdateModal}/>
            <ConfirmWindow visible={isOpenConfirmUpdate}
                           setVisible={setIsOpenConfirmUpdate}>
                <p>Are you sure to update event?</p>
                <div className={classes.doubleContainer}>
                    <button className={classes.buttonStyles} onClick={()=>{confirmUpdate(event.id); setIsOpenConfirmUpdate(false);}}>Ok</button>
                    <button className={classes.buttonStyles} onClick={()=> setIsOpenConfirmUpdate(false)}>Cancel</button>
                </div>
            </ConfirmWindow>
            <ConfirmWindow visible={isOpenRemove} setVisible={setIsOpenRemove}>
                <p>Are you sure to delete event?</p>
                <div className={classes.doubleContainer}>
                    <button className={classes.buttonStyles} onClick={() => {removeEvent(event.id); setIsOpenRemove(false);}}>Ok</button>
                    <button className={classes.buttonStyles} onClick={() => setIsOpenRemove(false)}>Cancel</button>
                </div>
            </ConfirmWindow>
        </div>
    );
};

export default EventItem;