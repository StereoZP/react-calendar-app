import React from 'react';
import {useState, useContext} from "react";
import classes from "./Calendar.module.css";
import {format} from "date-fns";
import {MyContext} from "../context";
import MyModal from "./UI/MyModal/MyModal";
import MyInput from "./UI/MyInput/MyInput";


const EventForm = ({selectedDay, createEvent}) => {

    const [post, setPost] = useState({title: ''})
    const [modal, setModal] = useState(false)
    const context = useContext(MyContext)

    const addNewPost = (e) => {
        if (post.title.length>0){
            e.preventDefault()

            const newPost = {
                ...post,
                id: Date.now(),
                date: selectedDay.toISOString(),
            }
            setPost({title:""})
            createEvent(newPost);
            closeModal();
    }
        closeModal();
    }
    const closeModal = ()=>{
        setModal(false)
    }

    return (
        <div className={classes.doubleContainer}>
            <div className={classes.selectedDay}>{format(context.selected,'EEEE')} {format(context.selected,'d')}</div>
            <button onClick={() => setModal(true)}>
                +
            </button>
            <MyModal className={classes.container} visible={modal} setVisible={setModal}>
                    <MyInput
                        value={post.title}
                        onChange={e => setPost({...post, title: e.target.value})}
                        type="text"
                        placeholder="Event"
                    />
                <button onClick={addNewPost}>Add event</button>
            </MyModal>
        </div>
    );
};

export default EventForm;