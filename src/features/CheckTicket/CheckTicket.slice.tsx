const { createSlice } = require("@reduxjs/toolkit");

const CheckTicketSlice = createSlice({
    name: "CheckTickets",
    initialState: [],
    reducers: {
        addCheckTicket(state:any, action:any) {
            state.unshift(action.payload);
        },
    },
});

const { actions, reducer } = CheckTicketSlice;
export const { addDashboard } = actions;
export default reducer;