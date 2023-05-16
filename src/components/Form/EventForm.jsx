import React from 'react';
import {format} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../UI/Modal/Modal";
import classes from "../Calendar/Calendar.module.css";
import FormController from "./FormController";
import EventModal from "./EventModal";

const EventForm = () => {
    return (
        <FormController>
            {(props) => {
                const {openModal, appContext} = props
                return <div className={classes.doubleContainer} style={{border: "1px solid rgb(100, 100, 100)"}}>
                    <div className={classes.selectedDay}>{format(appContext.state.selected, 'EEEE d')}</div>
                    <button className={classes.buttonStyles} onClick={openModal}>
                        +
                    </button>
                    <Modal className={classes.modalContainer} visible={appContext.state.modal}
                           setVisible={() => appContext.dispatch({type: 'setModal'})}>
                        <EventModal setCheckbox={() => appContext.dispatch({type: "setAllDayEvent"})}/>
                    </Modal>
                </div>
            }
            }
        </FormController>
    );
};

export default EventForm;