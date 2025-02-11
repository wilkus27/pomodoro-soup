import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTasks: [],
    finishedPomodoros: 0,
    completed: false,
    selected: false,
    currentTaskId: null,
    currentTaskName: "Time to focus!"
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { name, estPomodoros } = action.payload
            state.allTasks.push({
                id: crypto.randomUUID(),
                name: name,
                estPomodoros: estPomodoros,
                finishedPomodoros: initialState.finishedPomodoros,
                completed: initialState.completed,
                selected: initialState.selected
            })
        },
        editTask: (state, action) => {
            const { id, newName, newEstPomodoros, newFinishedPomodoros} = action.payload
            state.allTasks = state.allTasks.map((task) => {
                return (task.id === id) 
                    ? {
                        ...task,
                        name: newName,
                        estPomodoros: newEstPomodoros,
                        finishedPomodoros: newFinishedPomodoros
                      }
                    : task
            })

            if (state.currentTaskId === id) {
                state.currentTaskName = newName
            }
        },
        selectTask: (state, action) => {
            const { id, name } = action.payload
            state.allTasks = state.allTasks.map((currentTask) => {
                return (currentTask.id === id)
                    ? {...currentTask, selected: true}
                    : {...currentTask, selected: false}
            })
            state.currentTaskId = id
            state.currentTaskName = name
        },
        completeTask: (state, action) => {
            const { id } = action.payload
            state.allTasks = state.allTasks.map((currentTask) => {
                return (currentTask.id === id)
                    ? {...currentTask, completed: !currentTask.completed}
                    : currentTask
            })
        },
        deleteTask: (state, action) => {
            const { id } = action.payload
            state.allTasks = state.allTasks.filter(task => task.id !== id)
        }
    }
});

export const { addTask, editTask, selectTask, completeTask, deleteTask } = taskSlice.actions
export default taskSlice.reducer