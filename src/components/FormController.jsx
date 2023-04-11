import React from 'react';
import {useContext, useState} from "react";
import {DateContext} from "../dateContext";
import * as yup from "yup";
import cl from "./Form.module.css";
import inpCl from "./UI/MyInput/MyInput.module.css";
import {format} from "date-fns";
import {EventContext} from "../eventContext";

const FormController = (props) => {
    const dateContext = useContext(DateContext)
    const [post, setPost] = useState({title: ''})
    const [modal, setModal] = useState(false)
    const [errorTitle, setErrorTitle] = useState(null);
    const [checkbox, setCheckbox] = useState(true)
    const {startDateForDatePiker: [startDate, setStartDate]} = dateContext

    const validationSchema = yup.object().shape({
        title: yup.string().min(1, 'Добавьте событие!').required(),
    });

    const closeModal = () => {
        setModal(false)
        setStartDate(dateContext.selected)
        setErrorTitle(null)
    }

    const blockStyles = [cl.formBlock, cl.topPadding].join(' ');
    const inputStyles = [(errorTitle !== null) ? inpCl.myInputErr : inpCl.myInput]

    const addNewPost = (e) => {
        e.preventDefault()
        validationSchema.validate(post)
            .then(() => {
                const newPost = {
                    ...post,
                    id: Date.now(),
                    date: startDate.toISOString(),
                    addDate: format(new Date(), 'y-MM-dd'),
                }
                setPost({title: ""})
                dateContext.createEvent(newPost);
                closeModal()
            })
            .catch((err) => {
                setErrorTitle(new Error(err.message))
            });
    }
    return (
        <div>
            <EventContext.Provider value={{
                inputStyles,
                post,
                setPost,
                checkbox,
                blockStyles,
                startDate,
                setStartDate,
                addNewPost,
            }}>
                {props.children({dateContext, setModal, modal, setErrorTitle, setCheckbox,})}
            </EventContext.Provider>
        </div>
    );
};

export default FormController;