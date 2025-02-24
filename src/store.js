import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice"
import timerReducer from "./slices/timerSlice"

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        timer: timerReducer
    }
})