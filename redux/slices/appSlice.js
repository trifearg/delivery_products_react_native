import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        localization: '',
    },
    reducers: {
        updateLocalization: (state, action) => {
            state.localization = action.payload;
        },
    }
});


export const { updateLocalization } = appSlice.actions
