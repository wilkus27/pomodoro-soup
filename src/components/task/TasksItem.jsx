import { useState } from "react";
import TasksItemOptions from "./TasksItemOptions";
import EditTaskCard from "./EditTaskCard";

export default function TasksItem( {task, editTask, select, className, deleteTask, completeTask} ) {
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [completed, setCompleted] = useState(false)

    const completedClassName = () => {
        return task.completed === true ? "completed" : ""
    }

    function handleIsEditing() {
        setIsEditing(!isEditing);
        setShowOptions(false);
    }

    function toggleCompleteTask() {
        setCompleted(!completed)
        completeTask(task, completed)
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
                    <button className="tasks-item-complete-button" onClick={toggleCompleteTask}>
                        <span className={`material-icons ${completedClassName()}`}>check_circle</span>
                    </button>
                    <div className={`tasks-item-name ${completedClassName()}`}>
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