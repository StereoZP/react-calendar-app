import React from 'react';
import {format} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../UI/Modal/Modal";
import classes from "../Calendar/Calendar.module.css";
import FormController from "./FormController";
import EventModal from "./EventModal";
import {SET_ALL_DAY_EVENT, SET_MODAL} from "../../store/actions";

const EventForm = () => {
    return (
        <FormController>
            {(props) => {
                const {openModal, appContext} = props
                return <div className={classes.doubleContainer}>
                    <div className={classes.selectedDay}>{format(appContext.state.selected, 'EEEE d')}</div>
                    <button className={classes.buttonStyles} onClick={openModal}>
                        +
                    </button>
                    <Modal className={classes.modalContainer} visible={appContext.state.modal}
                           setVisible={() => appContext.dispatch({type: SET_MODAL})}>
                        <EventModal setCheckbox={() => appContext.dispatch({type: SET_ALL_DAY_EVENT})}/>
                    </Modal>
                </div>
            }
            }
        </FormController>
    );
};

export default EventForm;