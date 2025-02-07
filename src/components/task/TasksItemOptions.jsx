export default function TasksItemOptions({id, isEditing, deleteTask}) {
    return (
        <div className="tasks-item-options">
            <button className="tasks-item-options-item" onClick={isEditing}>
                <span className="material-icons">edit</span>
                <span>Edit</span>
            </button>
            <button className="tasks-item-options-item" onClick={() => deleteTask(id)}>
                <span className="material-icons">delete</span>
                <span>Delete</span>
            </button>
        </div>
    )
}