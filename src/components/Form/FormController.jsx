import React from 'react';
import {useContext, useState} from "react";
import {DateContext} from "../Context/dateContext";
import cl from "./Form.module.css";
import inpCl from "../UI/CustomInput/Input.module.css";
import {format,} from "date-fns";
import {EventFormContext} from "../Context/eventFormContext";
import {validationSchema} from "../../validation/validationSchema";

const FormController = (props) => {
    const dateContext = useContext(DateContext)
    const [post, setPost] = useState({title: '',body:''})

    const blockStyles = [cl.formBlock, cl.topPadding].join(' ');
    const inputStylesBody = [(dateContext.state.errorBody !== null) ? inpCl.myInputErr : inpCl.myInput]
    const inputStylesTitle = [(dateContext.state.errorTitle !== null) ? inpCl.myInputErr : inpCl.myInput]

    const selectedMembers = dateContext.selectedUsers.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }))

    const addNewPost = (e) => {
        e.preventDefault()
        validationSchema.validate(post)
            .then(() => {
                const newEvent = {
                    ...post,
                    id: Date.now(),
                    date: format(dateContext.state.startDate, 'y-MM-dd'),
                    checkbox:dateContext.state.checkbox,
                    startTime:(!dateContext.state.checkbox) ? format(dateContext.state.startDate, 'HH:mm') : null,
                    endTime:(!dateContext.state.checkbox) ? format(dateContext.state.endDate, 'HH:mm') : null,
                    members: selectedMembers,
                }
                dateContext.createEvent(newEvent);
                closeModal()
            })
            .catch((err) => {
                if(err.message === 'Add title' || err.message === 'Max size 10 letters'){
                    dateContext.dispatch({type:"setErrorTitle", payload:new Error(err.message)})
                }
                if(err.message === 'Add event'){
                    dateContext.dispatch({type:"setErrorBody", payload:new Error(err.message)})
                }
            });
    }

    const openModal = () =>{
        setPost({title: '', body: ''})
        dateContext.dispatch({type:'setModal', payload:true})
        dateContext.dispatch({type:"setErrorTitle", payload:null})
        dateContext.dispatch({type:"setErrorBody", payload:null})
        dateContext.dispatch({ type: 'setCheckbox', payload: true})
        dateContext.dispatch({ type: 'setStartDate', payload: dateContext.state.selected})
        dateContext.dispatch({ type: 'setEndDate', payload: dateContext.state.selected})
        dateContext.dispatch({type:'setUsers', payload:dateContext.notSelectedUsers})
    }

    const closeModal = () => {
        dateContext.dispatch({type:'setModal', payload:false})
    }

    return (
        <div>
            <EventFormContext.Provider value={{
                inputStylesBody,
                inputStylesTitle,
                post,
                setPost,
                blockStyles,
                addNewPost,
            }}>
                {props.children({openModal, dateContext})}
            </EventFormContext.Provider>
        </div>
    );
};

export default FormController;