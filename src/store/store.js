import {setHours, setMinutes} from "date-fns";

const initialState = {
    day: new Date(),
    month: new Date(),
    selected: new Date(),
    startDate: setHours(setMinutes(new Date(), 0), 9),
    endDate: setHours(setMinutes(new Date(), 0), 9),
    events: [],
    error: null,
    isLoaded: false,
    modal: false,
    updateTitle: '',
    updateBody: '',
    isUserModalOpen: false,
    isAllDayEvent: true,
    formControllerErrors: [],
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

export default initialState;



