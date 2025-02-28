import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../slices/taskSlice";
import TaskCard from "./TaskCard";

export default function NewTaskCard({showAddTaskButton, pomodoros, setPomodoros }) {
    const [newTaskContent, setNewTaskContent] = useState("");

    const dispatch = useDispatch();

    function handleNewTaskChange(event) {
        setNewTaskContent(event.target.value);
    }

    function save() {
        showAddTaskButton();
        dispatch(addTask({ 
            name: newTaskContent,
            estPomodoros: pomodoros 
        }))

        setPomodoros(1);
    }

    function cancel() {
        showAddTaskButton();
        setPomodoros(1);
    }

    function increasePomodoros() {
        setPomodoros(currentPomodoros => {
            return currentPomodoros += 1;
        })
    }

    function decreasePomodoros() {
        setPomodoros(currentPomodoros => {
            if(currentPomodoros > 0) {
                return currentPomodoros -= 1;
            } else {
                return 0;
            }
        })
    }

    return (
        <TaskCard 
            value={newTaskContent}
            onChange={handleNewTaskChange}
            hasMarginBottom={false}
            pomodorosTitle={"Est Pomodoros"}
            pomodorosCountingChildren={<PomodorosCountingChildren pomodoros={pomodoros} />}
            increasePomodoros={increasePomodoros}
            decreasePomodoros={decreasePomodoros}
            save={save}
            cancel={cancel}
        />
    )
}

function PomodorosCountingChildren( {pomodoros} ) {
    return (
        <input type="number" className="pomodoros-input" min={0} value={pomodoros} step={1} readOnly/>
    )
}