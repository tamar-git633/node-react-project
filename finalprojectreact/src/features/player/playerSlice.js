import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const playerInitState = {
    token: localStorage.getItem("token") || "",
    isUserLoggdin: !!localStorage.getItem("token"),
};

const playerSlice = createSlice({
    name: "player",
    initialState: playerInitState,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.accessToken;
            const decoded = jwtDecode(token);
            state.token = token;
            state.isUserLoggdin = true;

            localStorage.setItem("token", token);
 
        },
        // clearToken: (state) => {
        //     state.token = "";
        //     state.isUserLoggdin = false;

        //     localStorage.removeItem("token");
        //     localStorage.removeItem("roles");
        // }
    }
});

export const { setToken } = playerSlice.actions;
export default playerSlice.reducer;