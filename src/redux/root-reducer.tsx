import { combineReducers } from "redux";
import ticketcheckReducer from "../features/CheckTicket/CheckTicket.slice";
import homecheckReducer from "../features/Home/home.slice";
import settingcheckReducer from "../features/Setting/Setting.slice";
import ticketlistReducer from "../features/TicketManagement/TicketManagement.slice";

const rootReducer = combineReducers({
    ticketchecks: ticketcheckReducer,
    homes: homecheckReducer,
    settings: settingcheckReducer,
    ticketmanagements: ticketlistReducer
});

export default rootReducer;