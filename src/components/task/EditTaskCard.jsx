import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../../slices/taskSlice";
import TaskCard from "./TaskCard";

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
        <TaskCard
            value={newTaskName}
            onChange={handleTaskNameChange}
            hasMarginBottom={true}
            pomodorosTitle={"Finished / Est Pomodoros"}
            pomodorosCountingChildren={<PomodorosCountingChildren 
                    finished={newFinishedPomodoros} 
                    onChange={(e) => setNewFinishedPomodoros(e.target.value)}
                    newEst={newEstPomodoros}
                />}
            increasePomodoros={increasePomodoros}
            decreasePomodoros={decreasePomodoros}
            save={save}
            cancel={cancel}
        />
    )
}

function PomodorosCountingChildren( {finished, onChange, newEst} ) {
    return (
        <>
            <input 
                type="number" 
                className="pomodoros-input" 
                value={finished} 
                step={1} 
                onChange={onChange}
            />
            <span className="pomodoros-counting-divider text-2xl">/</span>
            <input type="number" className="pomodoros-input no-spinners" min={0} value={newEst} step={1} readOnly/>
        </>
    )
}