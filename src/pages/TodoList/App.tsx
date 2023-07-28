import React, {useState} from 'react';
import './App.css';
import InputToDo from "./components/InputToDo";
import AllItems from "./components/AllItems";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../state/store";
import {addItem, removeItems, setItemValue, toggleAllItems, toggleItem} from "../../slices/counterSlice";
import Footer from "./components/Footer";
import { TODO_TEMPLATE} from "./components/InputToDo/constants";
import type {TODO_TYPE} from "./components/InputToDo/constants";

function App() {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState<boolean | null>(null)

    const [editingItemId, setEditingItemId] = useState<TODO_TYPE["id"] | null>(null)

    const todos = useSelector((state: RootState) => {
        return state.todos.todos;
    });

    const handleToggleItems = () => {
        dispatch(toggleAllItems())
    }

    const handleTodoCreate = (value: string) => {
        const uniqueID = 'id' + Math.random().toString(16).slice(2);
        const newTodo = {
            ...TODO_TEMPLATE,
            value: value,
            id: uniqueID,
        };
        dispatch(addItem(newTodo))
    }

    const handleToggleItemCompleteState = (id: TODO_TYPE["id"]) => {
        dispatch(toggleItem(id))
    }

    const deleteItems = (id: TODO_TYPE["id"]) => {
        dispatch(removeItems([id] as string[]))
    }

    const itemsLeft = todos.filter((item) => !item.isCompleted).length

    const handleDeleteCompletedItems = () => {
        const itemsToDelete: string[] = todos.reduce((acc: string[], item) => {
            return item.isCompleted ? [...acc, item.id] : acc;
        }, []);
        dispatch(removeItems(itemsToDelete))
    }
    const filteredTodos = todos.filter(item => filter === null || item.isCompleted === filter)

    const handleItemEditStart = (id: TODO_TYPE["id"]) => setEditingItemId(id)

    const handleTodoEditSubmit = (id: string, value: string) => {
        const payload = {
            id: id,
            value: value,
        }
        dispatch(setItemValue(payload))
        setEditingItemId(null)
    }

    const handleTodoEditCancel = () => setEditingItemId(null)

    return (
        <div className="App">
            <h1>todos</h1>
            <div className="todo-part">
                <InputToDo
                    isToggleItemsCompleteArrowShown={!!todos.length}
                    isAllTodosCompleted={!!itemsLeft}
                    onToggleItemsCompletedState={handleToggleItems}
                    onNewTodoCreate={handleTodoCreate}
                />
                <AllItems
                    todos={filteredTodos}
                    onTodoDelete={deleteItems}
                    onToggleItemCompleteState={handleToggleItemCompleteState}
                    onTodoEditStart={handleItemEditStart}
                    onTodoEditSubmit={handleTodoEditSubmit}
                    onTodoEditCancel={handleTodoEditCancel}
                    editingItemId={editingItemId}
                />
                {todos.length > 0 && (
                    <Footer
                        totalItems={todos.length}
                        itemsLeft={itemsLeft}
                        activeFilter={filter}
                        onSetFilter={setFilter}
                        onDeleteCompletedItems={handleDeleteCompletedItems}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
