export default function TasksItemOptions({id, isEditing, deleteTask}) {
    return (
        <div className="tasks-item-options">
            <div className="tasks-item-options-item" onClick={isEditing}>
                <span className="material-icons">edit</span>
                <span>Edit</span>
            </div>
            <div className="tasks-item-options-item" onClick={() => deleteTask(id)}>
                <span className="material-icons">delete</span>
                <span>Delete</span>
            </div>
        </div>
    )
}