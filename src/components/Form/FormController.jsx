import React from 'react';
import {useContext, useState} from "react";
import {DateContext} from "../Context/dateContext";
import cl from "./Form.module.css";
import inpCl from "../UI/CustomInput/Input.module.css";
import {format,} from "date-fns";
import {EventFormContext} from "../Context/eventFormContext";
import {validationSchema} from "../../Validation/validationSchema";

const FormController = (props) => {
    const dateContext = useContext(DateContext)
    const [post, setPost] = useState({title: '',body:''})


    const blockStyles = [cl.formBlock, cl.topPadding].join(' ');
    const inputStylesBody = [(dateContext.errorBody !== null) ? inpCl.myInputErr : inpCl.myInput]
    const inputStylesTitle = [(dateContext.errorTitle !== null) ? inpCl.myInputErr : inpCl.myInput]

    const selectedMembers = dateContext.userSelectedTrue.map(user => ({
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
                    date: format(dateContext.startDate, 'y-MM-dd'),
                    checkbox:dateContext.checkbox,
                    startTime:(!dateContext.checkbox) ? format(dateContext.startDate, 'HH:mm') : null,
                    endTime:(!dateContext.checkbox) ? format(dateContext.endDate, 'HH:mm') : null,
                    members: selectedMembers,
                }
                dateContext.createEvent(newEvent);
                closeModal()
            })
            .catch((err) => {
                if(err.message === 'Add title' || err.message === 'Max size 10 letters'){
                    dateContext.setErrorTitle(new Error(err.message))
                }
                if(err.message === 'Add event'){
                    dateContext.setErrorBody(new Error(err.message))
                }
            });
    }

    const openModal = () =>{
        setPost({title: '', body: ''})
        dateContext.setModal(true)
        dateContext.setErrorTitle(null)
        dateContext.setErrorBody(null)
        dateContext.setCheckbox(true)
        dateContext.setStartDate(dateContext.selected)
        dateContext.setEndDate(dateContext.selected)
        dateContext.setUsers(dateContext.userSelectedFalse);
    }

    const closeModal = () => {
        dateContext.setModal(false)
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