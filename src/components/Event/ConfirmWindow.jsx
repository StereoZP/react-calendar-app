import React from 'react';
import classes from "../Calendar/Calendar.module.css";
import Modal from "../UI/Modal/Modal";


const ConfirmWindow = (props) => {

    const {children, visible, setVisible,} = props

    return (
        <Modal className={classes.modalContainer} visible={visible}
               setVisible={setVisible}>
            {children}
        </Modal>
    );
};

export default ConfirmWindow;