import React from 'react';
import classes from "../Calendar/Calendar.module.css";
import Input from "../UI/CustomInput/Input";
import Modal from "../UI/Modal/Modal";
import {useContext} from "react";
import {DateContext} from "../Context/dateContext";
import cl from "../Form/Form.module.css";
import SelectedTime from "../Form/SelectedTime";
import ListOfUsers from "../Users/ListOfUsers";

const EventUpdateWindow = () => {

    const dateContext = useContext(DateContext)
    return (
        <div>
            <Modal className={classes.modalContainer} visible={dateContext.state.isUpdateEventModalOpen}
                   setVisible={()=>dateContext.dispatch({type:"setUpdateModal"})}>
                <div className={cl.inputBlock}>
                    <div>
                        <Input style={{width: "100%"}}
                               type="text"
                               value={dateContext.state.updateTitle}
                               onChange={(e) => dateContext.dispatch({type:"setUpdateTitle", payload:e.target.value})}
                               placeholder="Title"
                        />
                        <Input style={{width: "100%", marginTop: "10px"}}
                               type="text"
                               value={dateContext.state.updateBody}
                               onChange={(e) => dateContext.dispatch({type:"setUpdateBody", payload:e.target.value})}
                               placeholder="Body"
                        />
                    </div>
                    <div className={cl.formBlock}>
                        <div className={cl.inputCheckbox}>
                            <input type="checkbox" checked={dateContext.state.isAllDayEvent} onChange={dateContext.isAllDayEventController}/>
                        </div>
                        <div className={cl.inputCheckbox}>All day</div>
                    </div>
                </div>
                {
                    !dateContext.state.isAllDayEvent ?
                        <SelectedTime/> :
                        ''
                }
                <div className={cl.formBlock}>
                    <button className={classes.buttonStyles} style={{marginTop: "10px"}} onClick={dateContext.openConfirmModal}>Update</button>
                    <button className={classes.buttonStyles} onClick={dateContext.openMembersModal}>Add users</button>
                </div>
            </Modal>
            <Modal className={classes.modalContainer} visible={dateContext.state.isUserModalOpen} setVisible={()=>dateContext.dispatch({ type: 'setMembersModal'})}>
                <ListOfUsers/>
                    <button className={classes.buttonStyles} onClick={dateContext.closeMembersModal}>Add</button>
            </Modal>
        </div>
    );
};

export default EventUpdateWindow;