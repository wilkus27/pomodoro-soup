import { useState } from "react";
import TasksItemOptions from "./TasksItemOptions";
import EditTaskCard from "./EditTaskCard";

export default function TasksItem( {task, editTask, select, className, deleteTask} ) {
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    function handleIsEditing() {
        setIsEditing(!isEditing);
        setShowOptions(false);
    }

    return (
        <>
            {!isEditing ? (
                <div className={className} onClick={(event) => {
                    const item = event.currentTarget;
                    const optionsButton = item.querySelector('.options-button');
                    const optionsIcon = item.querySelector('.options-button > .material-icons');
                    if (optionsButton === event.target || optionsIcon === event.target) {
                        return;
                    }
                    return select(task);
                }}>
                    <div className="tasks-item-name">
                        <span>{task.name}</span>
                    </div>
                    <div className="tasks-item-trailing-content">
                        <div className="tasks-item-pomodoros">
                            <span>{task.finishedPomodoros}</span>
                            <span>/</span>
                            <span>{task.estPomodoros}</span>
                        </div>
                        <div className="tasks-item-options-button">
                            <button className="options-button" onClick={() => setShowOptions(!showOptions)}>
                                <span className="material-icons">more_vert</span>
                            </button>
                            {showOptions && <TasksItemOptions id={task.id} isEditing={handleIsEditing} deleteTask={deleteTask} />}
                        </div>
                    </div>
                </div>
            ) : (
                <EditTaskCard isEditing={handleIsEditing} task={task} editTask={editTask}></EditTaskCard>
            )}
        </>
    )
}