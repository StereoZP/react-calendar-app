import React from 'react';
import {useState, useContext} from "react";
import {format, isToday} from "date-fns";
import * as yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DateContext} from "../dateContext";
import {TimeContext} from "../timeContext";
import MyModal from "./UI/MyModal/MyModal";
import MyInput from "./UI/MyInput/MyInput";
import SelectedTime from "./SelectedTime";
import classes from "./Calendar.module.css";
import cl from "./Form.module.css"


const EventForm = (props) => {

    const {createEvent} = props

    const dateContext = useContext(DateContext)
    const timeContext = useContext(TimeContext)

    const [post, setPost] = useState({title: '', checkbox: true,})
    const [modal, setModal] = useState(false)
    const {startDateForDatePiker: [startDate, setStartDate]} = dateContext


    const addNewPost = (e) => {
        e.preventDefault()
        if (post.title.length > 0) {
            const newPost = {
                ...post,
                id: Date.now(),
                date: startDate.toISOString(),
                addDate: format(new Date(), 'y-MM-dd'),
                checkbox: true,
                startTime: format(timeContext.startTime, 'HH:mm'),
                endTime: format(timeContext.endTime, 'HH:mm'),
            }
            setPost({title: "", checkbox: true})
            createEvent(newPost);
            closeModal();
        }
        closeModal();
    }

    const closeModal = () => {
        setModal(false)
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required('Required'),
    })

    const changeCheckboxStatus = () => {
        if (post.checkbox) {
            setPost({...post, checkbox: false})
        }
        if (!post.checkbox) {
            setPost({...post, checkbox: true})
        }
    }

    const blockStyles = [cl.formBlock, cl.topPadding].join(' ');

    return (
        <div className={classes.doubleContainer}>
            <div
                className={classes.selectedDay}>{format(dateContext.selected, 'EEEE d')}</div>
            <button onClick={() => setModal(true)}>
                +
            </button>
            <MyModal className={classes.modalContainer} visible={modal} setVisible={setModal}>
                <div className={cl.formBlock}>
                    <MyInput
                        validationschema={validationSchema}
                        title={'title'}
                        value={post.title}
                        onChange={e => setPost({...post, title: e.target.value})}
                        type="text"
                        placeholder="Event"
                    />
                    <div className={cl.formBlock}>
                        <div className={cl.inputCheckbox}>
                            <input type="checkbox" checked={post.checkbox} onChange={changeCheckboxStatus}/>
                        </div>
                        <div className={cl.inputCheckbox}>Весь день</div>
                    </div>
                </div>
                {
                    !post.checkbox ?
                        <SelectedTime/> :
                        ''
                }
                <div className={blockStyles}>
                    <div>Выбрать другую дату:</div>
                    <div>
                        <DatePicker selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                        />
                    </div>

                </div>
                <button className={cl.topPadding} onClick={addNewPost}>Add event</button>
            </MyModal>
        </div>
    );
};

export default EventForm;