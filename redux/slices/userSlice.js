import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        userId: "",
        token: "",
        orders: [], // orders: { orderNumber: number, status: string, totalAmount: number }
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
    }
});


export const { updateLocation, setUser } = userSlice.actions
