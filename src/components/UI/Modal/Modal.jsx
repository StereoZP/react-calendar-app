import React from 'react';
import cl from './Modal.module.css'

const Modal = (props) => {

    const {children, visible, setVisible,} = props

    const modalClasses = [cl.myModalContent, props.className].join(' ')
    const rootClasses = [cl.myModal]

    if (visible) {
        rootClasses.push(cl.active);
    }

    const showModal = ()=>{
        setVisible(false)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={showModal}>
            <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;