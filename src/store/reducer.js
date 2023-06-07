import {add, format} from "date-fns";
import {
    CLEAR_EVENTS, NEXT_MONTH, OPEN_MODAL, PREV_MONTH, REMOVE_EVENT, SET_ALL_DAY_EVENT,
    SET_DAY, SET_END_DAY, SET_ERROR, SET_ERROR_BODY, SET_ERROR_TITLE, SET_EVENT,
    SET_EVENTS, SET_FORM_CONTROLLER_ERRORS, SET_IS_LOADED, SET_MEMBERS, SET_MEMBERS_MODAL, SET_MODAL,
    SET_MONTH, SET_SELECTED, SET_START_DAY, SET_UPDATE_BODY, SET_UPDATE_TITLE, SET_UPDATE_TITLE_AND_BODY,
    UPDATE_EVENT, SET_OPEN_BOARD_DAY, SET_OPEN_BOARD_MONTH, SET_OPEN_BOARD_WEEK, SET_OPEN_BOARD_YEAR,OPEN_MODAL_BOARD_WEEK,
    SET_POST,
} from "./actions";

export function reducer(state, action) {
    switch (action.type) {
        case SET_DAY:
            return {...state, day: action.payload};
        case SET_MONTH:
            return {...state, month: action.payload};
        case SET_SELECTED:
            return {...state, selected: action.payload};
        case SET_START_DAY:
            return {...state, startDate: action.payload};
        case SET_END_DAY:
            return {...state, endDate: action.payload};
        case SET_EVENT:
            return {...state, events: [...state.events, action.payload], modal: false};
        case SET_EVENTS: {
            return {...state, events: [...state.events, ...action.payload]}
        }
        case UPDATE_EVENT:{
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
        case REMOVE_EVENT: {
            const remove = state.events.filter(p => p.id !== action.payload)
            return {...state, events: remove}
        }
        case CLEAR_EVENTS: {
            return {...state, events: []}
        }
        case SET_ERROR:
            return {...state, error: action.payload};
        case SET_IS_LOADED:
            return {...state, isLoaded: action.payload};
        case SET_MODAL:
            return {...state, modal: action.payload};
        case SET_UPDATE_TITLE_AND_BODY:
            return {...state, isAllDayEvent: true,
                updateBody: action.payload.eventBody, updateTitle: action.payload.eventTitle}
        case SET_UPDATE_TITLE:
            return {...state, updateTitle: action.payload};
        case SET_UPDATE_BODY:
            return {...state, updateBody: action.payload};
        case SET_MEMBERS_MODAL:
            return {...state, isUserModalOpen: action.payload};
        case SET_ALL_DAY_EVENT:
            return {...state, isAllDayEvent: action.payload};
        case SET_ERROR_TITLE:
            return {...state, errorTitle: new Error(action.payload)};
        case SET_ERROR_BODY:
            return {...state, errorBody: new Error(action.payload)};
        case SET_FORM_CONTROLLER_ERRORS:
            return {...state, formControllerErrors: action.payload};
        case SET_MEMBERS:
            return {...state, users: action.payload};
        case PREV_MONTH:
            return {...state, month: add(state.month, {months: -1})}
        case NEXT_MONTH:
            return {...state, month: add(state.month, {months: 1})}
        case SET_OPEN_BOARD_DAY:
            return {...state, openBoard: [{day:true}, {week:false}, {month:false}, {year:false}]}
        case SET_OPEN_BOARD_WEEK:
            return {...state, openBoard: [{day:false}, {week:true}, {month:false}, {year:false}]}
        case SET_OPEN_BOARD_MONTH:
            return {...state, openBoard: [{day:false}, {week:false}, {month:true}, {year:false}]}
        case SET_OPEN_BOARD_YEAR:
            return {...state, openBoard: [{day:false}, {week:false}, {month:false}, {year:true}]}
        case SET_POST:
            return {...state, post: action.payload};
        case OPEN_MODAL:
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
        case OPEN_MODAL_BOARD_WEEK:
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