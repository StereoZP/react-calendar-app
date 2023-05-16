import {add, format} from "date-fns";
import {CLEAR_EVENTS, SET_EVENTS} from "./actions";

export function reducer(state, action) {
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
            return {...state, events: [...state.events, action.payload]};
        case SET_EVENTS: {
            return {...state, events: [...state.events, ...action.payload]}
        }
        case 'UPDATE_EVENT':{
            const updateEvent = state.events.map((item)=>{
                if (item.id === action.payload.id && !state.isAllDayEvent) {
                    return {
                        ...item,
                        title: action.payload.updateTitle,
                        body: action.payload.updateBody,
                        startTime: format(state.startDate, 'HH:mm'),
                        endTime: format(state.endDate, 'HH:mm'),
                        users: action.payload.selectedUsers
                    }
                }
                if (item.id === action.payload.id && state.isAllDayEvent ) {
                    return {
                        ...item,
                        title: action.payload.updateTitle,
                        body: action.payload.updateBody,
                        users: action.payload.selectedUsers
                    }
                }
                return item
            })
            return {...state, events: updateEvent}
        }
        case 'removeEvent': {
            const remove = state.events.filter(p => p.id !== action.payload)
            return {...state, events: remove}
        }
        case CLEAR_EVENTS: {
            return {...state, events: []}
        }
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
        case 'setUpdateTitleAndBody':
            return {...state, isAllDayEvent: true,
                updateBody: action.payload.eventBody, updateTitle: action.payload.eventTitle}
        case 'setUpdateTitle':
            return {...state, updateTitle: action.payload};
        case 'setUpdateBody':
            return {...state, updateBody: action.payload};
        case 'setMembersModal':
            return {...state, isUserModalOpen: action.payload};
        case 'setAllDayEvent':
            return {...state, isAllDayEvent: action.payload};
        case 'setErrorTitle':
            return {...state, errorTitle: new Error(action.payload)};
        case 'setErrorBody':
            return {...state, errorBody: new Error(action.payload)};
        case 'setFormControllerErrors':
            return {...state, formControllerErrors: action.payload};
        case 'setMembers':
            return {...state, users: action.payload};
        case 'PREV_MONTH':
            return {...state, month: add(state.month, {months: -1})}
        case 'NEXT_MONTH':
            return {...state, month: add(state.month, {months: 1})}
        case 'openModal':
            return {
                ...state,
                modal: true,
                formControllerErrors: null,
                isAllDayEvent: true,
                startDate: state.selected,
                endDate: state.selected,
                users: action.payload
            }
        default:
            return state;
    }
}