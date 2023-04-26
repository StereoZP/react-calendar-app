import React, {useReducer} from 'react';
import {useEffect, useMemo} from "react";
import {add, format, isSameDay, parseISO, setHours, setMinutes} from "date-fns";
import EventList from "../Event/EventList";
import {DateContext} from "../Context/dateContext";

const initialState = {
    day: new Date(),
    month: new Date(),
    selected: new Date(),
    startDate: setHours(setMinutes(new Date(), 0), 9),
    endDate: setHours(setMinutes(new Date(), 0), 9),
    event: [],
    error: null,
    isLoaded: false,
    deleteEvent: [],
    modal: false,
    confirmDeleteModal: false,
    updateModal: false,
    updateTitle: '',
    updateBody: '',
    confirmUpdateModal: false,
    membersModal: false,
    checkbox: true,
    errorTitle: null,
    errorBody: null,
    users: [
        {
            id: 1,
            firstName: "Alex",
            lastName: "Sumrii",
            email: "alex_sumrii@gmail.com",
            color: "#FF5733",
            selected: false
        },
        {
            id: 2,
            firstName: "Vladimir",
            lastName: "Ozirskiy",
            email: "vladimir_ozirskiy@gmail.com",
            color: "#900C3F",
            selected: false
        },
        {
            id: 3,
            firstName: "Stepan",
            lastName: "Bandera",
            email: "stepan_bandera@gmail.com",
            color: "#581845",
            selected: false
        },
    ]
};

function reducer(state, action) {
    switch (action.type) {
        case 'setDay':
            return {...state, day: action.payload};
        case 'setMonth':
            return {...state, month: action.payload};
        case 'setSelected':
            return {...state, selected: action.payload};
        case 'setStartDate':
            return {...state, startDate: action.payload};
        case 'setEndDate':
            return {...state, endDate: action.payload};
        case 'setEvent':
            return {...state, event: action.payload};
        case 'setError':
            return {...state, error: action.payload};
        case 'setIsLoaded':
            return {...state, isLoaded: action.payload};
        case 'setDeleteEvent':
            return {...state, deleteEvent: action.payload};
        case 'setModal':
            return {...state, modal: action.payload};
        case 'setConfirmDeleteModal':
            return {...state, confirmDeleteModal: action.payload};
        case 'setUpdateModal':
            return {...state, updateModal: action.payload};
        case 'setUpdateTitle':
            return {...state, updateTitle: action.payload};
        case 'setUpdateBody':
            return {...state, updateBody: action.payload};
        case 'setConfirmUpdateModal':
            return {...state, confirmUpdateModal: action.payload};
        case 'setMembersModal':
            return {...state, membersModal: action.payload};
        case 'setCheckbox':
            return {...state, checkbox: action.payload};
        case 'setErrorTitle':
            return {...state, errorTitle: action.payload};
        case 'setErrorBody':
            return {...state, errorBody: action.payload};
        case 'setUsers':
            return {...state, users: action.payload};
        case 'PREV_MONTH':
            return {month: add(state.month, {months: -1})}
        case 'NEXT_MONTH':
            return {month: add(state.month, {months: 1})}
        default:
            return state;
    }
}

const CalendarController = (props) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        /*setInterval(() => {
            setDay(new Date())
        }, 1000)*/

        const createEvent = (newEvent) => {
            dispatch({type: 'setEvent', payload: [...state.event, newEvent]})
        }

        const removeEvent = () => {
            dispatch({type: 'setEvent', payload: state.deleteEvent})
            dispatch({type: 'setConfirmDeleteModal', payload: false})
        }

        const openDeleteModal = (post) => {
            dispatch({type: 'setConfirmDeleteModal', payload: true})
            dispatch({type: 'setDeleteEvent', payload: state.event.filter(p => p.id !== post.id)})
        }

        const closeDeleteModal = () => {
            dispatch({type: 'setConfirmDeleteModal', payload: false})
        }

        const openMembersModal = () => {
            dispatch({type: 'setMembersModal', payload: true})
        }

        const closeMembersModal = () => {
            dispatch({type: 'setMembersModal', payload: false})
        }

        const openConfirmModal = () => {
            dispatch({type: 'setConfirmUpdateModal', payload: true})
            dispatch({type: 'setUpdateModal', payload: false})
        }

        const selectedUsers = state.users.filter(user => user.selected);
        const notSelectedUsers = state.users.map(user => {
            if (user.selected) {
                return {
                    ...user,
                    selected: !user.selected
                };
            }
            return user;
        });


        const checkboxController = () => {
            if (state.checkbox) {
                dispatch({type: 'setCheckbox', payload: false})
            }
            if (!state.checkbox) {
                dispatch({type: 'setCheckbox', payload: true})
            }
        }

        const usersEvent = state.event.map((item, index) => {
            if (isSameDay(state.selected, parseISO(item.date))) {
                return <EventList key={index} id={item.id} event={item} eventTitle={item.title} eventBody={item.body}
                                  addDate={item.date} startTime={item.startTime} endTime={item.endTime}
                                  members={item.members}/>
            }
        })

        const updateEvent = (id, newTitle, newBody, confirm) => {
            const updatedTitleAndBody = state.event.map((item) => {
                if (item.id === id && !state.checkbox && (item.selected || !item.selected)) {
                    return {
                        ...item,
                        title: newTitle,
                        body: newBody,
                        startTime: format(state.startDate, 'HH:mm'),
                        endTime: format(state.endDate, 'HH:mm'),
                        members: selectedUsers
                    }
                }
                if (item.id === id && state.checkbox && (item.selected || !item.selected)) {
                    return {
                        ...item,
                        title: newTitle,
                        body: newBody,
                        members: selectedUsers
                    }
                }
                return item
            })
            if (confirm) {
                dispatch({type: 'setEvent', payload: updatedTitleAndBody})
            }
        };
console.log(state.event)
        const dateCounts = useMemo(() => {
            return state.event.reduce((acc, obj) => {
                const date = obj.date;
                if (!acc[date]) {
                    acc[date] = 0;
                }
                acc[date]++;

                return acc;
            }, {})
        }, [state.event])

        useEffect(() => {
            try {
                async function getJson() {
                    const response = await fetch("/data.json")
                    if (response.status === 200) {
                        dispatch({type: 'setIsLoaded', payload: true})
                        const json = await response.json()
                        return dispatch({type: 'setEvent', payload: json});
                    }
                }

                getJson()
            } catch (err) {
                dispatch({type: 'setError', payload: new Error(err.message)})
            } finally {
                dispatch({type: 'setIsLoaded', payload: true})
            }
        }, [])

        return (
            <div>
                <DateContext.Provider value={{
                    createEvent,
                    removeEvent,
                    updateEvent,
                    openDeleteModal,
                    closeDeleteModal,
                    checkboxController,
                    openMembersModal,
                    closeMembersModal,
                    openConfirmModal,
                    selectedUsers,
                    notSelectedUsers,
                    dateCounts,
                    state, dispatch
                }}>
                    {props.children({usersEvent, state})}
                </DateContext.Provider>
            </div>
        );
    }
;

export default CalendarController;