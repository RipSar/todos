import React from "react";
import './styles.scss'

interface IItems {
    totalItems: number;
    itemsLeft: number;
    onSetFilter: (filter: boolean | null) => void;
    onDeleteCompletedItems: () => void;
    activeFilter: boolean|null;
}
const Footer = ({
                    totalItems,
                    itemsLeft,
                    onSetFilter,
                    onDeleteCompletedItems,
                    activeFilter
} : IItems) => {

    const displayAllItems = () => {
        onSetFilter(null)
    }
    const displayCompletedItems = () => {
        onSetFilter(true)
    }
    const displayActiveItems = () => {
        onSetFilter(false)
    }

    const FILTER_NAMES = {
        null: "All",
        false: "Active",
        true: "Completed",
    }

    const footerButtons = [
        {
            action: displayAllItems,
            label: FILTER_NAMES.null,
        },
        {
            action: displayActiveItems,
            label: FILTER_NAMES.false,
        },
        {
            action: displayCompletedItems,
            label: FILTER_NAMES.true,
        },
    ]

    const handleDeleteAllCompletedItems = () => {
        onDeleteCompletedItems()
    }

    return (
        <footer className="todo-footer">
            <span className="todo-count">
                {itemsLeft === 1 ? "1 item left" : `${itemsLeft} items left`}
            </span>
            <div>
                {
                    footerButtons.map((item) => (
                        <button
                            onClick={item.action}
                            className={
                                item.label === FILTER_NAMES[`${activeFilter}`] ? "active_filter"
                                     : "filter"
                            }
                        >
                            {item.label}
                        </button>
                        )
                    )
                }
            </div>
            <button
                onClick={handleDeleteAllCompletedItems}
                className={ itemsLeft < totalItems ? "" : "action hidden"}
            >
                Clear completed
            </button>

        </footer>
    )
}
export default Footer