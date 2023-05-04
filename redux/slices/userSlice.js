import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        userId: "",
        token: "",
        location: ""
    },
    reducers: {
        updateLocation: (state, action) => {
            state.location = action.payload;
        },
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        clearUser: (state, action) => {
            state.name = "";
            state.userId = "";
            state.token = "";
        }
    }
});


export const { updateLocation, setUser, clearUser } = userSlice.actions
