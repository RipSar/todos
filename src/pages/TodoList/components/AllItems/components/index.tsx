import React, {useEffect, useState} from "react";
import {Item} from "../../../../../slices/counterSlice";
import {IRemoveTodoTask} from "../index";


interface IItem extends IRemoveTodoTask {
    item: Item;
}

const ItemElement = ({
                         item,
                         onTodoDelete,
                         onToggleItemCompleteState,
                         onTodoEditStart,
                         onTodoEditSubmit,
                         onTodoEditCancel,
                         editingItemId,
                     }: IItem) => {

    const [inputValue, setInputValue] = useState<string>(item.value)

    const isItemEditing = item.id === editingItemId

    const handleToggleItemCompleteState = () => {
        !item.isEditing && onToggleItemCompleteState(item.id)
    }

    const handleItemDelete = () => {
        onTodoDelete(item.id)
    }

    useEffect(() => {
        if (isItemEditing) {
            setInputValue(item.value)
        }
    }, [isItemEditing])

    const handleItemEditStart = () => onTodoEditStart(item.id)

    const handleItemEditSubmit = () => onTodoEditSubmit(item.id, inputValue)

    const handleItemEditCancel = () => onTodoEditCancel()

    const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code === "Enter") {
            if (inputValue.trim() !== '') {
                handleItemEditSubmit()
            }
        } else if (e.code === "Escape") {
            handleItemEditCancel()
        }
    }

    const handleBlurOfItemEdit = () => {
        if (inputValue.trim() !== '') {
            handleItemEditSubmit()
        }
    }

    return (
        <li className="todo-item" onDoubleClick={handleItemEditStart}>

            {item.id === editingItemId ? (
                <input
                    key={"input-edit"}
                    type="text"
                    className="taskArea"
                    onKeyDown={handleKeyDown}
                    value={inputValue}
                    onChange={handleInputValueChange}
                    onBlur={handleBlurOfItemEdit}
                    autoFocus={true}
                />
            ) : (
                <>
                    <input id={"labelDone3" + item.id}
                           type="checkbox"
                           className="input-for-todo-list"
                           checked={item.isCompleted}
                    />
                    <label htmlFor={"labelDone3" + item.id}
                           className="label-for-todo-list"
                           onClick={handleToggleItemCompleteState}
                    />
                    <p>
                        {item.value}
                    </p>
                    <button type="button" className="deleteTaskButton" onClick={handleItemDelete}>
                        ×
                    </button>
                </>

            )}
        </li>
    )
}

export default ItemElement