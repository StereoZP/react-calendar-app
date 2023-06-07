import React, {useReducer} from "react";
import './App.css';
import Calendar from "./components/Calendar/Calendar";
import AppMenu from "./components/ApplicationMenu/AppMenu";
import {ApplicationContext} from "./сontext";
import {reducer} from "./store/reducer";
import initialState from "./store/store";
import Board from "./components/Board/Board";


function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <ApplicationContext.Provider value={{state, dispatch}}>
                <AppMenu/>
                <div style={{display:'flex'}}>
                    <Calendar/>
                    <Board/>
                </div>
            </ApplicationContext.Provider>
        </div>
    );
}

export default App;
