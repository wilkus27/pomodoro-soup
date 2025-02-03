import { useEffect, useState } from "react";
import NewTask from "./NewTask";
import TasksItem from "./TasksItem";

export default function TasksContainer( {tasks, setTasks, handleTaskName} ) {
  const [newTask, setNewTask] = useState("");
  const [currentTask, setCurrentTask] = useState(() => {
    const savedTaskID = localStorage.getItem("currentTask");

    if (savedTaskID) {
      return JSON.parse(savedTaskID);
    } else return null;
  })

  const [pomodoros, setPomodoros] = useState(1);

  function handleNewTaskChange(event) {
    setNewTask(event.target.value);
  }

  function handleNewTaskSubmit() {
    setTasks((currentTasks) => {
        return [...currentTasks, {
          id: crypto.randomUUID(),
          name: newTask,
          estPomodoros: pomodoros,
          finishedPomodoros: 0,
          completed: false,
          selected: false
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

    if (currentTask === id) {
      handleTaskName(newName)
    }
  }

  function handleSelectTask(task) {
    setCurrentTask(task.id)
    setTasks((currentTasks) => {
      return currentTasks.map(currentTask => {
        if (currentTask.id === task.id) {
          return {
            ...currentTask,
            selected: true
          }
        } else {
          return {
            ...currentTask,
            selected: false
          }
        }
      })
    })
    handleTaskName(task.name)
  }

  function handleDeleteTask(id) {
    setTasks(currentTasks => {
      return currentTasks.filter(task => task.id !== id)
    })
  }

  useEffect(() => {
      localStorage.setItem("currentTask", JSON.stringify(currentTask));
  }, [currentTask]);

  useEffect(() => {
    const filteredByCurrentID = tasks.filter(task => task.id === currentTask);

    if (filteredByCurrentID.length === 0) return setCurrentTask(null)
  }, [setCurrentTask, currentTask, tasks])

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
              editTask={handleEditTask}
              select={handleSelectTask}
              className={`tasks-item ${task.selected === true ? 'selected' : ''}`}
              deleteTask={handleDeleteTask}
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