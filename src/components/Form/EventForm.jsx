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
                const {openModal, dateContext} = props
                return <div className={classes.doubleContainer}>
                    <div
                        className={classes.selectedDay}>{format(dateContext.selected, 'EEEE d')}</div>
                    <button onClick={openModal}>
                        +
                    </button>
                    <Modal className={classes.modalContainer} visible={dateContext.modal} setVisible={dateContext.setModal}>
                        <EventModal setCheckbox={dateContext.setCheckbox}/>
                    </Modal>
                </div>
                }
            }
        </FormController>
    );
};

export default EventForm;