import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../сontext";
import {format} from "date-fns";
import EventBoardOfMonth from "./EventBoardOfMonth/EventBoardOfMonth";
import {NEXT_MONTH, PREV_MONTH , SET_OPEN_BOARD_YEAR, SET_OPEN_BOARD_WEEK, SET_OPEN_BOARD_MONTH, SET_OPEN_BOARD_DAY} from "../../store/actions";
import cl from "./Board.module.css"
import classes from "../Calendar/Calendar.module.css"
import EventBoardOfWeek from "./EventBoardOfWeek/EventBoardOfWeek";
import EventBoardOfDay from "./EventBoardOfDay/EventBoardOfDay";
import EventBoardOfYear from "./EventBoardOfYear/EventBoardOfYear";



const Board = () => {
    const context = useContext(ApplicationContext)

    const selectBoard = context.state.openBoard.map((item,index)=>{
        if(item.day){
            return <EventBoardOfDay key={index}/>
        }
        if(item.week){
            return <EventBoardOfWeek key={index}/>
        }
        if(item.month){
            return <EventBoardOfMonth key={index}/>
        }
        if(item.year){
            return <EventBoardOfYear key={index}/>
        }
        return null;
    })



    return (
        <div className={cl.board}>
            <div className={classes.doubleContainer}>
                <div className={cl.monthSelection}>
                    <div>
                        <button className={classes.buttonStyles} onClick={()=>context.dispatch({ type: PREV_MONTH })}>&#5169;</button>
                        <button className={classes.buttonStyles} style={{paddingRight: "10px"}} onClick={()=>context.dispatch({type: NEXT_MONTH})}>&#5167;</button>
                    </div>
                    <div className={cl.nameOfMonth}>{format(context.state.month, 'LLLL y')}</div>
                </div>
                <div>
                    <button className={classes.buttonStyles} style={{paddingLeft:"10px"}} onClick={()=>context.dispatch({type:SET_OPEN_BOARD_DAY})}>Day</button>
                    <button className={classes.buttonStyles} style={{paddingLeft:"10px"}} onClick={()=>context.dispatch({type:SET_OPEN_BOARD_WEEK})}>Week</button>
                    <button className={classes.buttonStyles} style={{paddingLeft:"10px"}} onClick={()=>context.dispatch({type:SET_OPEN_BOARD_MONTH})}>Month</button>
                    <button className={classes.buttonStyles} style={{paddingLeft:"10px"}} onClick={()=>context.dispatch({type:SET_OPEN_BOARD_YEAR})}>Year</button>
                </div>
            </div>
            {selectBoard}
        </div>
    );
};

export default Board;