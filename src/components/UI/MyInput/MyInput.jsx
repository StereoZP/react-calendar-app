import React from 'react';
import classes from './MyInput.module.css';

const MyInput = React.forwardRef((props, ref) => {
    const stylesInput = [classes.myInput, props.className].join(' ')


    return (
        <input ref={ref} className={stylesInput} {...props}/>
    );
});

export default MyInput;