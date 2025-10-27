import { createSlice } from "@reduxjs/toolkit";

const actorInitState = {
    name: localStorage.getItem("name"),
};

const actorSlice = createSlice({
    name: "actor",
    initialState: actorInitState,
    reducers: {
        setActor: (state, action) => {
            state.name = action.payload
            localStorage.setItem("name", action.payload);
        },
    }
});

export const { setActor } = actorSlice.actions;
export default actorSlice.reducer;