import React from 'react';
import cl from './Modal.module.css'
import Portal from "../Portal/Portal";
import classNames from "classnames";

const Modal = (props) => {
    const {children, visible, setVisible} = props
    const modalClasses = classNames(cl.myModalContent, props.className)
    const rootClasses = [cl.myModal, cl.active]
    const hideModal = () => setVisible(false);

    if (visible) {
        return (
            <Portal>
                <div className={rootClasses.join(' ')} onClick={hideModal}>
                    <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </Portal>
        );
    }

    return null;
};

export default Modal;