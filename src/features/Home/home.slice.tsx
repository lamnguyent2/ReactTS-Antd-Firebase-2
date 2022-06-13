const { createSlice } = require("@reduxjs/toolkit");

const HomeSlice = createSlice({
    name: "Homes",
    initialState: [],
    reducers: {
        addHome(state:any, action:any) {
            state.unshift(action.payload);
        },
    },
});

const { actions, reducer } = HomeSlice;
export const { addDashboard } = actions;
export default reducer;