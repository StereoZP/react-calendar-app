import React, {useState} from 'react';
import Month from "./Month";
import {add, format, isSameDay} from "date-fns";
import classes from "./Calendar.module.css";
import {MyContext} from "../context";
import EventList from "./EventList";
import EventTitle from "./EventTitle";


const Calendar = () => {

    const startDay = new Date();

    const [day, setDay] = useState(startDay)
    const [month, setMonth] = useState(startDay)
    const [selected, setSelected] = useState(startDay)

    setInterval(() => {
        setDay(new Date())
    }, 1000)

    const prev = () => {
        setMonth(add(month,{months:-1}))
    }

    const next = () => {
        setMonth(add(month,{months:1}))
    }

    const [event, setEvent] = useState([{id: Date.now(), date:new Date(), title:'First event'}]);

    const createEvent = (newPost) => {
        setEvent([...event, newPost])
    }

    const usersByLikes = event.map((item, index) => {
        if(isSameDay(selected, item.date)){
            return <EventTitle key={index} eventTitle={item.title} number={index+1}/>
        }
    })


    return (
        <MyContext.Provider value={{selected, setSelected, month}}>
        <div className={classes.calendar}>
            <div className={classes.dateContainer}>
                <div className={classes.time}>{format(startDay,'kk')}:{format(startDay,'mm')}:{format(startDay, 'ss')}</div>
                <div className={classes.date}>{format(startDay,'EEEE')}, {format(startDay,'d')} {format(startDay,'MMMM')} {format(startDay,'y')}</div>
            </div>
            <div className={classes.dateAndSelectedMonthContainer}>
                <div className={classes.doubleContainer}>
                    <div className={classes.selectedMonth}>{format(month,'LLLL')} {format(month,'y')}</div>
                    <div>
                        <button style={{marginRight: 10}} onClick={prev}>&#5169;</button>
                        <button onClick={next}>&#5167;</button>
                    </div>
                </div>
                <Month/>
            </div>
                <EventList selectedDay={selected} createEvent={createEvent}/>
            <div> {
                usersByLikes
            }
            </div>
        </div>
        </MyContext.Provider>
    );
};

export default Calendar;