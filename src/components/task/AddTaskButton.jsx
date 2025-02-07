
export default function AddTaskButton({hideButton}) {
    return (
        <button className="new-task-button" onClick={hideButton}>
            <span className="material-icons">add_circle</span>
            <span>Add Task</span>
        </button>
    )
}