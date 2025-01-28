import { useEffect, useState } from "react";
import NewTask from "./NewTask";
import TasksItem from "./TasksItem";

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
          estPomodoros: pomodoros,
          completed: false
        }]
      }
    )

    setPomodoros(1);
  }

  function handleEditTask(id, newName, newEstPomodoros) {
    setTasks((currentTasks) => {
      return currentTasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            name: newName,
            estPomodoros: newEstPomodoros
          }
        }
        return task;
      })
    })
  }

  return (
    <div className="tasks-container">
      <div className="tasks-top-panel">
        <span className="tasks-title">Tasks</span>
      </div>
      <div className="tasks-list">
        {tasks.map(task => {
          return (
            <TasksItem 
              task={task}
              key={task.id}
              setTasks={setTasks}
              editTask={handleEditTask}
            />
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