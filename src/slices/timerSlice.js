import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeOption: "pomodoro",
    breaksInInterval: 0,
    pomosRound: 0,
    breaksRound: 0,
    options: {
        pomodoro: {
            id: 0,
            time: 1500,
            isCountingDown: false,
            skip: false
        },
        shortBreak: {
            id: 1,
            time: 300,
            isCountingDown: false,
            skip: false
        },
        longBreak: {
            id: 2,
            time: 900,
            isCountingDown: false,
            skip: false
        }
    }
};

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        selectOption: (state, action) => {
            const { option } = action.payload
            const themes = {
                pomodoro: "redish",
                shortBreak: "greenish",
                longBreak: "blueish"
            }
            // Set theme
            document.querySelector('body').setAttribute('data-theme', themes[option])
            // Make option active
            state.activeOption = option
            // Reset timers of inactive options
            const keys = Object.keys(state.options).filter((key) => state.options[key] != option)
            keys.forEach((key) => {
                state.options[key] = {
                    ...state.options[key],
                    isCountingDown: false,
                    time: initialState.options[key].time,
                    skip: false
                }
            })
        },
        toggleCountingDown: (state, action) => {
            const { key, value } = action.payload
            const option = state.options[key]

            option.isCountingDown = value
        },
        updateTime: (state, action) => {
            const { key } = action.payload
            const option = state.options[key]

            if (option.time === 0) {
                option.time = 0
            } else {
                option.time = option.time -1;
            }
        },
        skipRound: (state, action) => {
            const { key } = action.payload
            const option = state.options[key]

            option.skip = true
        }, 
        handleBreaksInInterval: (state) => {
            if (state.breaksInInterval === 4) {
                state.breaksInInterval = 0
            } else {
                state.breaksInInterval = state.breaksInInterval +1;
            }
        },
        countPomosRound: (state) => {
            state.pomosRound = state.pomosRound +1
        },
        countBreaksRound: (state) => {
            state.breaksRound = state.breaksRound +1
        },
        resetPomosRound: (state) => {
            state.pomosRound = 0
        },
        resetBreaksRound: (state) => {
            state.breaksRound = 0
        }
    },
});

export const { selectOption, toggleCountingDown, updateTime, skipRound, handleBreaksInInterval,
    countPomosRound, countBreaksRound, resetPomosRound, resetBreaksRound } = timerSlice.actions
export default timerSlice.reducer