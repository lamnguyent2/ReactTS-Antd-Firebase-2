const { createSlice } = require("@reduxjs/toolkit");

const ServicePackSlice = createSlice({
    name: "ServicePacks",
    initialState: [],
    reducers: {
        addServicePack(state:any, action:any) {
            state.unshift(action.payload);
        },
    },
});

const { actions, reducer } = ServicePackSlice;
export const { addDashboard } = actions;
export default reducer;