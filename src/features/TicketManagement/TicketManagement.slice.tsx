const { createSlice } = require("@reduxjs/toolkit");

const TicketListSlice = createSlice({
    name: "TicketLists",
    initialState: [],
    reducers: {
        addTicketList(state:any, action:any) {
            state.unshift(action.payload);
        },
    },
});

const { actions, reducer } = TicketListSlice;
export const { addDashboard } = actions;
export default reducer;