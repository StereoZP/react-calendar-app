import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {

    const stylesInput = [classes.myInput, props.className].join(' ')

    return (
        <input ref={ref} className={stylesInput} {...props}/>
    );
});

export default Input;