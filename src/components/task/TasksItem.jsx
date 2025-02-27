import { useState } from "react";
import TasksItemOptions from "./TasksItemOptions";
import EditTaskCard from "./EditTaskCard";
import { useDispatch } from "react-redux";
import { completeTask, selectTask } from "../../slices/taskSlice";

export default function TasksItem( {task, className} ) {
    const [showOptions, setShowOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();

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
                    <button className="tasks-item-complete-button border-none bg-none mr-2.5" onClick={toggleCompleteTask}>
                        <span className={`material-icons text-3xl ${task.completed === true ? "text-color3" : "text-color7"}`}>check_circle</span>
                    </button>
                    <button 
                        className={`tasks-item-name w-full border-none bg-none text-color3 text-xl font-bold text-start ${task.completed === true ? "line-through decoration-2" : ""}`}
                        onClick={() => handleSelectTask(task)}
                    >
                        <span>{task.name}</span>
                    </button>
                    <div className="tasks-item-trailing-content flex-center gap-2.5">
                        <div className="tasks-item-pomodoros">
                            <span>{task.finishedPomodoros}</span>
                            <span>/</span>
                            <span>{task.estPomodoros}</span>
                        </div>
                        <div className="tasks-item-options-button">
                            <button className="options-button rounded-md border-color3 border-solid border-1 bg-color6 text-color3" onClick={() => setShowOptions(!showOptions)}>
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