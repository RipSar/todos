import React from "react";
import {Item} from "../../../../slices/counterSlice";
import './styles.scss'
import ItemElement from "./components";


export interface IRemoveTodoTask {
    onTodoDelete: (id: string) => void
    onToggleItemCompleteState: (id: string) => void
    onTodoEditStart: (id: string) => void
    onTodoEditSubmit: (id: string, value: string) => void
    onTodoEditCancel: () => void
    editingItemId: string|null
}

interface IAllItemsProps extends IRemoveTodoTask {
    todos: Item[];
}

const AllItems = ({
                      todos,
                      ...rest
                  }: IAllItemsProps) => {
    return (
        <ul className='all_todos'>
            {todos
                // .filter(item => filter === null || item.isCompleted === filter)
                .map(item => (
                    <ItemElement
                        key={item.id}
                        item={item}
                        {...rest}
                    />
                ))}
        </ul>
    );
};
export default AllItems
