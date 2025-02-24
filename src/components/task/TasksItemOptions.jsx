import { useDispatch } from "react-redux";
import { deleteTask } from "../../slices/taskSlice";

export default function TasksItemOptions({id, isEditing}) {
    const dispatch = useDispatch();

    function handleDeleteTask() {
        dispatch(deleteTask({id: id}))
    }

    return (
        <div className="tasks-item-options">
            <button className="tasks-item-options-item" onClick={isEditing}>
                <span className="material-icons">edit</span>
                <span>Edit</span>
            </button>
            <button className="tasks-item-options-item" onClick={() => handleDeleteTask()}>
                <span className="material-icons">delete</span>
                <span>Delete</span>
            </button>
        </div>
    )
}