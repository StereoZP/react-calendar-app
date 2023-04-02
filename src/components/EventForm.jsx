import React from 'react';
import {useState, useContext} from "react";
import classes from "./Calendar.module.css";
import {format} from "date-fns";
import {MyContext} from "../context";
import MyModal from "./UI/MyModal/MyModal";
import MyInput from "./UI/MyInput/MyInput";
import * as yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EventForm = (props) => {

    const {selectedDay, createEvent} =props

    const context = useContext(MyContext)
    const [post, setPost] = useState({title: ''})
    const [modal, setModal] = useState(false)
    const [startDate, setStartDate] = useState(context.selected)



    const addNewPost = (e) => {
        e.preventDefault()
        if (post.title.length>0){
            const newPost = {
                ...post,
                id: Date.now(),
                date:startDate.toISOString(),
                addDate: format(new Date(),'Pp'),
            }
            setPost({title:""})
            createEvent(newPost);
            closeModal();
            console.log(newPost)
    }
        closeModal();
    }


    const closeModal = ()=>{
        setModal(false)
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required('Required'),
    })

    const handleCalendarClose = () => console.log("Calendar closed");
    const handleCalendarOpen = () => console.log("Calendar opened");


    return (
        <div className={classes.doubleContainer}>
            <div className={classes.selectedDay}>{format(context.selected,'EEEE')} {format(context.selected,'d')}</div>
            <button onClick={() => setModal(true)}>
                +
            </button>
            <MyModal className={classes.container} visible={modal} setVisible={setModal}>
                    <MyInput
                        validationschema={validationSchema}
                        title={'title'}
                        value={post.title}
                        onChange={e => setPost({...post, title: e.target.value})}
                        type="text"
                        placeholder="Event"
                    />
                <DatePicker selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            />
                <button onClick={addNewPost}>Add event</button>
            </MyModal>
        </div>
    );
};

export default EventForm;