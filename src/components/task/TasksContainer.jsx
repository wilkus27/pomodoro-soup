import { useEffect, useState } from "react";
import NewTask from "./NewTask";

export default function TasksContainer() {
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

  const [pomodoros, setPomodoros] = useState(1);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleNewTaskChange(event) {
    setNewTask(event.target.value);
  }

  function handleNewTaskSubmit() {
    setTasks((currentTasks) => {
        return [...currentTasks, {
          id: crypto.randomUUID(),
          name: newTask,
          pomodoros: pomodoros,
          completed: false
        }]
      }
    )

    setPomodoros(1);
  }

  return (
    <div className="tasks-container">
      <div className="tasks-top-panel">
        <span className="tasks-title">Tasks</span>
      </div>
      <div className="tasks-list">
        {tasks.map(task => {
          return (
            <div className="tasks-item" key={task.id}>
              <div className="tasks-item-name">
                <span>{task.name}</span>
              </div>
              <div className="tasks-item-trailing-content">
                <div className="tasks-item-pomodoros">
                  <span>0</span>
                  <span>/</span>
                  <span>{task.pomodoros}</span>
                </div>
                <div className="tasks-item-options-button"></div>
              </div>
            </div>
          )
        })}
      </div>
      <NewTask 
        change={handleNewTaskChange} 
        submit={handleNewTaskSubmit} 
        pomodoros={pomodoros}
        setPomodoros={setPomodoros}
      />
    </div>
  )
}