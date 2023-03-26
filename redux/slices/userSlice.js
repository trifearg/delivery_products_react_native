import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
        // token: "", to do
        orders: [], // order: { orderNumber: number, status: string, totalAmount: number }
        location: "",
        isLoadingLocation: true
    },
    reducers: {
        updateLocation: (state, action) => {
            state.location = action.payload;
            state.isLoadingLocation = false;
        },
        updateLoadingLocation: (state, action) => {
            state.isLoadingLocation = action.payload;
        }
    }
});


export const { updateLocation, updateLoadingLocation } = userSlice.actions
