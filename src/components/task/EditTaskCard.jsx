import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../../slices/taskSlice";

export default function EditTaskCard({ isEditing, task}) {
    const [newTaskName, setNewTaskName] = useState(task.name);
    const [newEstPomodoros, setNewEstPomodoros] = useState(task.estPomodoros);
    const [newFinishedPomodoros, setNewFinishedPomodoros] = useState(task.finishedPomodoros)

    const dispatch = useDispatch();

    function cancel() {
        isEditing();
    }

    function save() {
        dispatch(editTask({
            id: task.id,
            newName: newTaskName,
            newEstPomodoros: newEstPomodoros,
            newFinishedPomodoros: newFinishedPomodoros
        }))

        isEditing();
    }

    function handleTaskNameChange(event) {
        setNewTaskName(event.target.value);
    }

    function increasePomodoros() {
        setNewEstPomodoros(currentPomodoros => {
            return currentPomodoros += 1;
        })
    }

    function decreasePomodoros() {
        setNewEstPomodoros(currentPomodoros => {
            if(currentPomodoros > 0) {
                return currentPomodoros -= 1;
            } else {
                return 0;
            }
        })
    }

    return (
        <div className="edit-task-card">
            <div className="edit-task-card-container">
                <input 
                className="new-task-input"
                placeholder="What are you working on?"
                type="text"
                value={newTaskName}  
                onChange={handleTaskNameChange}
                />
                <div className="edit-task-card-pomodoros">
                    <div className="pomodoros-title-container">
                        <span className="pomodoros-title">Finished / Est Pomodoros</span>
                    </div>
                    <div className="pomodoros-counting">
                        <input 
                            type="number" 
                            className="pomodoros-input" 
                            value={newFinishedPomodoros} 
                            step={1} 
                            onChange={(e) => setNewFinishedPomodoros(e.target.value)}
                        />
                        <span className="pomodoros-counting-divider">/</span>
                        <input type="number" className="pomodoros-input no-spinners" min={0} value={newEstPomodoros} step={1} readOnly/>
                        <div className="pomodoros-buttons">
                            <button className="pomodoros-button" onClick={increasePomodoros}>
                                <span className="material-icons">keyboard_arrow_up</span>
                            </button>
                            <button className="pomodoros-button" onClick={decreasePomodoros}>
                                <span className="material-icons">keyboard_arrow_down</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="edit-task-card-buttons">
                <button className="btn-cancel" onClick={cancel}>Cancel</button>
                <button className="btn-save" onClick={save}>Save</button>
            </div>
        </div>
    )
}