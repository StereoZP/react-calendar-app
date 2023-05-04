import {add} from "date-fns";

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
        case 'removeEvent':
            const test = state.events.filter(p => p.id !== action.payload)
            return {...state, events: test}
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
            return {...state, isUpdateEventModalOpen: action.payload};
        case 'setOpenUpdateModal':
            return {
                ...state, isAllDayEvent: true, isUpdateEventModalOpen: true,
                updateBody: action.payload.eventBody, updateTitle: action.payload.eventTitle
            }
        case 'setUpdateTitle':
            return {...state, updateTitle: action.payload};
        case 'setUpdateBody':
            return {...state, updateBody: action.payload};
        case 'setConfirmUpdateModal':
            return {...state, confirmUpdateModal: action.payload};
        case 'setMembersModal':
            return {...state, isUserModalOpen: action.payload};
        case 'setAllDayEvent':
            return {...state, isAllDayEvent: action.payload};
        case 'setErrorTitle':
            return {...state, errorTitle: action.payload};
        case 'setErrorBody':
            return {...state, errorBody: action.payload};
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
                errorTitle: null,
                errorBody: null,
                isAllDayEvent: true,
                startDate: state.selected,
                endDate: state.selected,
                users: action.payload
            }
        default:
            return state;
    }
}