import React from 'react';
import {useContext, useState} from "react";
import {DateContext} from "../Context/dateContext";
import cl from "./Form.module.css";
import inpCl from "../UI/CustomInput/CustomInput.module.css";
import {format,} from "date-fns";
import {EventFormContext} from "../Context/eventFormContext";
import {validationSchema} from "../Validation/validationSchema";

const FormController = (props) => {
    const dateContext = useContext(DateContext)
    const [post, setPost] = useState({title: '',body:''})
    const {startDateForDatePiker: [startDate, setStartDate],
        endDateForDatePiker: [endDate, setEndDate],} = dateContext

    const closeModal = () => {
        dateContext.setModal(false)
    }

    const blockStyles = [cl.formBlock, cl.topPadding].join(' ');
    const inputStylesBody = [(dateContext.errorBody !== null) ? inpCl.myInputErr : inpCl.myInput]
    const inputStylesTitle = [(dateContext.errorTitle !== null) ? inpCl.myInputErr : inpCl.myInput]

    const addNewPostAllDay = (e) => {
        e.preventDefault()
        validationSchema.validate(post)
            .then(() => {
                const newEvent = {
                    ...post,
                    id: Date.now(),
                    date: format(startDate, 'y-MM-dd'),
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

    const addNewPostRangeTime = (e) => {
        e.preventDefault()
        validationSchema.validate(post)
            .then(() => {
                const newPost = {
                    ...post,
                    id: Date.now(),
                    date: format(startDate, 'y-MM-dd'),
                    startTime:format(startDate, 'HH:mm'),
                    endTime:format(endDate, 'HH:mm'),
                }
                dateContext.createEvent(newPost);
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

    const addNewPost = (e)=>{
        if(dateContext.checkbox){
            addNewPostAllDay(e)
        }
        if(!dateContext.checkbox){
            addNewPostRangeTime(e)
        }
    }

    const checkboxController = () =>{
        if(dateContext.checkbox){
            dateContext.setCheckbox(false)
        }
        if(!dateContext.checkbox){
            dateContext.setCheckbox(true)
        }
    }

    const openModal = () =>{
        setPost({title: '', body: ''})
        dateContext.setModal(true)
        dateContext.setErrorTitle(null)
        dateContext.setErrorBody(null)
        dateContext.setCheckbox(true)
        setStartDate(dateContext.selected)
        setEndDate(dateContext.selected)
    }

    return (
        <div>
            <EventFormContext.Provider value={{
                inputStylesBody,
                inputStylesTitle,
                post,
                setPost,
                blockStyles,
                startDate,
                setStartDate,
                addNewPost,
                checkboxController,
            }}>
                {props.children({openModal, dateContext,})}
            </EventFormContext.Provider>
        </div>
    );
};

export default FormController;