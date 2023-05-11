import React from 'react';
import cl from "./Form.module.css";
import classes from "../Calendar/Calendar.module.css";
import Input from "../UI/CustomInput/Input";
import SelectedTime from "./SelectedTime";
import DatePicker from "react-datepicker";
import {useContext} from "react";
import {DateContext} from "../Context/dateContext";
import {EventFormContext} from "../Context/eventFormContext";
import Modal from "../UI/Modal/Modal";
import ListOfUsers from "../Users/ListOfUsers";
import inpCl from "../UI/CustomInput/Input.module.css";
import classNames from "classnames";


const EventModal = () => {
    const dateContext = useContext(DateContext)
    const event = useContext(EventFormContext)

    const blockStyles = classNames(cl.formBlock, cl.topPadding);

    const inputStylesTitle = classNames(inpCl.myInput,
        {
            [inpCl.myInputErr] : dateContext.state.formControllerErrors?.filter((err)=>err.path === 'title')
        })

    const inputStylesBody = classNames(inpCl.myInput,
        {
            [inpCl.myInputErr] : dateContext.state.formControllerErrors?.filter((err)=>err.path === 'body')
        })

    const renderedTitleErrors = dateContext.state.formControllerErrors?.filter((err)=>err.path === 'title').map((err, index)=><div key={index} style={{color: "red"}}>{err.message}</div>)
    const renderedBodyErrors = dateContext.state.formControllerErrors?.filter((err)=>err.path === 'body').map((err, index)=><div key={index} style={{color: "red"}}>{err.message}</div>)

    return (
        <div>
            <div className={cl.inputBlock}>
                <div style={{width:"100%"}}>
                    <Input
                        className={inputStylesTitle}
                        value={event.post.title}
                        onChange={(e) => event.setPost({...event.post, title: e.target.value})}
                        type="text"
                        placeholder="Title"
                        name="title"
                    />
                    {
                        renderedTitleErrors
                    }
                    <Input
                        className={inputStylesBody} style={{marginTop: "10px"}}
                        value={event.post.body}
                        onChange={(e) => event.setPost({...event.post, body: e.target.value})}
                        type="text"
                        placeholder="Event"
                        name="body"
                    />
                    {
                        renderedBodyErrors
                    }
                </div>
                <div className={cl.formBlock}>
                    <div className={cl.inputCheckbox}>
                        <input type="checkbox" checked={dateContext.state.isAllDayEvent}
                               onChange={dateContext.isAllDayEventController}/>
                    </div>
                    <div className={cl.inputCheckbox}>All day</div>
                </div>
            </div>
            {
                !dateContext.state.isAllDayEvent ?
                    <SelectedTime/> :
                    ''
            }
            <div className={blockStyles}>
                <div>Select another date:</div>
                <div>
                    <DatePicker selected={dateContext.state.startDate}
                                onChange={(date) => dateContext.dispatch({type: 'setStartDate', payload: date})}
                    />
                </div>
            </div>
            <div className={cl.formBlock}>
                <button className={classes.buttonStyles} onClick={event.addNewPost}>Add event</button>
                <button className={classes.buttonStyles} onClick={dateContext.openMembersModal}>Add users</button>
            </div>
            <Modal className={classes.modalContainer} visible={dateContext.state.isUserModalOpen}
                   setVisible={() => dateContext.dispatch({type: 'setMembersModal'})}>
                <ListOfUsers/>
                <button className={classes.buttonStyles} onClick={dateContext.closeMembersModal}>Add</button>
            </Modal>
        </div>
    );
};

export default EventModal;