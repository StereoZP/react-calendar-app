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

    const {createEvent} = props

    const context = useContext(MyContext)
    const [post, setPost] = useState({title: '', checkbox:true,})
    const [modal, setModal] = useState(false)
    const {startDateForDatePiker: [startDate, setStartDate]} = context


    const addNewPost = (e) => {
        e.preventDefault()
        if (post.title.length > 0) {
            const newPost = {
                ...post,
                id: Date.now(),
                date: startDate.toISOString(),
                addDate: format(new Date(), 'y-MM-dd'),
                checkbox: true,
                startTime: format(context.startTime, 'HH:mm'),
                endTime: format(context.endTime, 'HH:mm'),
            }
            setPost({title: "", checkbox:true})
            createEvent(newPost);
            closeModal();
        }
        closeModal();
        console.log(post)
    }

    const closeModal = () => {
        setModal(false)
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required('Required'),
    })

    return (
        <div className={classes.doubleContainer}>
            <div
                className={classes.selectedDay}>{format(context.selected, 'EEEE')} {format(context.selected, 'd')}</div>
            <button onClick={() => setModal(true)}>
                +
            </button>
            <MyModal className={classes.modalContainer} visible={modal} setVisible={setModal}>
                <div className={classes.test}>
                    <MyInput
                        validationschema={validationSchema}
                        title={'title'}
                        value={post.title}
                        onChange={e => setPost({...post, title: e.target.value})}
                        type="text"
                        placeholder="Event"
                    />
                    <label>
                        <input type="checkbox" checked={post.checkbox} onChange={()=> setPost({...post, checked:false })}/>
                        Весь день
                    </label>
                </div>
                <div className={classes.test}>
                    <div>
                        Начало:
                        <DatePicker selected={context.startTime}
                                    onChange={(date) => context.setStartTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                        />
                    </div>
                    <div>
                        Конец:
                        <DatePicker selected={context.endTime}
                                    onChange={(date) => context.setEndTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                        />
                    </div>
                </div>
                <div className={classes.test}>
                    <div>Выбрать другую дату:</div>
                    <div><DatePicker selected={startDate}
                                onChange={(date) => setStartDate(date)}
                    />
                    </div>
                </div>
                <button onClick={addNewPost}>Add event</button>
            </MyModal>
        </div>
    );
};

export default EventForm;