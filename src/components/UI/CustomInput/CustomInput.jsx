import React from 'react';
import classes from './CustomInput.module.css';

const CustomInput = React.forwardRef((props, ref) => {

    const stylesInput = [classes.myInput, props.className].join(' ')

    return (
        <input ref={ref} className={stylesInput} {...props}/>
    );
});

export default CustomInput;