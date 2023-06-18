import {add, format} from "date-fns";
import * as ACTIONS from "./actions";

export function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_DAY:
            return {...state, day: action.payload};
        case ACTIONS.SET_MONTH:
            return {...state, month: action.payload};
        case ACTIONS.SET_SELECTED:
            return {...state, selected: action.payload};
        case ACTIONS.SET_START_DAY:
            return {...state, startDate: action.payload};
        case ACTIONS.SET_END_DAY:
            return {...state, endDate: action.payload};
        case ACTIONS.SET_EVENT:
            return {...state, events: [...state.events, action.payload], modal: false};
        case ACTIONS.SET_EVENTS: {
            return {...state, events: [...state.events, ...action.payload]}
        }
        case ACTIONS.UPDATE_EVENT:{
            const selectedUsers = state.users?.filter(user => user.selected);
            const updateEvent = state.events.map((item)=>{
                if (item.id === action.payload.id && !state.isAllDayEvent) {
                    return {
                        ...item,
                        title: action.payload.updateTitle,
                        body: action.payload.updateBody,
                        startTime: format(state.startDate, 'HH:mm'),
                        endTime: format(state.endDate, 'HH:mm'),
                        users: selectedUsers
                    }
                }
                if (item.id === action.payload.id && state.isAllDayEvent ) {
                    return {
                        ...item,
                        title: action.payload.updateTitle,
                        body: action.payload.updateBody,
                        users: selectedUsers
                    }
                }
                return item
            })
            return {...state, events: updateEvent}
        }
        case ACTIONS.REMOVE_EVENT: {
            const remove = state.events.filter(p => p.id !== action.payload)
            return {...state, events: remove}
        }
        case ACTIONS.CLEAR_EVENTS: {
            return {...state, events: []}
        }
        case ACTIONS.SET_ERROR:
            return {...state, error: action.payload};
        case ACTIONS.SET_IS_LOADED:
            return {...state, isLoaded: action.payload};
        case ACTIONS.SET_MODAL:
            return {...state, modal: action.payload};
        case ACTIONS.SET_UPDATE_TITLE_AND_BODY:
            return {...state, isAllDayEvent: true,
                updateBody: action.payload.eventBody, updateTitle: action.payload.eventTitle}
        case ACTIONS.SET_UPDATE_TITLE:
            return {...state, updateTitle: action.payload};
        case ACTIONS.SET_UPDATE_BODY:
            return {...state, updateBody: action.payload};
        case ACTIONS.SET_MEMBERS_MODAL:
            return {...state, isUserModalOpen: action.payload};
        case ACTIONS.SET_ALL_DAY_EVENT:
            return {...state, isAllDayEvent: action.payload};
        case ACTIONS.SET_ERROR_TITLE:
            return {...state, errorTitle: new Error(action.payload)};
        case ACTIONS.SET_ERROR_BODY:
            return {...state, errorBody: new Error(action.payload)};
        case ACTIONS.SET_FORM_CONTROLLER_ERRORS:
            return {...state, formControllerErrors: action.payload};
        case ACTIONS.SET_MEMBERS:
            return {...state, users: action.payload};
        case ACTIONS.PREV_MONTH:
            return {...state, month: add(state.month, {months: -1})}
        case ACTIONS.NEXT_MONTH:
            return {...state, month: add(state.month, {months: 1})}
        case ACTIONS.SET_POST:
            return {...state, post: action.payload};
        case ACTIONS.SET_CALENDAR_MODE:
            return {...state, calendarMode:action.payload}
        case ACTIONS.OPEN_MODAL:
            const notSelected = state.users?.map(user => {
                if (user.selected) {
                    return {
                        ...user,
                        selected: !user.selected
                    };
                }
                return user;
            });
            return {
                ...state,
                post:{title: '', body: ''},
                modal: true,
                formControllerErrors: null,
                isAllDayEvent: true,
                startDate: state.selected,
                endDate: state.selected,
                users: notSelected
            }
        case ACTIONS.OPEN_MODAL_BOARD_WEEK:
            const notSelectedUsers = state.users?.map(user => {
                if (user.selected) {
                    return {
                        ...user,
                        selected: !user.selected
                    };
                }
                return user;
            });
            return {
                ...state,
                post:{title: '', body: ''},
                modal: true,
                formControllerErrors: null,
                isAllDayEvent: false,
                startDate: action.payload,
                endDate: action.payload,
                users: notSelectedUsers
            }
        default:
            return state;
    }
}