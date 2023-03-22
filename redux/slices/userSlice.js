import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
        // token: "", to do
        orders: [], // order: { orderNumber: number, status: string, totalAmount: number }
        location: ""
    }
});

