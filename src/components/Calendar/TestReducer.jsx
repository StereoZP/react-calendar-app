import { useReducer } from 'react';

import React from 'react';
const initialState = { name: 'Taylor', age: 42 };


const TestReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    function reducer(state, action) {
        switch (action.type) {
            case 'incremented_age': {
                return {
                    name: state.name,
                    age: state.age + 1
                };
            }
            case 'changed_name': {
                return {
                    name: action.nextName,
                    age: state.age
                };
            }
        }
        throw Error('Unknown action: ' + action.type);
    }



    function handleButtonClick() {
        dispatch({ type: 'incremented_age' });
    }

    function handleInputChange(e) {
        dispatch({
            type: 'changed_name',
            nextName: e.target.value
        });
    }
    return (
        <div>
            <input
                value={state.name}
                onChange={handleInputChange}
            />
            <button onClick={handleButtonClick}>
                Increment age
            </button>
            <p>Hello, {state.name}. You are {state.age}.</p>
        </div>
    );
};

export default TestReducer;