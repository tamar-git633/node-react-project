import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authInitState = {
    token: localStorage.getItem("token") || "",
    isUserLoggdin: !!localStorage.getItem("token"),
    roles: localStorage.getItem("roles") || "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: authInitState,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.accessToken;
            const decoded = jwtDecode(token);
            const roles = decoded.roles || "";
            state.token = token;
            state.roles = roles;
            state.isUserLoggdin = true;

            localStorage.setItem("token", token);
            localStorage.setItem("roles", roles);
 
        },
        clearToken: (state) => {
            state.token = "";
            state.roles = "";
            state.isUserLoggdin = false;

            localStorage.removeItem("token");
            localStorage.removeItem("roles");
        }
    }
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;