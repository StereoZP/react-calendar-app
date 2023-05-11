import React from 'react';
import cl from './Modal.module.css'
import Portal from "../Portal/Portal";
import classNames from "classnames";

const Modal = (props) => {

    const {children, visible, setVisible,} = props

    const modalClasses = classNames(cl.myModalContent, props.className)
    const rootClasses = [cl.myModal]

    if (visible) {
        rootClasses.push(cl.active);
    }

    const showModal = () => {
        setVisible(false)
    }

    return (
        <Portal>
            <div className={rootClasses.join(' ')} onClick={showModal}>
                <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Modal;