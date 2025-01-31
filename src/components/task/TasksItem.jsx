import { useState } from "react";
import TasksItemOptions from "./TasksItemOptions";
import EditTaskCard from "./EditTaskCard";

export default function TasksItem( {task, setTasks, editTask, select, className} ) {
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    function handleIsEditing() {
        setIsEditing(!isEditing);
        setShowOptions(false);
    }

    return (
        <>
            {!isEditing ? (
                <div className={className} onClick={() => select(task)}>
                    <div className="tasks-item-name">
                        <span>{task.name}</span>
                    </div>
                    <div className="tasks-item-trailing-content">
                        <div className="tasks-item-pomodoros">
                            <span>0</span>
                            <span>/</span>
                            <span>{task.estPomodoros}</span>
                        </div>
                        <div className="tasks-item-options-button">
                            <button className="options-button" onClick={() => setShowOptions(!showOptions)}>
                                <span className="material-icons">more_vert</span>
                            </button>
                            {showOptions && <TasksItemOptions setTasks={setTasks} id={task.id} isEditing={handleIsEditing} />}
                        </div>
                    </div>
                </div>
            ) : (
                <EditTaskCard isEditing={handleIsEditing} task={task} editTask={editTask}></EditTaskCard>
            )}
        </>
    )
}