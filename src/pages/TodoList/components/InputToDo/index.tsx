import React, {useState} from 'react';
import './styles.scss'

interface ToDoInputName {
    isToggleItemsCompleteArrowShown: boolean;
    isAllTodosCompleted: boolean;
    onToggleItemsCompletedState: () => void;
    onNewTodoCreate: (value: string) => void;
}

function InputToDo({
                       isAllTodosCompleted,
                       isToggleItemsCompleteArrowShown,
                       onToggleItemsCompletedState,
                       onNewTodoCreate
                   }: ToDoInputName) {

    const [inputValue, setInputValue] = useState<string>("")

    const handleCreateItem = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() !== '') {
                onNewTodoCreate(inputValue)
                setInputValue('')
            }
        }
    }

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <div className='items'>

            <button
                className={`items-toggle-all ${isAllTodosCompleted ? '' : 'checked'}`}
                onClick={onToggleItemsCompletedState}
            >
                <span
                    style={isToggleItemsCompleteArrowShown ? {} : {opacity: 0}}
                >
                    ›
                </span>
            </button>
            <input
                type='text'
                className='items-input'
                placeholder='What needs to be done?'
                onKeyDown={handleCreateItem}
                value={inputValue}
                onChange={handleInputValue}
            />
        </div>
    );
}

export default InputToDo;