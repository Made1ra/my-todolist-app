import { createSlice, configureStore, createSelector } from '@reduxjs/toolkit';

type Task = {
    id: string;
    value: string;
    isCompleted: boolean;
}

const todolistSlice = createSlice({
    name: 'todolist',
    initialState: {
        tasks: [] as Task[]
    },
    reducers: {
        addTask: (state, action: { payload: Task }) => {
            state.tasks.push(action.payload);
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            state.tasks[index] = {
                ...state.tasks[index],
                value: action.payload.value
            };
        },
        toggleTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            state.tasks[index] = {
                ...state.tasks[index],
                isCompleted: !action.payload.isCompleted
            };
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        }
    }
});

export const { addTask, editTask, toggleTask, removeTask } = todolistSlice.actions;

const selectSelf = (state: { tasks: Task[] }) => state;

export const selectTasks = createSelector(
    selectSelf,
    (state) => state.tasks || []
);

const store = configureStore({
    reducer: todolistSlice.reducer
});

export default store;
