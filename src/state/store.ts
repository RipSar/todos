import { configureStore } from '@reduxjs/toolkit'
import todos from "../slices/counterSlice";

export const store = configureStore({
    reducer: {
        todos: todos
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch