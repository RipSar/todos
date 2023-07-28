import { createSlice } from "@reduxjs/toolkit";

export interface Item {
    value: string;
    id: string;
    isCompleted: boolean;
    isEditing: boolean;
}

const initialState: { todos: Item[] } = {
    todos: [],
}


const todos = createSlice({
    name: "todoActions",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.todos = [...state.todos, action.payload]
        },
        removeItems: (state, action) => {
            state.todos = state.todos.filter((item) => !action.payload.includes(item.id));
        },
        toggleItem: (state, action) => {
            state.todos = state.todos.map((item) =>
                item.id === action.payload ? { ...item, isCompleted: !item.isCompleted } : item
            );
        },
        toggleAllItems: (state) => {
            const isAllCompleted = !!(state.todos.filter((item) => !item.isCompleted)).length;
            state.todos = state.todos.map(item => ({...item, isCompleted: isAllCompleted}))
        },
        setItemValue: (state, action) => {
            state.todos = state.todos.map((item) =>
                item.id === action.payload.id ? { ...item, value: action.payload.value } : item
            );
        }
    },

});

const { reducer } = todos;

export const { addItem, removeItems, toggleItem, toggleAllItems, setItemValue} = todos.actions
export default reducer;