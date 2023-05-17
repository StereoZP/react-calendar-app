import React, {useReducer} from "react";
import './App.css';
import Calendar from "./components/Calendar/Calendar";
import AppMenu from "./components/ApplicationMenu/AppMenu";
import {ApplicationContext} from "./сontext";
import {reducer} from "./store/reducer";
import initialState from "./store/store";


function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <ApplicationContext.Provider value={{state, dispatch}}>
                <AppMenu/>
                <Calendar/>
            </ApplicationContext.Provider>
        </div>
    );
}

export default App;
