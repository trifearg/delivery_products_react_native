import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
        // token: "", to do
        orders: [], // order: { orderNumber: number, status: string, totalAmount: number }
        location: ""
    },
    reducers: {
        updateLocation: (state, action) => {
            state.location = action.payload;
        }
    }
});


export const { updateLocation } = userSlice.actions
