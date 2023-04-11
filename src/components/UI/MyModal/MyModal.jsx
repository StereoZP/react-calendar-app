import React from 'react';
import cl from './MyModal.module.css'

const MyModal = (props) => {

    const {children, visible, setVisible, setCheckbox, setErrorTitle} = props

    const modalClasses = [cl.myModalContent, props.className].join(' ')
    const rootClasses = [cl.myModal]

    if (visible) {
        rootClasses.push(cl.active);
    }

    const showModal = ()=>{
        setVisible(false)
        setErrorTitle(null)
        setCheckbox(true)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={showModal}>
            <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;