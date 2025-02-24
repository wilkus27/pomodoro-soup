import { useState } from "react";
import TasksItemOptions from "./TasksItemOptions";
import EditTaskCard from "./EditTaskCard";
import { useDispatch } from "react-redux";
import { completeTask, selectTask } from "../../slices/taskSlice";

export default function TasksItem( {task, className} ) {
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();

    const completedClassName = () => {
        return task.completed === true ? "completed" : ""
    }

    function handleSelectTask(task) {
        dispatch(selectTask({
            id: task.id,
            name: task.name
        }))
    }

    function handleIsEditing() {
        setIsEditing(!isEditing);
        setShowOptions(false);
    }

    function toggleCompleteTask() {
        dispatch(completeTask({id: task.id}))
    }

    return (
        <>
            {!isEditing ? (
                <div className={className} >
                    <button className="tasks-item-complete-button" onClick={toggleCompleteTask}>
                        <span className={`material-icons ${completedClassName()}`}>check_circle</span>
                    </button>
                    <button className={`tasks-item-name ${completedClassName()}`} onClick={() => handleSelectTask(task)}>
                        <span>{task.name}</span>
                    </button>
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
                            {showOptions && <TasksItemOptions id={task.id} isEditing={handleIsEditing} />}
                        </div>
                    </div>
                </div>
            ) : (
                <EditTaskCard isEditing={handleIsEditing} task={task}></EditTaskCard>
            )}
        </>
    )
}