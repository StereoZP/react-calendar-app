import React from 'react';
import cl from './MyModal.module.css'

const MyModal = (props) => {

    const {children, visible, setVisible} = props

    const modalClasses = [cl.myModalContent, props.className].join(' ')
    const rootClasses = [cl.myModal]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;