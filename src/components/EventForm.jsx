import React from 'react';
import {format} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import MyModal from "./UI/MyModal/MyModal";
import classes from "./Calendar.module.css";
import FormController from "./FormController";
import EventModalForm from "./EventModalForm";


const EventForm = () => {
    return (
        <FormController>
            {(props) => {
                const {dateContext, setModal, modal, setErrorTitle, setCheckbox,} = props
                return <div className={classes.doubleContainer}>
                    <div
                        className={classes.selectedDay}>{format(dateContext.selected, 'EEEE d')}</div>
                    <button onClick={() => setModal(true)}>
                        +
                    </button>
                    <MyModal className={classes.modalContainer} visible={modal} setVisible={setModal}
                             setErrorTitle={setErrorTitle} setCheckbox={setCheckbox}>
                        <EventModalForm setCheckbox={setCheckbox}/>
                    </MyModal>
                </div>
                }
            }
        </FormController>
    );
};

export default EventForm;