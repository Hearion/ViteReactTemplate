import { configureStore } from '@reduxjs/toolkit';
import appSlice from "@/store/app/appSlice.js";

export const store = configureStore({
    reducer: {
        appData: appSlice
    },
})
